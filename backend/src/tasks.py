import asyncio
import logging

from sqlalchemy.future import select

from src.assets.models import Asset
from src.assets.schemas import StatusEnum
from src.database import redis_client, db_manager
from src.vulnerability_scans import schemas
from src.vulnerability_scans.models import VulnerabilityScan

logger = logging.getLogger("app")


async def monitor_keep_alive_host_scans(session_factory):
    while True:
        async with db_manager.session_maker() as session:
            # Получаем все активы, статус которых не FAILED
            stmt = select(Asset).where(Asset.status == StatusEnum.IN_PROCESS)
            result = await session.execute(stmt)
            assets = result.scalars().all()
            for asset in assets:
                asset_id = asset.id
                key = f"asset:{asset_id}:host_scans:keep_alive"
                exists = await redis_client.exists(key)

                if not exists and asset.status != StatusEnum.FAILED:
                    # Обновляем статус актива на FAILED
                    asset.status = StatusEnum.FAILED
                    await session.commit()
                    logger.info(f"Asset {asset_id} marked as FAILED due to timeout.")

            stmt = select(VulnerabilityScan).where(
                VulnerabilityScan.status == schemas.ScanStatusEnum.IN_PROCESS
            )
            result = await session.execute(stmt)
            scans = result.scalars().all()
            for scan in scans:
                scan_id = scan.id
                key = f"vulnerability_scan:{scan.id}:keep_alive"
                exists = await redis_client.exists(key)

                if not exists and scan.status != schemas.ScanStatusEnum.FAILED:
                    # Обновляем статус актива на FAILED
                    scan.status = schemas.ScanStatusEnum.FAILED
                    await session.commit()
                    logger.info(f"Scan {scan_id} marked as FAILED due to timeout.")

        # Ожидание 11 секунд перед следующей проверкой
        await asyncio.sleep(11)
