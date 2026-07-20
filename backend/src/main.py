from fastapi import FastAPI
from src.database import test_connection

app = FastAPI()

@app.get("/health")
def health():
    return {
        "status": "ok"
    }


@app.get("/database-test")
def database_test():
    return {
        "database_connected": test_connection()
    }
