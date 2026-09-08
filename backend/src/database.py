import os
import logging
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from contextlib import closing
from dotenv import load_dotenv

# Carrega as variáveis de ambiente do arquivo .env localizado na raiz do projeto
load_dotenv()

# Configuração do Logger
logger = logging.getLogger("uvicorn.error")

# URL de conexão com o PostgreSQL obtida do ambiente
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    logger.error("DATABASE_URL não encontrada no arquivo .env")
    raise ValueError("DATABASE_URL é obrigatória para iniciar a aplicação.")

# Cria o engine do SQLAlchemy
engine = create_engine(DATABASE_URL)

# Base declarativa para os models
Base = declarative_base()

# Fábrica de sessões para as requisições
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    """Dependency para injetar a sessão do banco de dados nas rotas do FastAPI."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def test_connection():
    """Testa a conectividade com o banco de dados."""
    try:
        with closing(engine.connect()) as conn:
            return True
    except Exception as error:
        logger.error(f"Database connection failed: {error}")
        return False