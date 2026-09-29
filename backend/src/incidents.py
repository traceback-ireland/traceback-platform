from fastapi import APIRouter, HTTPException, status, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from geoalchemy2 import WKTElement

from src.database import get_db
from src.models import IncidentModel, DeviceModel

# Router responsável pelos endpoints relacionados com incidentes
router = APIRouter(prefix="/incidents", tags=["Incidentes"])

# Dados recebidos pela API para registrar uma emergência
# Latitude e Longitude representam a localização do incidente
class IncidentCreate(BaseModel):
    device_id: int 
    latitude: float
    longitude: float

# Endpoint para registrar um novo incidente de emergência
@router.post("/emergencia", status_code=status.HTTP_201_CREATED)
def create_emergency_incident(
    incident: IncidentCreate,
    db: Session = Depends(get_db)
):
    # Garante que a Latitude esteja dentro dos limites geográficos válidos
    if not -90 <= incident.latitude <= 90:
        raise HTTPExeption(
            status_code=400,
            detail="Invalid latitude."
        )

    # Garante que o Longitude esteja dentro dos limites geográficos válidos
    if not -180 <= incident.longitude <=180:
        raise HTTPExeption(
            status_code=400,
            detail="Invalid longitude."
        )
    
    # Converte Latitude e Longitude para um ponto geográfico
    # no formato esperado pelo PostGIS: POINT(Longitude Latitude)
    location = WKTElement(
        f"POINT({incident.longitude} {incident.latitude})",
        srid=4326
    )

    # Procura o dispositivo informado e obtem o utilizador associado.
    device = db.query(DeviceModel).filter(
        DeviceModel.id == incident.device_id
    ).first()

    if not device:
        raise HTTPException(
            status_code=404,
            detail="Device not found."
        )

    # Cria o registro do incidente para ser salvo no PostgreSQL
    new_incident = IncidentModel(
        user_id=device.user_id,
        device_id=incident.device_id,
        location=location
    )

    # Adiciona o incidente à sessão do banco de dados
    db.add(new_incident)

    # Salva o registro no PostgreSQL
    db.commit()

    # Atualiza o objeto com os dados gerados pelo banco,
    # como o ID e a data do incidente
    db.refresh(new_incident)

    # Retorna uma confirmação com os principais dados do incidente
    return {
        "message": "Emergency incident successfully created.",
        "incident": {
            "id": new_incident.id,
            "device_id": new_incident.device_id,
            "latitude": incident.latitude,
            "longitude": incident.longitude,
            "reported_at": new_incident.reported_at
        }
    }