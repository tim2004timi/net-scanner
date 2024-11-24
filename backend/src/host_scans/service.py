from datetime import datetime
from functools import reduce
from typing import List

from aiogram import Bot
from aiogram.client.default import DefaultBotProperties
from fastapi import HTTPException
from sqlalchemy import select, Result, func, insert, delete, or_
from sqlalchemy.ext.asyncio import AsyncSession
from starlette import status

from math import ceil
from .models import HostScan
from .schemas import HostScanCreate, HostScanList
from ..assets.models import Asset
from ..assets.schemas import StatusEnum
from ..config import settings
from ..database import redis_client
from ..users import User
from ..users.service import get_user_by_id


bot = Bot(
    token=settings.bot_token,
    default=DefaultBotProperties(parse_mode="HTML"),
)


async def get_host_scan_by_id(
    session: AsyncSession, user: User, host_scan_id: int
) -> HostScan:
    host_scan = await session.get(HostScan, host_scan_id)
    if not host_scan:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Сканирование хоста с ID ({host_scan_id}) не найдено",
        )
    if host_scan.user_id != user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Сканирование хоста не принадлежит пользователю",
        )
    return host_scan


async def get_host_scans_by_asset(
    session: AsyncSession,
    user: User,
    asset: Asset,
    page_size: int = 10,
    page_number: int = 1,
    search: str | None = None,
) -> HostScanList:
    data = await get_total_ips_and_ports(
        session=session, user_id=user.id, asset_id=asset.id
    )
    stmt = select(HostScan).where(
        (HostScan.asset_id == asset.id) & (HostScan.user_id == user.id)
    )

    if search is not None:
        search = f"%{search}%"
        stmt = stmt.where(
            or_(
                func.lower(HostScan.domain).like(func.lower(search)),
                func.array_position(HostScan.ips, search).isnot(None),
            )
        )
    result: Result = await session.execute(stmt)
    host_scans = list(result.scalars().all())

    limit = page_size
    offset = (page_number - 1) * page_size
    response_host_scans = host_scans[offset : offset + limit]
    total_pages = ceil(len(host_scans) / page_size)
    host_scans_list = HostScanList(
        host_scans=response_host_scans,
        total_pages=total_pages,
        current_page=page_number,
        total_ips=data["total_ips"],
        total_domains=data["total_domains"],
    )
    return host_scans_list


async def create_host_scans(
    session: AsyncSession,
    user_id: int,
    asset: Asset,
    host_scans_list_create: List[HostScanCreate],
):
    if asset.status == StatusEnum.FAILED:
        raise ValueError
    stmt = delete(HostScan).where(HostScan.asset_id == asset.id)
    await session.execute(stmt)

    # Подготовка данных для вставки
    host_scans_data = [
        {
            "user_id": user_id,
            "asset_id": asset.id,
            "domain": host_scan.domain,
            "ips": host_scan.ips,
            "ports": host_scan.ports,
        }
        for host_scan in host_scans_list_create
    ]

    stmt = insert(HostScan).values(host_scans_data)
    await session.execute(stmt)
    asset.updated_at = datetime.utcnow()
    asset.status = StatusEnum.DONE
    await session.commit()

    if asset.tg_alerts:
        user = await get_user_by_id(session=session, user_id=user_id)
        try:
            await host_scans_alert_telegram(
                user=user, data=host_scans_data, asset=asset
            )
        except Exception:
            pass


async def delete_host_scan(session: AsyncSession, host_scan: HostScan) -> HostScan:
    await session.delete(host_scan)
    await session.commit()
    return host_scan


async def get_total_ips_and_ports(session: AsyncSession, user_id: int, asset_id: int):
    stmt = select(
        func.sum(func.array_length(HostScan.ips, 1)).label("total_ips"),
        func.count(func.distinct(HostScan.domain)).label("total_domains"),
    ).where(HostScan.user_id == user_id, HostScan.asset_id == asset_id)
    result = await session.execute(stmt)
    counts = result.one_or_none()
    if counts:
        return {
            "total_ips": counts.total_ips or 0,
            "total_domains": counts.total_domains or 0,
        }
    return {"total_ips": 0, "total_domains": 0}


async def host_scans_alert_telegram(
    user: User, data: list[dict[str, str]], asset: Asset
):
    ips = 0
    domain_dict = {}
    for host_scan in data:
        ips += len(host_scan["ips"])
        if host_scan["domain"] in domain_dict:
            domain_dict["domain"] = 1
        else:
            domain_dict["domain"] += 1
    domains = reduce(lambda x, y: x + y, domain_dict)

    message = "<b>🔍 Сканирование хостов завершено</b>"
    message += f"Ресурс: {asset.name}"
    message += f"Домены: {domains}"
    message += f"IPs: {ips}"

    chat_id = await redis_client.get(f"telegram_chat_id:{user.username}")
    await bot.send_message(chat_id=chat_id, text=message)
