from fastapi import FastAPI
from src.database import test_connection

app = FastAPI(
    title="TraceBack API",
    description="API do projeto TraceBack",
    version="0.1.0"
)


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
