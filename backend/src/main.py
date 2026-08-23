from fastapi import FastAPI
from src.database import test_connection, engine, Base
from src.devices import router as devices_router  # 1. Importe o router de dispositivos

# Cria as tabelas no banco de dados automaticamente se elas não existirem
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="TraceBack API",
    description="API do projeto TraceBack",
    version="0.1.0"
)

# 2. Inclua o router na aplicação
app.include_router(devices_router)


@app.get("/health")
def health():
    """Endpoint de health check."""
    is_connected = test_connection()
    return {
        "status": "ok" if is_connected else "error",
        "database": is_connected
    }


@app.get("/database-test")
def database_test():
    """Testa conexão com o banco de dados."""
    return {
        "database_connected": test_connection()
    }