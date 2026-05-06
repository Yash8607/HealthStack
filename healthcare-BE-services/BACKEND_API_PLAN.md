# Backend API Plan — Healthcare Platform

> Full spec: `docs/superpowers/specs/2026-04-26-backend-api-design.md`

---

## Architecture: Option A — Domain-grouped (3 Controllers)

```
HospitalController   →  /api/v1/hospitals
EmergencyController  →  /api/v1/emergency
SearchController     →  /api/v1/search
```

---

## MVP Endpoints (6 total)

| # | Method | Path | Module | Purpose |
|---|--------|------|--------|---------|
| 1 | `GET` | `/api/v1/hospitals` | Hospital | List + search + filter (paginated) |
| 2 | `GET` | `/api/v1/hospitals/{id}` | Hospital | Full hospital detail |
| 3 | `GET` | `/api/v1/hospitals/nearby` | Hospital | Nearby hospitals by lat/lng |
| 4 | `GET` | `/api/v1/emergency/hospitals` | Emergency | Nearby hospitals with ICU/bed/ETA |
| 5 | `POST` | `/api/v1/emergency/requests` | Emergency | Submit emergency request |
| 6 | `GET` | `/api/v1/search` | Search | Global search (hospitals + doctors) |

---

## Frontend Page → API Mapping

| Page | APIs Used |
|------|-----------|
| Home | None (static) |
| Hospital Listing | `GET /hospitals` |
| Hospital Detail | `GET /hospitals/{id}` |
| Emergency | `GET /emergency/hospitals` |
| Emergency Assistance | `GET /hospitals/nearby` (location search) + `POST /emergency/requests` |
| Healthcare Services | `GET /search` |

---

## DB Changes Required (Migration V2)

### `hospitals` — add
```sql
image_url           VARCHAR(512)
tagline             VARCHAR(512)
badge               VARCHAR(100)
clinical_philosophy TEXT
daily_rate          INTEGER
specialist_count    INTEGER
experience_text     VARCHAR(100)   -- "12+ Years Avg."
review_count        VARCHAR(50)    -- "2.4k Reviews"
availability_text   VARCHAR(100)   -- "Available Tomorrow"
```

### `doctors` — add
```sql
image_url           VARCHAR(512)
title               VARCHAR(255)
rating              DECIMAL(3,2)
review_count        VARCHAR(50)
availability_text   VARCHAR(255)
```

### `departments` — add
```sql
icon                VARCHAR(100)
```

### `beds` — add
```sql
bed_type            VARCHAR(50)   -- 'GENERAL' or 'ICU'
```

### `emergency_requests` — add
```sql
patient_name        VARCHAR(255)
patient_phone       VARCHAR(20)
location_text       VARCHAR(512)
emergency_notes     TEXT
```

---

## DTOs

| DTO | Used By |
|-----|---------|
| `HospitalListItemDTO` | `GET /hospitals` |
| `HospitalDetailDTO` | `GET /hospitals/{id}` |
| `DoctorDTO` | Nested in HospitalDetailDTO |
| `RealTimeMetricDTO` | Nested in HospitalDetailDTO |
| `CenterOfExcellenceDTO` | Nested in HospitalDetailDTO |
| `EmergencyHospitalDTO` | `GET /emergency/hospitals` |
| `CreateEmergencyRequestDTO` | `POST /emergency/requests` (request) |
| `EmergencyRequestResponseDTO` | `POST /emergency/requests` (response) |
| `SearchResultDTO` | `GET /search` |

---

## Validation Rules (`POST /api/v1/emergency/requests`)

| Field | Rule |
|-------|------|
| `emergencyType` | `@NotBlank` + valid enum value |
| `patientName` | `@NotBlank` `@Size(max=255)` |
| `phoneNumber` | `@NotBlank` `@Pattern(regexp="^[0-9]{10}$")` |
| `latitude` | `@NotNull` `@DecimalMin("-90.0")` `@DecimalMax("90.0")` |
| `longitude` | `@NotNull` `@DecimalMin("-180.0")` `@DecimalMax("180.0")` |
| `location` | optional `@Size(max=512)` |
| `emergencyNotes` | optional `@Size(max=1000)` |

---

## Error Response Format

```json
{
  "status": "error",
  "code": "VALIDATION_ERROR",
  "message": "Phone number must be 10 digits",
  "errors": [{ "field": "phoneNumber", "message": "Phone number must be 10 digits" }],
  "timestamp": "2026-04-26T10:00:00Z",
  "path": "/api/v1/emergency/requests"
}
```

---

## Implementation Order

### Phase 1 — Foundation
- [ ] DB migration V2 (all column additions)
- [ ] Update all entities with new fields
- [ ] Seed data SQL scripts

### Phase 2 — Hospital Module
- [ ] `HospitalRepository` (search + nearby Haversine query)
- [ ] `HospitalMapper`
- [ ] `HospitalService` (search, getById, getNearby)
- [ ] `HospitalController` (3 endpoints)
- [ ] Tests

### Phase 3 — Emergency Module
- [ ] `BedRepository` (findByHospitalIdAndBedType)
- [ ] `EmergencyService` (nearby emergency hospitals + submit)
- [ ] `EmergencyController` (2 endpoints)
- [ ] `GlobalExceptionHandler`
- [ ] Tests

### Phase 4 — Search Module
- [ ] `SearchService` (hospitals + doctors merge)
- [ ] `SearchController` (1 endpoint)
- [ ] Tests

---

## Future Scope (Not MVP)

- Appointment booking APIs
- First Aid library APIs
- WebSocket emergency alerts
- User authentication (JWT)
- Doctor time slot scheduling
- Hospital reviews API
- Insurance filter backend support
