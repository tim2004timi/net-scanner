import logging

from .assets.schemas import FrequencyEnum
from .scheduler import scheduler
from apscheduler.jobstores.base import JobLookupError
from datetime import datetime


logger = logging.getLogger("app")


def schedule_scan(asset_id: int, frequency: FrequencyEnum):
    job_id = f"scan_asset_{asset_id}"

    try:
        scheduler.remove_job(job_id)
    except JobLookupError:
        pass

    from .assets.service import send_to_scan_service

    if frequency == FrequencyEnum.ONCE:
        # Запускаем сканирование немедленно
        scheduler.add_job(
            func=send_to_scan_service,
            args=[asset_id],
            id=job_id,
            next_run_time=datetime.now(),
        )
        return

    if frequency == FrequencyEnum.DAILY:
        trigger = "interval"
        trigger_args = {"days": 1}
    elif frequency == FrequencyEnum.WEEKLY:
        trigger = "interval"
        trigger_args = {"weeks": 1}
    elif frequency == FrequencyEnum.MONTHLY:
        trigger = "cron"
        trigger_args = {"day": 1}  # Каждое первое число месяца
    else:
        return

    scheduler.add_job(
        func=send_to_scan_service,
        args=[asset_id],
        id=job_id,
        trigger=trigger,
        **trigger_args,
    )


def remove_scheduled_scan(asset_id: int):
    job_id = f"scan_asset_{asset_id}"
    try:
        scheduler.remove_job(job_id)
        logger.info(f"Scheduled scan job for asset {asset_id} has been removed.")
    except JobLookupError:
        logger.info(f"No scheduled scan job found for asset {asset_id}.")
