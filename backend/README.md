# TraceBack Backend

Backend API do projeto TraceBack construído com FastAPI e PostgreSQL.

## Setup

1. Instale as dependências:
```bash
pip install -r requirements.txt
```

2. Configure o arquivo `.env` com as credenciais do PostgreSQL

3. Execute a API:
```bash
uvicorn src.main:app --reload
```

## Endpoints

- `GET /health` - Health check
- `GET /database-test` - Testa conexão com o banco de dados
