from typing import List

from fastapi import HTTPException
from sqlalchemy import select, Result
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status

from . import schemas
from .models import Asset
from .schemas import AssetCreate, StatusEnum, AssetUpdatePartial
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


async def get_assets_by_user(session: AsyncSession, user: User) -> List[Asset]:
    stmt = select(Asset).where(Asset.user_id == user.id)
    result: Result = await session.execute(stmt)
    assets = result.scalars().all()
    return list(assets)


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
