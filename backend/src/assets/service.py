import logging
from datetime import datetime

import httpx
from fastapi import HTTPException
from sqlalchemy import select, Result
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status

from math import ceil
from .models import Asset
from .schemas import AssetCreate, StatusEnum, AssetUpdatePartial, AssetsList
from ..config import HOST_SCAN_SERVICE_URL
from ..database import db_manager
from ..scheduler_utils import remove_scheduled_scan, schedule_scan
from ..users import User


logger = logging.getLogger("app")


async def get_asset_by_id(
    session: AsyncSession, user: User | None, asset_id: int
) -> Asset:
    asset = await session.get(Asset, asset_id)
    if not asset:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Ресурс с ID ({asset_id}) не найден",
        )
    if user and asset.user_id != user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Ресурс не принадлежит пользователю",
        )
    return asset


async def get_assets_by_user(
    session: AsyncSession,
    user: User,
    page_size: int = 10,
    page_number: int = 1,
    search: str | None = None,
    status_filter: StatusEnum | None = None,
) -> AssetsList:
    stmt = select(Asset).where(Asset.user_id == user.id).order_by(Asset.id.desc())
    if status_filter is not None:
        stmt = stmt.where(Asset.status == status_filter)
    if search is not None:
        search = f"%{search}%"
        stmt = stmt.where(Asset.name.like(search))
    result: Result = await session.execute(stmt)
    assets = list(result.scalars().all())

    limit = page_size
    offset = (page_number - 1) * page_size
    response_assets = assets[offset : offset + limit]
    total_pages = ceil(len(assets) / page_size)
    assets_list = AssetsList(
        assets=response_assets, total_pages=total_pages, current_page=page_number
    )
    return assets_list


async def create_asset(
    session: AsyncSession, user: User, asset_create: AssetCreate
) -> Asset:
    stmt = select(Asset).where(Asset.name == asset_create.name)
    result: Result = await session.execute(stmt)
    asset = result.scalars().one_or_none()
    if asset:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Ресурс c таким именем уже существует",
        )
    asset = Asset(
        **asset_create.model_dump(), user_id=user.id, status=StatusEnum.IN_PROCESS
    )
    session.add(asset)
    await session.commit()
    await session.refresh(asset)

    try:
        schedule_scan(asset.id, asset.frequency)
        asset.start_host_scan_at = datetime.utcnow()
    except Exception as e:
        asset.status = StatusEnum.FAILED
        await session.commit()
        await session.refresh(asset)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Не удалось отправить задачу сканеру",
        )
    return asset


async def update_asset(
    session: AsyncSession,
    asset: Asset,
    asset_update: AssetUpdatePartial,
) -> Asset:
    for name, value in asset_update.model_dump(exclude_unset=True).items():
        setattr(asset, name, value)
    await session.commit()

    try:
        schedule_scan(asset.id, asset.frequency)
        asset.start_host_scan_at = datetime.utcnow()
    except Exception as e:
        asset.status = StatusEnum.FAILED
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Не удалось отправить задачу сканеру",
        )
    await session.commit()
    await session.refresh(asset)
    return asset


async def delete_asset(session: AsyncSession, asset: Asset) -> Asset:
    await session.delete(asset)
    await session.commit()
    remove_scheduled_scan(asset.id)
    return asset


async def send_to_scan_service(asset_id: int, timeout=1):
    async with db_manager.session_maker() as session:
        try:
            asset = await get_asset_by_id(session=session, asset_id=asset_id, user=None)
        except Exception as e:
            logger.info(f"Не удалось получить asset для отправки: {e}")
    async with httpx.AsyncClient(timeout=timeout) as client:
        data = {"asset_id": asset.id, "targets": asset.targets}
        try:
            response = await client.post(HOST_SCAN_SERVICE_URL, json=data)
            response.raise_for_status()
        except Exception as e:
            logger.info(f"Не удалось отправить asset на сканирование")
