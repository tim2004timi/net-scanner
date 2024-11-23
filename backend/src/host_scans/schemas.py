from datetime import datetime
from typing import List
from pydantic import (
    BaseModel,
    field_validator,
    ConfigDict,
)
import ipaddress


class HostScanBase(BaseModel):
    domain: str | None
    ips: List[str]
    ports: List[int]

    @field_validator("ips", mode="before")
    def validate_ips(cls, value):
        if not isinstance(value, list):
            raise TypeError("Поле 'ips' должно быть списком строк.")
        validated_ips = []
        for idx, ip in enumerate(value):
            if cls.is_valid_ip(ip):
                validated_ips.append(ip)
            else:
                raise ValueError(
                    f"Элемент в 'ips' под индексом {idx} ('{ip}') "
                    f"не является допустимым IP-адресом"
                )
        return validated_ips

    @staticmethod
    def is_valid_ip(ip: str) -> bool:
        # Проверка на IP-адрес
        try:
            ipaddress.ip_address(ip)
            return True
        except ValueError:
            pass

        return False

    @field_validator("ports", mode="before")
    def validate_ports(cls, value):
        if not isinstance(value, list):
            raise TypeError("Поле 'ports' должно быть списком чисел.")
        validated_ports = []
        for idx, port in enumerate(value):
            if 0 <= port <= 65535:
                validated_ports.append(port)
            else:
                raise ValueError(
                    f"Элемент в 'port' под индексом {idx} ('{port}') "
                    f"не является допустимым портом"
                )
        return validated_ports


class HostScanCreate(HostScanBase):
    pass


class HostScan(HostScanBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class HostScanList(BaseModel):
    host_scans: List[HostScan]
    total_pages: int
    current_page: int
    total_ips: int
    total_domains: int
