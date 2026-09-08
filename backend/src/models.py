from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from src.database import Base

class DeviceModel(Base):
    __tablename__ = "devices"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    brand = Column(String, nullable=False)
    model = Column(String, nullable=False)
    imei = Column(String(15), unique=True, index=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)