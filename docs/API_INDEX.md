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

## Internal Services & Infrastructure

### Kafka Email Notifications

Status: ✅ Implemented (Hospital + User Notifications)

**Component:** Event-driven email notification system with two topics

**Hospital Notifications:**
- Topic: `healthcare.notification.email`
- Consumer Group: `healthcare-email-group`
- Purpose: Alert hospitals of incoming emergency requests

**User Notifications:**
- Topic: `healthcare.notification.user-email`
- Consumer Group: `healthcare-user-email-group`
- Purpose: Send confirmation emails to patients after emergency request submission

**File:** [KAFKA_EMAIL_FLOW.md](./KAFKA_EMAIL_FLOW.md)

**Features:**
- Async email publishing via Kafka
- Retry mechanism (max 3 retries with backoff)
- Mock SMTP provider for development
- Status tracking (PENDING, SENT, RETRY_PENDING, FAILED)
- Emergency-type-specific first-aid guidance in user emails

**Integration:**
- Hospital alerts: `EmergencyService.createEmergency()` → publishes hospital notification
- User confirmations: `EmergencyService.createEmergency()` → publishes user confirmation email with emergency details, hospital contact info, and first-aid guidance

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
- Kafka Email Notifications: 2026-05-11
- Index: 2026-05-11
