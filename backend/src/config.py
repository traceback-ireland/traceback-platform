import os
from dotenv import load_dotenv

load_dotenv()

# Validar variáveis obrigatórias
DB_HOST = os.getenv("DB_HOST")
if not DB_HOST:
    raise ValueError("DB_HOST é obrigatório! Adicione ao .env")

DB_PORT = os.getenv("DB_PORT")
if not DB_PORT:
    raise ValueError("DB_PORT é obrigatório! Adicione ao .env")

DB_NAME = os.getenv("DB_NAME")
if not DB_NAME:
    raise ValueError("DB_NAME é obrigatório! Adicione ao .env")

DB_USER = os.getenv("DB_USER")
if not DB_USER:
    raise ValueError("DB_USER é obrigatório! Adicione ao .env")

DB_PASSWORD = os.getenv("DB_PASSWORD")
if not DB_PASSWORD:
    raise ValueError("DB_PASSWORD é obrigatório! Adicione ao .env")
