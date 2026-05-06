# API Contract Rules

Standardized request/response format for healthcare platform APIs.

## Base URL

```
http://localhost:8080/api/v1
```

Production: `https://api.healthcare.com/api/v1`

## Response Format

All successful responses (2xx) follow this envelope:
```json
{
  "status": "success",
  "data": {},
  "timestamp": "2026-04-21T12:30:00Z",
  "path": "/api/v1/hospitals"
}
```

All error responses (4xx, 5xx) follow:
```json
{
  "status": "error",
  "code": "RESOURCE_NOT_FOUND",
  "message": "Hospital with ID 123 not found",
  "timestamp": "2026-04-21T12:30:00Z",
  "path": "/api/v1/hospitals/123"
}
```

## HTTP Status Codes

| Status | Use Case |
|--------|----------|
| `200 OK` | Successful GET/PUT/PATCH |
| `201 CREATED` | Successful POST (resource created) |
| `204 NO_CONTENT` | Successful DELETE |
| `400 BAD_REQUEST` | Validation error (invalid input) |
| `404 NOT_FOUND` | Resource not found |
| `500 INTERNAL_SERVER_ERROR` | Server error |

## Request Methods

| Method | Use | Idempotent | Safe |
|--------|-----|-----------|------|
| `GET` | Retrieve resource | ✓ | ✓ |
| `POST` | Create resource | ✗ | ✗ |
| `PUT` | Replace resource | ✓ | ✗ |
| `DELETE` | Delete resource | ✓ | ✗ |

## Endpoint Conventions

**Pattern:** `/{resource}`, `/{resource}/{id}`, `/{resource}/{action}`

```
GET    /api/v1/hospitals                    List all hospitals
GET    /api/v1/hospitals?search=...         Search hospitals
GET    /api/v1/hospitals/{id}               Get hospital details
GET    /api/v1/hospitals/nearby             Get nearby hospitals (geolocation)
POST   /api/v1/emergency                    Submit emergency request
GET    /api/v1/first-aid                    List first-aid articles
GET    /api/v1/first-aid/{id}               Get first-aid detail
WS     /api/v1/emergency-alerts             WebSocket for hospital notifications
```

## Query Parameters

**Filtering:**
```
GET /api/v1/hospitals?search=apollo&department=cardiology
```

**Pagination:**
```
GET /api/v1/hospitals?page=0&size=20
```

Response includes metadata:
```json
{
  "status": "success",
  "data": [...],
  "pagination": {
    "page": 0,
    "size": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

**Geolocation:**
```
GET /api/v1/hospitals/nearby?latitude=28.7041&longitude=77.1025&radius=5
```

`radius` in kilometers.

## Request Body Format

**POST (create):**
```json
{
  "name": "Apollo Hospital",
  "address": "Delhi, India",
  "latitude": 28.7041,
  "longitude": 77.1025,
  "phone": "+91-11-123456"
}
```

**Validation errors (400 BAD_REQUEST):**
```json
{
  "status": "error",
  "code": "VALIDATION_ERROR",
  "message": "Name is required",
  "errors": [
    { "field": "name", "message": "Name is required" }
  ]
}
```

## Response Examples

### Get Hospital List
**Request:**
```
GET /api/v1/hospitals?search=apollo&page=0&size=10
```

**Response (200):**
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "name": "Apollo Hospital",
      "address": "Delhi, India",
      "latitude": 28.7041,
      "longitude": 77.1025,
      "phone": "+91-11-123456",
      "departments": ["Cardiology", "Orthopedics"],
      "rating": 4.5,
      "createdAt": "2026-01-01T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 0,
    "size": 10,
    "total": 1,
    "totalPages": 1
  },
  "timestamp": "2026-04-21T12:30:00Z"
}
```

### Get Hospital Details
**Request:**
```
GET /api/v1/hospitals/1
```

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "id": 1,
    "name": "Apollo Hospital",
    "address": "Delhi, India",
    "latitude": 28.7041,
    "longitude": 77.1025,
    "phone": "+91-11-123456",
    "email": "contact@apollo.com",
    "departments": [
      {
        "id": 101,
        "name": "Cardiology",
        "doctors": [
          { "id": 1001, "name": "Dr. Smith", "specialization": "Cardiologist" }
        ]
      }
    ],
    "beds": {
      "total": 500,
      "occupied": 350,
      "available": 150
    },
    "rating": 4.5,
    "createdAt": "2026-01-01T10:00:00Z"
  },
  "timestamp": "2026-04-21T12:30:00Z"
}
```

### Submit Emergency Request
**Request:**
```
POST /api/v1/emergency
Content-Type: application/json

{
  "latitude": 28.7041,
  "longitude": 77.1025,
  "emergencyType": "CARDIAC_ARREST",
  "hospitalId": 1
}
```

**Response (201):**
```json
{
  "status": "success",
  "data": {
    "requestId": "ER-12345",
    "hospital": {
      "id": 1,
      "name": "Apollo Hospital",
      "phone": "+91-11-123456"
    },
    "status": "INITIATED",
    "message": "We've alerted Apollo Hospital. Call ambulance immediately.",
    "createdAt": "2026-04-21T12:30:00Z"
  },
  "timestamp": "2026-04-21T12:30:00Z"
}
```

### Error Responses

**404 NOT_FOUND:**
```json
{
  "status": "error",
  "code": "RESOURCE_NOT_FOUND",
  "message": "Hospital with ID 999 not found",
  "timestamp": "2026-04-21T12:30:00Z",
  "path": "/api/v1/hospitals/999"
}
```

**400 BAD_REQUEST (validation):**
```json
{
  "status": "error",
  "code": "VALIDATION_ERROR",
  "message": "Latitude must be between -90 and 90",
  "errors": [
    { "field": "latitude", "message": "Latitude must be between -90 and 90" },
    { "field": "longitude", "message": "Longitude is required" }
  ],
  "timestamp": "2026-04-21T12:30:00Z"
}
```

## WebSocket (Emergency Alerts)

**Connection:**
```
ws://localhost:8080/api/v1/emergency-alerts
```

**Hospital subscribes to alerts:**
```json
{
  "action": "subscribe",
  "hospitalId": 1
}
```

**Incoming emergency alert:**
```json
{
  "type": "EMERGENCY_ALERT",
  "requestId": "ER-12345",
  "emergencyType": "CARDIAC_ARREST",
  "userLocation": { "latitude": 28.7041, "longitude": 77.1025 },
  "userPhone": "+91-98765432xx",
  "timestamp": "2026-04-21T12:30:00Z"
}
```

## Error Codes

| Code | Meaning | HTTP Status |
|------|---------|------------|
| `VALIDATION_ERROR` | Input validation failed | 400 |
| `RESOURCE_NOT_FOUND` | Resource doesn't exist | 404 |
| `UNAUTHORIZED` | Auth required | 401 |
| `INVALID_REQUEST` | Malformed request | 400 |
| `INTERNAL_SERVER_ERROR` | Server error | 500 |
| `SERVICE_UNAVAILABLE` | DB/external service down | 503 |

## Versioning

API versioning via URL path: `/api/v1/`, `/api/v2/`, etc.

Current version: **v1**

## Rate Limiting (Future)

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640000000
```

## Pagination Defaults

- Default page size: `20`
- Max page size: `100`
- Pages are 0-indexed

## Timestamps

- **Format:** ISO 8601 (`2026-04-21T12:30:00Z`)
- **Timezone:** UTC (always)
