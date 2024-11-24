from typing import List

from fastapi import APIRouter
from fastapi.params import Depends
from fastapi.security import HTTPBearer
from sqlalchemy.ext.asyncio import AsyncSession

from ..database import db_manager
from . import service
from ..auth.dependencies import get_current_active_auth_user
from ..users.schemas import User
from .schemas import Asset, AssetCreate, AssetUpdatePartial, AssetsList, StatusEnum

http_bearer = HTTPBearer(auto_error=False)
router = APIRouter(
    tags=["Assets"],
    prefix="/assets",
    dependencies=[
        Depends(http_bearer),
        # Depends(check_permission(Permission.USER)),
    ],
)


@router.get(
    path="/",
    response_model=AssetsList,
    summary="Get assets for current user",
)
async def get_assets_by_user(
    session: AsyncSession = Depends(db_manager.session_dependency),
    user: User = Depends(get_current_active_auth_user),
    page_size: int = 10,
    page_number: int = 1,
    search: str | None = None,
    status: StatusEnum | None = None,
):
    """
    Gets assets list for current authenticated user

    - **access_token**: Header bearer access token (required)
    """
    return await service.get_assets_by_user(
        session=session,
        user=user,
        page_size=page_size,
        page_number=page_number,
        status_filter=status,
        search=search,
    )


@router.get(
    path="/{asset_id}/",
    response_model=Asset,
    summary="Get asset by id for current user",
)
async def get_asset_by_id(
    asset_id: int,
    session: AsyncSession = Depends(db_manager.session_dependency),
    user: User = Depends(get_current_active_auth_user),
):
    """
    Gets asset by id for current authenticated user

    - **access_token**: Header bearer access token (required)
    """
    return await service.get_asset_by_id(session=session, user=user, asset_id=asset_id)


@router.post(
    path="/",
    response_model=Asset,
    summary="Create asset for current user",
)
async def create_asset(
    asset_create: AssetCreate,
    session: AsyncSession = Depends(db_manager.session_dependency),
    user: User = Depends(get_current_active_auth_user),
):
    """
    Creates an asset for current authenticated user and run hosts scan.

    - **access_token**: Header bearer access token (required)

    - **name**: Name of the asset (required, unique)
    - **type**: Type of the asset (default="Внешний", values: "Внешний", "Внутренний")
    - **targets**: List of asset targets (required, e.g. 10.0.0.1, 10.0.0.1/24, domain.ru)
    - **frequency**: Frequency of scanning (default="Один раз", values: "Один раз", "Ежедневно", "Еженедельно", "Ежемесячно")
    - **tg_alerts**: Confirm alerts to telegram (default=false)
    """
    return await service.create_asset(
        session=session, user=user, asset_create=asset_create
    )


@router.patch(
    path="/{asset_id}/",
    response_model=Asset,
    summary="Update partial asset for current user",
)
async def update_asset(
    asset_id: int,
    asset_update: AssetUpdatePartial,
    session: AsyncSession = Depends(db_manager.session_dependency),
    user: User = Depends(get_current_active_auth_user),
):
    """
    Updates an asset for current authenticated user

    - **access_token**: Header bearer access token (required)

    - **name**: Name of the asset (unique)
    - **type**: Type of the asset (values: "Внешний", "Внутренний")
    - **targets**: List of asset targets (e.g. 10.0.0.1, 10.0.0.1/24, domain.ru)
    - **frequency**: Frequency of scanning (values: "Один раз", "Ежедневно", "Еженедельно", "Ежемесячно")
    - **tg_alerts**: Confirm alerts to telegram (default=false)
    """
    asset = await service.get_asset_by_id(session=session, user=user, asset_id=asset_id)
    return await service.update_asset(
        session=session, asset_update=asset_update, asset=asset
    )


@router.delete(
    path="/{asset_id}/",
    response_model=Asset,
    summary="Delete asset for current user",
)
async def delete_asset(
    asset_id: int,
    session: AsyncSession = Depends(db_manager.session_dependency),
    user: User = Depends(get_current_active_auth_user),
):
    """
    Deletes an asset for current authenticated user

    - **access_token**: Header bearer access token (required)
    """
    asset = await service.get_asset_by_id(session=session, user=user, asset_id=asset_id)
    return await service.delete_asset(
        session=session,
        asset=asset,
    )
