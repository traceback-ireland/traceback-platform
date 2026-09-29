from sqlalchemy import Column, Integer, String, DateTime
from geoalchemy2 import Geometry
from datetime import datetime
from src.database import Base

class DeviceModel(Base):
    __tablename__ = "devices"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(Integer, nullable=False)
    brand = Column(String, nullable=False)
    model = Column(String, nullable=False)
    imei = Column(String(15), unique=True, index=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class IncidentModel(Base):
    __tablename__ = "incidents"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(Integer, nullable=False)
    device_id = Column(Integer, nullable=False)
    reported_at = Column(DateTime, default=datetime.utcnow)
    location = Column(
        Geometry(geometry_type="Point", srid=4326),
        nullable=False
    )
    description = Column(String, nullable=True)
    status = Column(String(20), default="Open", nullable=False)