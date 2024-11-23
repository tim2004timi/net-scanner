from typing import List

from sqlalchemy import DateTime, ForeignKey, ARRAY, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime

from ..database import Base


class Asset(Base):
    __tablename__ = "assets"

    name: Mapped[str] = mapped_column(unique=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime, nullable=False, default=datetime.utcnow
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow
    )
    start_host_scan_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    end_host_scan_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    type: Mapped[str] = mapped_column()
    status: Mapped[str] = mapped_column()
    frequency: Mapped[str] = mapped_column()
    tg_alerts: Mapped[bool] = mapped_column()

    targets: Mapped[list[str]] = mapped_column(ARRAY(String))

    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    user: Mapped["User"] = relationship(back_populates="assets")

    host_scans: Mapped[List["HostScan"]] = relationship(back_populates="asset")

    vulnerability_scans: Mapped[List["VulnerabilityScan"]] = relationship(
        back_populates="asset"
    )
