# TraceBack Backend

Backend API for the TraceBack project built with **FastAPI** and **PostgreSQL** (with PostGIS support).

## Local Setup

1. **Install dependencies:**
   Make sure you have your virtual environment active, then run:
   ```bash
   pip install -r requirements.txt
   ```

2. **Configure Environment Variables:**
   Copy the template file `.env.example` to create your local configurations:
   ```bash
   cp .env.example .env
   ```
   Open the newly created `.env` file and fill in your local PostgreSQL database credentials.

3. **Run the API:**
   ```bash
   uvicorn src.main:app --reload
   ```
   The server will start running locally at `http://localhost:8000`.

## Available Endpoints

- `GET /health` - Application health check (verifies API and Database connection status).
- `GET /database-test` - Quick diagnostic endpoint to test direct database connectivity.

---
*Phase 1: Minimum Viable Product (MVP)*
