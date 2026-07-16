from sqlalchemy import create_engine
from src.config import (
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_USER,
    DB_PASSWORD
)


DATABASE_URL = (
    f"postgresql://{DB_USER}:{DB_PASSWORD}"
    f"@{DB_HOST}:{DB_PORT}/{DB_NAME}"
)


engine = create_engine(DATABASE_URL)


def test_connection():
    try:
        connection = engine.connect()
        connection.close()
        return True
    except Exception as error:
        print(error)
        return False