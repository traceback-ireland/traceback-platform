import logging
from sqlalchemy import create_engine
from contextlib import closing
from src.config import (
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_USER,
    DB_PASSWORD
)

logger = logging.getLogger(__name__)

DATABASE_URL = (
    f"postgresql://{DB_USER}:{DB_PASSWORD}"
    f"@{DB_HOST}:{DB_PORT}/{DB_NAME}"
)

engine = create_engine(
    DATABASE_URL,
    pool_size=20,
    max_overflow=10,
    pool_pre_ping=True
)


def test_connection():
    try:
        with closing(engine.connect()) as conn:
            return True
    except Exception as error:
        logger.error("Database connection failed")
        return False
