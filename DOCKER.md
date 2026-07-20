# 🐳 Docker Setup - TraceBack Platform

Guia para rodar o projeto usando Docker e Docker Compose.

## Pré-requisitos

- Docker instalado ([Download](https://www.docker.com/products/docker-desktop))
- Docker Compose (incluído no Docker Desktop)

## 🚀 Como rodar

### 1. Clone o repositório
```bash
git clone https://github.com/traceback-ireland/traceback-platform.git
cd traceback-platform
git checkout feature/docker-setup
```

### 2. Configure as variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto:
```bash
DB_HOST=postgres
DB_PORT=5432
DB_NAME=traceback_db
DB_USER=postgres
DB_PASSWORD=password
```

### 3. Inicie os containers
```bash
docker-compose up
```

Ou em background:
```bash
docker-compose up -d
```

### 4. Acesse a API
- **Health Check**: http://localhost:8000/health
- **Database Test**: http://localhost:8000/database-test
- **API Docs**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 📊 Serviços rodando

| Serviço | URL | Descrição |
|---------|-----|-----------|
| Backend (FastAPI) | http://localhost:8000 | API do TraceBack |
| PostgreSQL | localhost:5432 | Banco de dados |

## 🔧 Comandos úteis

### Ver logs
```bash
docker-compose logs -f backend
docker-compose logs -f postgres
```

### Parar os containers
```bash
docker-compose down
```

### Limpar volumes (apaga dados do banco)
```bash
docker-compose down -v
```

### Acessar shell do container
```bash
docker-compose exec backend bash
docker-compose exec postgres psql -U postgres -d traceback_db
```

### Reconstruir imagem
```bash
docker-compose build --no-cache
```

## 📝 Estrutura

```
traceback-platform/
├── backend/
│   ├── src/
│   ├── Dockerfile          # Imagem do backend
│   ├── .dockerignore       # Arquivos ignorados
│   └── requirements.txt
├── docker-compose.yml      # Orquestração dos serviços
└── DOCKER.md              # Este arquivo
```

## 🐛 Troubleshooting

**Porta 5432 já está em uso:**
```bash
# Mudar porta no docker-compose.yml
ports:
  - "5433:5432"  # Use 5433 ao invés de 5432
```

**Container não inicia:**
```bash
# Ver logs detalhados
docker-compose logs backend
```

**PostgreSQL não conecta:**
```bash
# Verificar se container postgres está saudável
docker-compose ps
```

## 📚 Próximos passos

- [ ] Adicionar frontend ao docker-compose
- [ ] Configurar environment variables seguras
- [ ] Setup de migrations do banco
- [ ] Testes automatizados com Docker
