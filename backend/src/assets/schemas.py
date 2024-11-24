import re
from datetime import datetime, timedelta
from typing import List
from enum import Enum
from pydantic import (
    BaseModel,
    field_validator,
    ConfigDict,
    Field,
)
import ipaddress


class TypeEnum(str, Enum):
    EXTERNAL = "Внешний"
    INTERNAL = "Внутренний"


class StatusEnum(str, Enum):
    DONE = "Готово"
    IN_PROCESS = "В процессе"
    FAILED = "Провалено"


class FrequencyEnum(str, Enum):
    ONCE = "Один раз"
    DAILY = "Ежедневно"
    WEEKLY = "Еженедельно"
    MONTHLY = "Ежемесячно"


class AssetBase(BaseModel):
    name: str
    type: TypeEnum = TypeEnum.EXTERNAL
    targets: List[str] = Field(..., example=["127.0.0.1", "127.0.0.1/30", "domain.ru"])
    frequency: FrequencyEnum = FrequencyEnum.ONCE
    tg_alerts: bool = False

    @field_validator("targets", mode="before")
    def validate_targets(cls, value):
        if not value:
            raise ValueError("Поле 'targets' не должно быть пустым")
        if not isinstance(value, list):
            raise TypeError("Поле 'targets' должно быть списком строк.")
        validated_targets = []
        for idx, target in enumerate(value):
            if cls.is_valid_target(target):
                validated_targets.append(target)
            else:
                raise ValueError(
                    f"Элемент в 'targets' под индексом {idx} ('{target}') "
                    f"не является допустимым доменом, IP-адресом или подсетью"
                )
        return validated_targets

    @staticmethod
    def is_valid_target(target: str) -> bool:
        # Проверка на IP-адрес
        try:
            ipaddress.ip_address(target)
            return True
        except ValueError:
            pass

        # Проверка на подсеть
        try:
            ipaddress.ip_network(target, strict=False)
            return True
        except ValueError:
            pass

        # Проверка на доменное имя
        domain_regex = re.compile(
            r"^(?=.{1,253}$)(?!\-)([a-zA-Z0-9\-]{1,63}\.)+[a-zA-Z]{2,63}$"
        )
        if domain_regex.match(target):
            return True

        return False


class AssetCreate(AssetBase):
    pass


class AssetUpdatePartial(AssetCreate):
    name: str | None = None
    type: TypeEnum | None = None
    targets: List[str] | None = Field(
        None, example=["127.0.0.1", "127.0.0.1/30", "domain.ru"]
    )
    frequency: FrequencyEnum | None = None
    tg_alerts: bool | None = None


class Asset(AssetBase):
    id: int
    status: StatusEnum
    created_at: datetime
    updated_at: datetime
    start_host_scan_at: datetime | None
    end_host_scan_at: datetime | None
    duration: str | None = Field(None, example="1 м.")

    @field_validator("duration", mode="before")
    def calculate_duration(cls, _, values) -> str | None:
        start = values.get("start_host_scan_at")
        end = values.get("end_host_scan_at")
        if start and end:
            delta = end - start
            return cls._format_duration(delta)
        return None

    @staticmethod
    def _format_duration(delta: timedelta) -> str:
        seconds = delta.total_seconds()
        if seconds < 60:
            return f"{int(seconds)} с."
        elif seconds < 3600:
            return f"{int(seconds // 60)} м."
        elif seconds < 86400:
            return f"{int(seconds // 3600)} ч."
        else:
            return f"{int(seconds // 86400)} д."

    model_config = ConfigDict(from_attributes=True)


class AssetsList(BaseModel):
    assets: List[Asset]
    total_pages: int
    current_page: int
