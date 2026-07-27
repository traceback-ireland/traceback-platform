# 🛡️ Data Protection Impact Assessment (DPIA) - Draft
**Document Reference: docs/DPIA.md**
**Project:** TraceBack Ireland

---

## 1. Project Description & Context
TraceBack Ireland is a volunteer-led emergency portal designed to assist citizens in recording, reporting, and tracking stolen or lost mobile devices. Because the platform processes real-time GPS location data, unique device identifiers (IMEI), and personal contact information adjacent to law enforcement activities, this DPIA is established to mitigate privacy risks under the EU GDPR and Irish Data Protection Act.

---

## 2. Data Inventory & Mapping (Who & What)

We collect and process personal data across four main flows. 

### A. Pre-Registration Flow
*   **Data Collected:** Full Name, County/City of residence, Email Address, Device Brand, Device Model, and 15-digit IMEI number.
*   **Purpose:** To build a preventive baseline registry so citizens can act instantly if their device is stolen.

### B. Emergency / "Panic Button" Flow (Hot Report)
*   **Data Collected:** Current live GPS Coordinates (Latitude/Longitude), Timestamp of the incident, and Device ID.
*   **Purpose:** Immediate capture of location data right after a theft occurs to preserve evidence for law enforcement.

### C. Cold Report Flow
*   **Data Collected:** Date, time, approximate location of past theft, and descriptive details of the event.
*   **Purpose:** Static reporting for statistical analysis and logging incidents that are not currently active.

### D. Witness Flow
*   **Data Collected:** Witness name (optional), email, location of observed suspicious activity, and descriptive notes.
*   **Purpose:** Community crowdsourcing of metadata regarding local theft hotspots.

---

## 3. Lawfulness of Processing (GDPR Art. 6 & LED Alignment)

To process this data legally within Ireland, we rely on the following pillars:

1.  **Consent (GDPR Art. 6(1)(a)):** Applicable for the **Pre-Registration Flow**. Users explicitly opt-in to store their names and IMEIs in our database.
2.  **Vital Interests / Public Task (GDPR Art. 6(1)(d) & (e)):** Applicable during the **Emergency Flow**. Processing live location tracking under acute duress/theft acts to protect user property and feeds directly into a public interest framework (cooperating with *An Garda Síochána* to prevent crime) [cite: 40].
3.  **Law Enforcement Directive (LED) Alignment:** Once an active incident is shared with or accessed by an analyst from the Garda, the data flow shifts from a consumer platform to law enforcement processing, requiring strict access boundaries [cite: 40].

---

## 4. Risk Assessment & Technical Mitigations

| Identified Risk | Impact | Likelihood | Technical/Organizational Mitigation |
| :--- | :---: | :---: | :--- |
| **Unauthorized Access to Live GPS Data** | High | Medium | Implement **Row Level Security (RLS)** in PostgreSQL. Citizens only query their own records; authorities only access active incidents. |
| **IMEI Enumeration / Brute Force Attacks** | Medium | Low | Strict **Rate Limiting** on the `/dispositivos` and `/auth` endpoints. Implementation of the **Luhn Algorithm** to instantly reject mathematically fake IMEIs. |
| **Session Hijacking under stress** | High | Medium | Complete elimination of traditional passwords. Authentication relies exclusively on short-lived, single-use secure **Email Magic Links (UUIDv4)** expiring in 15 minutes. |
| **Indefinite Data Retention** | Medium | High | Automated purging scripts. Data will be anonymized or hard-deleted 3 years after case closure or upon user account deletion request. |

---

## 5. Sign-off and Review Track
*   **Drafted By:** @[SeuUsuarioDoGitHub] & @Ursula
*   **Status:** Under Review (Phase 1 MVP)
*   **Last Updated:** July 2026
