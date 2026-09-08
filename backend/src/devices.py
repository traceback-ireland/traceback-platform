from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel, Field
from typing import Optional
from src.utils import validate_luhn
from src.database import get_db
from src.models import DeviceModel

router = APIRouter(prefix="/dispositivos", tags=["Dispositivos"])

class DeviceCreate(BaseModel):
    brand: str = Field(..., description="Marca do telemóvel")
    model: str = Field(..., description="Modelo do telemóvel")
    imei: str = Field(..., min_length=15, max_length=15, description="IMEI de 15 dígitos")

@router.post("", status_code=status.HTTP_201_CREATED)
def register_device(device: DeviceCreate, db: Session = Depends(get_db)):
    # 1. Validação ativa pelo Algoritmo de Luhn
    if not validate_luhn(device.imei):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="IMEI inválido. A verificação matemática de Luhn falhou."
        )
    
    # 2. Verificar se o IMEI já existe cadastrado no banco
    existing_device = db.query(DeviceModel).filter(DeviceModel.imei == device.imei).first()
    if existing_device:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Este IMEI já está registado no sistema."
        )

    # 3. Salvar o novo dispositivo no PostgreSQL
    new_device = DeviceModel(
        brand=device.brand,
        model=device.model,
        imei=device.imei
    )
    db.add(new_device)
    db.commit()
    db.refresh(new_device)
    
    return {
        "message": "Dispositivo validado e gravado no banco com sucesso!",
        "device": {
            "id": new_device.id,
            "brand": new_device.brand,
            "model": new_device.model,
            "imei": new_device.imei,
            "created_at": new_device.created_at
        }
    }

@router.get("", status_code=status.HTTP_200_OK)
def list_devices(
    skip: int = 0, 
    limit: int = 100, 
    imei: Optional[str] = None, 
    db: Session = Depends(get_db)
):
    """Lista todos os dispositivos cadastrados ou filtra por IMEI."""
    query = db.query(DeviceModel)
    
    if imei:
        query = query.filter(DeviceModel.imei.like(f"%{imei}%"))
    
    devices = query.offset(skip).limit(limit).all()
    
    return {
        "total": len(devices),
        "devices": devices
    }