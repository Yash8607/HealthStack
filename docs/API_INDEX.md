# Healthcare API Documentation Index

**Project:** Healthcare Platform  
**Base URL:** `http://localhost:8080/api/v1`  
**Generated:** 2026-05-07

---

## API Modules

### 1. Emergency Management (`/api/v1/emergency`)

Status: ✅ Documented

**Endpoints:**
- `POST /api/v1/emergency` – Submit emergency request
- `GET /api/v1/emergency/hospital/{id}` – Get emergencies by hospital
- `GET /api/v1/emergency/active` – Get active emergencies
- `GET /api/v1/emergency/recent` – Get recent emergencies
- `PATCH /api/v1/emergency/{id}/status` – Update emergency status

**File:** [API_EMERGENCY.md](./API_EMERGENCY.md)

**Use Cases:**
- Patient submits emergency alert
- Hospital tracks incoming emergencies
- Dashboard shows live/recent alerts

---

## Planned Modules

- [ ] Hospital Management (`/api/v1/hospitals`)
- [ ] First Aid Library (`/api/v1/first-aid`)
- [ ] User Management (`/api/v1/users`)
- [ ] WebSocket Events (`/api/v1/emergency-alerts`)

---

## Response Format (Standard)

All responses follow envelope format:

**Success (2xx):**
```json
{
  "status": "success",
  "data": {},
  "timestamp": "2026-05-07T12:30:00Z"
}
```

**Error (4xx, 5xx):**
```json
{
  "status": "error",
  "code": "ERROR_CODE",
  "message": "Human-readable message",
  "timestamp": "2026-05-07T12:30:00Z"
}
```

---

## HTTP Status Codes

| Code | Usage |
|------|-------|
| `200` | Successful GET/PATCH |
| `201` | Successful POST (created) |
| `204` | Successful DELETE |
| `400` | Validation/bad request |
| `404` | Resource not found |
| `500` | Server error |

---

## Authentication

Current APIs: **None** (all public)

Future: OAuth 2.0 / JWT (when user management is added)

---

## Tools

**Auto-Generate Docs:**
```bash
/document EmergencyService    # Extract & document APIs
/document all                 # Scan all controllers
```

**Sync to Notion:**
Set `NOTION_TOKEN` + `NOTION_DATABASE_ID` in `.claude/settings.json`

---

## Last Updated

- Emergency API: 2026-05-07
- Index: 2026-05-07
