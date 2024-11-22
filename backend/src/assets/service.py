from typing import List

from fastapi import HTTPException
from sqlalchemy import select, Result
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status

from math import ceil
from .models import Asset
from .schemas import AssetCreate, StatusEnum, AssetUpdatePartial, AssetsList
from ..users import User


async def get_asset_by_id(session: AsyncSession, user: User, asset_id: int) -> Asset:
    asset = await session.get(Asset, asset_id)
    if not asset:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Пользователь с ID ({asset_id}) не найден",
        )
    if asset.user_id != user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Ресурс не принадлежит пользователю",
        )
    return asset


async def get_assets_by_user(
    session: AsyncSession, user: User, page_size: int = 10, page_number: int = 1
) -> AssetsList:
    limit = page_size
    offset = (page_number - 1) * page_size
    stmt = select(Asset).where(Asset.user_id == user.id)
    result: Result = await session.execute(stmt)
    assets = list(result.scalars().all())
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
    return asset


async def update_asset(
    session: AsyncSession,
    asset: Asset,
    asset_update: AssetUpdatePartial,
) -> Asset:
    for name, value in asset_update.model_dump(exclude_unset=True).items():
        setattr(asset, name, value)
    await session.commit()
    return asset


async def delete_asset(session: AsyncSession, asset: Asset) -> Asset:
    await session.delete(asset)
    await session.commit()
    return asset
