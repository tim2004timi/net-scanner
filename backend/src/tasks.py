import asyncio
import logging

from sqlalchemy.future import select

from src.assets.models import Asset
from src.assets.schemas import StatusEnum
from src.database import redis_client


logger = logging.getLogger("app")


async def monitor_keep_alive_host_scans(session_factory):
    while True:
        async with session_factory() as session:
            # Получаем все активы, статус которых не FAILED
            stmt = select(Asset).where(Asset.status == StatusEnum.IN_PROCESS)
            result = await session.execute(stmt)
            assets = result.scalars().all()

            for asset in assets:
                asset_id = asset.id
                key = f"asset:{asset_id}:host-scans:keep_alive"
                exists = await redis_client.exists(key)

                if not exists and asset.status != StatusEnum.FAILED:
                    # Обновляем статус актива на FAILED
                    asset.status = StatusEnum.FAILED
                    await session.commit()
                    logger.info(f"Asset {asset_id} marked as FAILED due to timeout.")

        # Ожидание 5 секунд перед следующей проверкой
        await asyncio.sleep(5)
