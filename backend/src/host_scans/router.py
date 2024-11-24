from typing import List

from fastapi import APIRouter, HTTPException
from fastapi.params import Depends
from fastapi.security import HTTPBearer
from sqlalchemy.ext.asyncio import AsyncSession

from ..assets.models import Asset
from ..assets.service import get_asset_by_id
from ..database import db_manager, redis_client
from . import service
from ..auth.dependencies import get_current_active_auth_user
from ..dependencies import check_permission, Permission
from ..users.schemas import User
from .schemas import HostScan, HostScanList, HostScanCreate

http_bearer = HTTPBearer(auto_error=False)
router = APIRouter(
    tags=["Host Scans"],
    prefix="/assets",
    dependencies=[
        Depends(http_bearer),
        # Depends(check_permission(Permission.USER)),
    ],
)


@router.get(
    path="/{asset_id}/host-scans/",
    response_model=HostScanList,
    summary="Get host scans by asset",
)
async def get_host_scans_by_asset_id(
    asset_id: int,
    session: AsyncSession = Depends(db_manager.session_dependency),
    user: User = Depends(get_current_active_auth_user),
    page_size: int = 10,
    page_number: int = 1,
    search: str | None = None,
):
    """
    Gets host scans list by asset ID for current authenticated user

    - **access_token**: Header bearer access token (required)
    """
    asset = await get_asset_by_id(asset_id=asset_id, session=session, user=user)
    return await service.get_host_scans_by_asset(
        session=session,
        user=user,
        page_size=page_size,
        page_number=page_number,
        search=search,
        asset=asset,
    )


@router.get(
    path="/host-scans/{host_scan_id}/",
    response_model=HostScan,
    summary="Get host scan by id for current user",
)
async def get_host_scan_by_id(
    host_scan_id: int,
    session: AsyncSession = Depends(db_manager.session_dependency),
    user: User = Depends(get_current_active_auth_user),
):
    """
    Gets host scan by id for current authenticated user

    - **access_token**: Header bearer access token (required)
    """
    return await service.get_host_scan_by_id(
        session=session, user=user, host_scan_id=host_scan_id
    )


@router.post(
    path="/{asset_id}/host-scans/",
    summary="Create host scans list for asset for scan service",
    dependencies=[Depends(check_permission(Permission.ADMIN))],
)
async def create_host_scans(
    asset_id: int,
    host_scans_list_create: List[HostScanCreate],
    session: AsyncSession = Depends(db_manager.session_dependency),
    user: User = Depends(get_current_active_auth_user),
):
    """
    Creates host scans.
    Endpoint only for scaner services.

    - **access_token**: Header bearer access token (required)

    List of:
    - **domain**: Domain
    - **ports**: List of ports (required, 0 <= value <= 65535)
    - **ips**: List of ips (required, e.g. ["10.0.0.1", "10.0.0.2", "10.0.0.3"])
    """
    asset = await get_asset_by_id(session=session, asset_id=asset_id, user=None)
    try:
        await service.create_host_scans(
            session=session,
            user_id=asset.user_id,
            host_scans_list_create=host_scans_list_create,
            asset=asset,
        )
    except ValueError:
        return {"message": "Ответ на сохранился, т.к. скан ресурса провален"}
    return {"message": "OK"}


@router.post(
    path="/{asset_id}/host-scans/keep-alive/",
    summary="Keep alive for host scan for scan service",
    dependencies=[Depends(check_permission(Permission.ADMIN))],
)
async def keep_alive_host_scan(
    asset_id: int,
    session: AsyncSession = Depends(db_manager.session_dependency),
    _: User = Depends(get_current_active_auth_user),
):
    """
    Keep alive for host scan for scan service every 5 minutes.
    If there isn`t request for 11 minutes that status is Failed.
    Endpoint only for scaner services.

    - **access_token**: Header bearer access token (required)
    """
    # Проверяем, существует ли актив
    asset = await session.get(Asset, asset_id)
    if not asset:
        raise HTTPException(status_code=404, detail="Ресурс не найден")

    # Обновляем время последнего keep-alive в Redis с TTL 11 секунд
    key = f"asset:{asset_id}:host_scans:keep_alive"
    await redis_client.set(key, 1, ex=11)

    return {"message": "Keep-alive signal received"}


@router.delete(
    path="/host-scans/{host_scan_id}/",
    response_model=HostScan,
    summary="Delete host scan for current user",
)
async def delete_host_scan(
    host_scan_id: int,
    session: AsyncSession = Depends(db_manager.session_dependency),
    user: User = Depends(get_current_active_auth_user),
):
    """
    Deletes host scan for current authenticated user

    - **access_token**: Header bearer access token (required)
    """
    host_scan = await service.get_host_scan_by_id(
        session=session, user=user, host_scan_id=host_scan_id
    )
    return await service.delete_host_scan(
        session=session,
        host_scan=host_scan,
    )
