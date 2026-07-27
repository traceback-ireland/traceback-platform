# 🛡️ Cybersecurity & GDPR Compliance Guidelines
**Project Document — TraceBack Ireland (MVP Phase 1)**
**Owners:** Project Management & GRC Squad

---

## 1. Core Principles (Privacy by Design)
TraceBack Ireland handles highly sensitive personal data, including unique hardware identifiers (IMEI) and real-time geographic location. Every feature developed must strictly adhere to the following rules:

*   **Data Minimization:** We only collect what is strictly necessary to log an incident with *An Garda Síochána* (Name, Email, County, IMEI, and GPS Location) [cite: 40].
*   **Encryption in Transit:** All connections across the frontend (Vercel) and backend (Render) must enforce **HTTPS/TLS 1.3**. Plain HTTP requests must be rejected.
*   **Encryption at Rest:** Our production PostgreSQL database must utilize full-disk encryption (provided natively by our cloud hosting tiers like Neon/Supabase).

---

## 2. Authentication Security (The Passwordless Flow)
To eliminate credential theft and lower user friction under stress, traditional passwords are completely banned from the MVP architecture.
*   **Token Generation:** The backend must generate cryptographic **UUIDv4** strings for authentication links. Sequential or predictable tokens are strictly prohibited.
*   **Strict Expiration:** Every sent Magic Link must expire exactly **15 minutes** after creation.
*   **Single-Use Rule:** Upon hitting the `POST /auth/verify` endpoint, the token must be instantly wiped (`NULL`) from the database table, blocking any reuse attacks.

---

## 3. Incident Endpoint Protection (Panic Button)
The `POST /incidentes/emergencia` route is the most critical pipeline in the system and must be heavily guarded against malicious actors.
*   **Rate Limiting:** To prevent automated spam or data injection, a single authenticated user can only trigger the emergency endpoint a maximum of **3 times per minute**.
*   **Geofencing Validation:** The backend must cross-check incoming coordinates. If the GPS latitude and longitude fall outside the geographic bounding box of Ireland, the payload must be rejected with a `400 Bad Request`.
*   **GPS Fallback Rule:** If a user denies GPS permissions or accesses the site via desktop after a theft, the system must gracefully accept a **County-level fallback** (e.g., Dublin, Cork) to ensure the incident is logged without crashing [cite: 40].

---

## 4. Database Access & Isolation (Row Level Security)
Data boundaries must be enforced directly at the database layer, not just in the Python code.
*   **Citizens:** Users can only query (`SELECT`) device or incident records linked strictly to their own authenticated email address.
*   **Law Enforcement:** Data pipelines to external authorities (*An Garda Síochána*) are restricted to active incidents where `active = TRUE` [cite: 40]. Once a case is legally closed, live tracking visibility is revoked.

---
*Ensuring security, lawfulness, and trust for the citizens of Ireland.*
