# Backend API Design — Healthcare Platform

**Date:** 2026-04-26  
**Status:** Approved  
**Scope:** MVP backend APIs for all existing frontend pages

---

## Decisions Made

- No user authentication in MVP — all requests anonymous
- Healthcare Services page: search bar hits real backend only, service cards are static
- Doctor availability: simple `availability_text` string stored in DB (no scheduling table)
- Appointments: future scope only — not implemented in MVP

---

## 1. Frontend Page Analysis

| Page | Route | Key Data Needed |
|------|-------|----------------|
| Home | `/` | Static — no API |
| Hospital Listing | `/hospital_listing` | Search, filter by department/rating/distance, paginated list |
| Hospital Detail | `/hospital_detail` | Full hospital info, doctors, real-time bed/ICU metrics, centers of excellence |
| Emergency | `/emergency` | Nearby hospitals with ICU status, beds available, ETA, distance; filter chips |
| Emergency Assistance | `/emergency_assistance` | Location search, submit emergency request form |
| Healthcare Services | `/healthcare_services` | Global search (hospitals + doctors) |

---

## 2. Module Structure (Option A — Domain-grouped)

```
com.healthcare
├── controller
│   ├── HospitalController.java
│   ├── EmergencyController.java
│   └── SearchController.java
├── service
│   ├── HospitalService.java
│   ├── EmergencyService.java
│   └── SearchService.java
├── repository
│   ├── HospitalRepository.java
│   ├── DoctorRepository.java
│   ├── BedRepository.java
│   └── EmergencyRequestRepository.java
├── entity
│   ├── Hospital.java (existing — needs new fields)
│   ├── Department.java
│   ├── Doctor.java
│   ├── Bed.java
│   ├── Service.java
│   └── EmergencyRequest.java
├── dto
│   ├── hospital/
│   │   ├── HospitalListItemDTO.java
│   │   ├── HospitalDetailDTO.java
│   │   ├── DoctorDTO.java
│   │   ├── RealTimeMetricDTO.java
│   │   └── CenterOfExcellenceDTO.java
│   ├── emergency/
│   │   ├── EmergencyHospitalDTO.java
│   │   ├── CreateEmergencyRequestDTO.java
│   │   └── EmergencyRequestResponseDTO.java
│   └── search/
│       └── SearchResultDTO.java
├── mapper
│   ├── HospitalMapper.java
│   └── EmergencyMapper.java
└── exception
    ├── ResourceNotFoundException.java
    └── GlobalExceptionHandler.java
```

---

## 3. MVP Endpoint Map

### Hospital Module — `HospitalController`

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/api/v1/hospitals` | List + search + filter (paginated) |
| `GET` | `/api/v1/hospitals/{id}` | Full hospital detail |
| `GET` | `/api/v1/hospitals/nearby` | Nearby hospitals by lat/lng |

### Emergency Module — `EmergencyController`

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/api/v1/emergency/hospitals` | Nearby hospitals with ICU/bed/ETA data |
| `POST` | `/api/v1/emergency/requests` | Submit emergency assistance request |

### Search Module — `SearchController`

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/api/v1/search` | Global search across hospitals + doctors |

**Total MVP endpoints: 6**

---

## 4. Query Parameters

### `GET /api/v1/hospitals`
| Param | Type | Required | Default | Notes |
|-------|------|----------|---------|-------|
| `search` | String | No | — | Name filter |
| `department` | String | No | — | e.g. "Cardiology" |
| `rating` | Double | No | — | Min rating, e.g. 4.5 |
| `latitude` | Double | No | — | For distance sort/filter |
| `longitude` | Double | No | — | For distance sort/filter |
| `radius` | Double | No | 50 | km radius when lat/lng provided |
| `page` | int | No | 0 | 0-indexed |
| `size` | int | No | 20 | Max 100 |

### `GET /api/v1/hospitals/nearby`
| Param | Type | Required | Default |
|-------|------|----------|---------|
| `latitude` | Double | Yes | — |
| `longitude` | Double | Yes | — |
| `radius` | Double | No | 10km |

### `GET /api/v1/emergency/hospitals`
| Param | Type | Required | Notes |
|-------|------|----------|-------|
| `latitude` | Double | Yes | User's current location |
| `longitude` | Double | Yes | Sorted by distance ascending |

### `GET /api/v1/search`
| Param | Type | Required | Notes |
|-------|------|----------|-------|
| `q` | String | Yes | Min 2 chars |
| `type` | String | No | `hospital`, `doctor`, or `all` (default) |

---

## 5. Entity Changes (DB Migration V2)

### `hospitals` — add columns
| Column | Type | Reason |
|--------|------|--------|
| `image_url` | VARCHAR(512) | Hospital card image + detail hero |
| `tagline` | VARCHAR(512) | Detail page subtitle |
| `badge` | VARCHAR(100) | "Multi-Specialty", "Level 1 Trauma" |
| `clinical_philosophy` | TEXT | Detail philosophy section |
| `daily_rate` | INTEGER | ₹/day shown on listing card |
| `specialist_count` | INTEGER | Detail stats |
| `experience_text` | VARCHAR(100) | "12+ Years Avg." — doctor experience summary shown on listing card |
| `review_count` | VARCHAR(50) | "2.4k Reviews" — display string shown on detail page |
| `availability_text` | VARCHAR(100) | "Available Tomorrow" — availability label on listing card |

### `doctors` — add columns
| Column | Type | Reason |
|--------|------|--------|
| `image_url` | VARCHAR(512) | Doctor avatar |
| `title` | VARCHAR(255) | "Senior Cardiologist" display title |
| `rating` | DECIMAL(3,2) | Doctor card rating |
| `review_count` | VARCHAR(50) | "120+" text |
| `availability_text` | VARCHAR(255) | "Available Today 14:00–18:00" |

### `departments` — add column
| Column | Type | Reason |
|--------|------|--------|
| `icon` | VARCHAR(100) | Centers of Excellence icon name |

### `beds` — add column
| Column | Type | Reason |
|--------|------|--------|
| `bed_type` | VARCHAR(50) | `GENERAL` or `ICU` |

### `emergency_requests` — add columns
| Column | Type | Reason |
|--------|------|--------|
| `patient_name` | VARCHAR(255) | From Emergency Assistance form |
| `patient_phone` | VARCHAR(20) | From form |
| `location_text` | VARCHAR(512) | Location string |
| `emergency_notes` | TEXT | Notes from form |

---

## 6. DTO Design

### `HospitalListItemDTO`
```
id, name, imageUrl, dailyRate, rating, experience,
departments[], availability, availabilityTone, badge
```
> `experience` maps from `hospitals.experience_text`. `availability` maps from `hospitals.availability_text`. `availabilityTone` derived at runtime: `available` if any general bed available, `limited` if <10% free, `unavailable` if 0.

### `HospitalDetailDTO`
```
id, name, tagline, rating, reviewCount, imageUrl, badge,
specialists, bedCapacity, founded, clinicalPhilosophy,
centers[CenterOfExcellenceDTO],
realTimeMetrics[RealTimeMetricDTO],
doctorsList[DoctorDTO]
```
> `reviewCount` maps from `hospitals.review_count`. `bedCapacity` maps from sum of `beds.total_beds` for hospital. `specialists` maps from `hospitals.specialist_count`.

### `DoctorDTO`
```
id, name, title, rating, reviewCount, availability, imageUrl
```

### `RealTimeMetricDTO`
```
label, value, icon, status   // status: good | limited | full
```
> Computed from beds table: ICU available = ICU beds where (total - occupied > 0)

### `CenterOfExcellenceDTO`
```
name, icon
```

### `EmergencyHospitalDTO`
```
id, name, imageUrl, badge, rating,
etaMinutes, distanceKm, icuStatus, bedsAvailable
```
> `etaMinutes` estimated from distance (distanceKm × 3 min/km, rounded). `icuStatus`: AVAILABLE / LIMITED / FULL derived from ICU bed occupancy.

### `CreateEmergencyRequestDTO` (request body)
```
emergencyType   String   required
patientName     String   required
phoneNumber     String   required
latitude        Double   required
longitude       Double   required
location        String   optional
emergencyNotes  String   optional
hospitalId      Long     optional
```

### `EmergencyRequestResponseDTO`
```
requestId, hospitalName, hospitalPhone, status, message, createdAt
```

### `SearchResultDTO`
```
type (hospital | doctor), id, name, subtitle, imageUrl
```
> `subtitle` = badge for hospital, specialization for doctor

---

## 7. Service Methods

### `HospitalService`
```
List<HospitalListItemDTO> search(String query, String department, Double rating,
                                  Double lat, Double lng, Double radius, Pageable pageable)
HospitalDetailDTO getById(Long id)
List<HospitalListItemDTO> getNearby(Double lat, Double lng, Double radius)
```

### `EmergencyService`
```
List<EmergencyHospitalDTO> getNearbyEmergencyHospitals(Double lat, Double lng)
EmergencyRequestResponseDTO submitRequest(CreateEmergencyRequestDTO dto)
```

### `SearchService`
```
List<SearchResultDTO> search(String query, String type)
```

---

## 8. Repository Methods

### `HospitalRepository`
```java
List<Hospital> findByNameContainingIgnoreCase(String name);

@Query("SELECT h FROM Hospital h WHERE " +
       "(6371 * acos(cos(radians(:lat)) * cos(radians(h.latitude)) * " +
       "cos(radians(h.longitude) - radians(:lng)) + " +
       "sin(radians(:lat)) * sin(radians(h.latitude)))) < :radius")
List<Hospital> findNearby(@Param("lat") Double lat,
                           @Param("lng") Double lng,
                           @Param("radius") Double radiusKm);
```

### `BedRepository`
```java
List<Bed> findByHospitalIdAndBedType(Long hospitalId, String bedType);
```

### `EmergencyRequestRepository`
```java
// Standard JpaRepository — no custom queries needed for MVP
```

---

## 9. Validation Rules

### `POST /api/v1/emergency/requests`
| Field | Rule |
|-------|------|
| `emergencyType` | `@NotBlank`, valid enum: `road_accident`, `heart_attack`, `breathing_difficulty`, `unconscious`, `severe_bleeding`, `other` |
| `patientName` | `@NotBlank`, `@Size(max=255)` |
| `phoneNumber` | `@NotBlank`, `@Pattern(regexp="^[0-9]{10}$")` |
| `latitude` | `@NotNull`, `@DecimalMin("-90.0")`, `@DecimalMax("90.0")` |
| `longitude` | `@NotNull`, `@DecimalMin("-180.0")`, `@DecimalMax("180.0")` |
| `location` | optional, `@Size(max=512)` |
| `emergencyNotes` | optional, `@Size(max=1000)` |
| `hospitalId` | optional Long |

### `GET /api/v1/search`
- `q` required, min length 2 (validated in controller with `@RequestParam`)

### `GET /api/v1/emergency/hospitals`
- `latitude` and `longitude` required — return `400 INVALID_REQUEST` if missing

---

## 10. Error Response Format

```json
{
  "status": "error",
  "code": "VALIDATION_ERROR",
  "message": "Phone number must be 10 digits",
  "errors": [
    { "field": "phoneNumber", "message": "Phone number must be 10 digits" }
  ],
  "timestamp": "2026-04-26T10:00:00Z",
  "path": "/api/v1/emergency/requests"
}
```

| Code | HTTP Status | When |
|------|-------------|------|
| `VALIDATION_ERROR` | 400 | Request body fails `@Valid` |
| `INVALID_REQUEST` | 400 | Missing required query params |
| `RESOURCE_NOT_FOUND` | 404 | `GET /hospitals/{id}` with unknown ID |
| `INTERNAL_SERVER_ERROR` | 500 | Unhandled exception |

---

## 11. Response Payload Examples

### `GET /api/v1/hospitals?search=apollo`
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "name": "Apollo Hospital",
      "imageUrl": "https://...",
      "dailyRate": 2800,
      "rating": 4.7,
      "experience": "10+ Years Avg.",
      "departments": ["Orthopedic", "Radiology", "Gastro"],
      "availability": "Available Tomorrow",
      "availabilityTone": "available",
      "badge": "Multi-Specialty"
    }
  ],
  "pagination": { "page": 0, "size": 20, "total": 1, "totalPages": 1 },
  "timestamp": "2026-04-26T10:00:00Z"
}
```

### `GET /api/v1/emergency/hospitals?latitude=28.70&longitude=77.10`
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "name": "City Emergency",
      "imageUrl": "https://...",
      "badge": { "label": "Emergency Hub", "tone": "tertiary" },
      "rating": 4.8,
      "etaMinutes": 4,
      "distanceKm": 1.2,
      "icuStatus": "AVAILABLE",
      "bedsAvailable": 12
    }
  ],
  "timestamp": "2026-04-26T10:00:00Z"
}
```

### `POST /api/v1/emergency/requests` — response 201
```json
{
  "status": "success",
  "data": {
    "requestId": "ER-12345",
    "hospitalName": "City Emergency",
    "hospitalPhone": "+91-11-123456",
    "status": "INITIATED",
    "message": "We've alerted City Emergency. Call ambulance immediately.",
    "createdAt": "2026-04-26T10:00:00Z"
  },
  "timestamp": "2026-04-26T10:00:00Z"
}
```

### `GET /api/v1/search?q=cardiac`
```json
{
  "status": "success",
  "data": [
    { "type": "hospital", "id": 1, "name": "Apollo Hospital", "subtitle": "Multi-Specialty", "imageUrl": "https://..." },
    { "type": "doctor", "id": 101, "name": "Dr. Julian Vance", "subtitle": "Senior Cardiologist", "imageUrl": "https://..." }
  ],
  "timestamp": "2026-04-26T10:00:00Z"
}
```

---

## 12. Implementation Order (MVP)

### Phase 1 — Foundation
1. DB migration V2 (add missing columns to all tables)
2. Update `Hospital` entity with new fields
3. Update `Doctor`, `Department`, `Bed`, `EmergencyRequest` entities
4. Seed hospital + doctor data (SQL insert scripts)

### Phase 2 — Hospital Module
5. `HospitalRepository` — search + nearby queries
6. `HospitalMapper` — entity → DTO
7. `HospitalService` — search, getById, getNearby
8. `HospitalController` — 3 endpoints
9. Unit tests for service + controller

### Phase 3 — Emergency Module
10. `BedRepository` — findByHospitalIdAndBedType
11. `EmergencyService` — getNearbyEmergencyHospitals + submitRequest
12. `EmergencyController` — 2 endpoints
13. `GlobalExceptionHandler` — VALIDATION_ERROR + RESOURCE_NOT_FOUND
14. Unit tests

### Phase 4 — Search Module
15. `SearchService` — query hospitals + doctors, merge results
16. `SearchController` — 1 endpoint
17. Unit tests

---

## 13. Future Scope (Not MVP)

- `POST /api/v1/appointments` — Book appointment with doctor
- `GET /api/v1/appointments/{id}` — Appointment status
- `GET /api/v1/first-aid` — First aid articles library
- `GET /api/v1/first-aid/{id}` — First aid article detail
- `WS /api/v1/emergency-alerts` — WebSocket for real-time hospital alerts
- User authentication (register/login/JWT)
- Doctor schedule time slots (replace `availability_text`)
- Hospital reviews/ratings submission
- Insurance filtering backend support
