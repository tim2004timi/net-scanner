from sqlalchemy import DateTime, ForeignKey, ARRAY, String, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import datetime

from ..assets.models import Asset
from ..database import Base


class HostScan(Base):
    __tablename__ = "host_scans"

    domain: Mapped[str | None] = mapped_column(nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime, nullable=False, default=datetime.utcnow
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow
    )
    ips: Mapped[list[str]] = mapped_column(ARRAY(String))
    ports: Mapped[list[int]] = mapped_column(ARRAY(Integer))

    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    user: Mapped["User"] = relationship(back_populates="host_scans")

    asset_id: Mapped[int | None] = mapped_column(
        ForeignKey("assets.id", ondelete="CASCADE"), nullable=True
    )
    asset: Mapped[Asset | None] = relationship(back_populates="host_scans")
