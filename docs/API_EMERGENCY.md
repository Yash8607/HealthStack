# Emergency API Documentation

**Module:** Emergency Management  
**Base URL:** `http://localhost:8080/api/v1`  
**Last Updated:** 2026-05-07

---

## 1. Create Emergency Request

Submit emergency alert to notify nearby hospital.

| Field | Value |
|-------|-------|
| **Method** | POST |
| **Endpoint** | `/api/v1/emergency` |
| **Status Code** | 201 CREATED |
| **Auth** | None (public) |

### Request Body

```json
{
  "latitude": 28.7041,
  "longitude": 77.1025,
  "emergencyType": "CARDIAC_ARREST",
  "hospitalId": 1,
  "userPhone": "+91-98765432xx",
  "userEmail": "patient@example.com",
  "patientName": "John Doe"
}
```

### Request Validation

| Field | Type | Rules | Message |
|-------|------|-------|---------|
| `latitude` | Double | Required, Min: -90, Max: 90 | "Latitude must be between -90 and 90" |
| `longitude` | Double | Required, Min: -180, Max: 180 | "Longitude must be between -180 and 180" |
| `emergencyType` | String | Required, 3-100 chars | "Emergency type must be between 3 and 100 characters" |
| `hospitalId` | Long | Required, Positive | "Hospital ID must be positive" |
| `userPhone` | String | Optional, Max 20 chars | "Phone number must not exceed 20 characters" |
| `userEmail` | String | Required, Valid email format | "User email must be valid" |
| `patientName` | String | Optional, Max 255 chars | "Patient name must not exceed 255 characters" |

### Response Body (201)

```json
{
  "status": "success",
  "data": {
    "requestId": "ER-12345",
    "hospital": {
      "id": 1,
      "name": "Apollo Hospital",
      "phone": "+91-11-123456",
      "address": "Delhi, India",
      "latitude": 28.7041,
      "longitude": 77.1025
    },
    "status": "INITIATED",
    "message": "We've alerted Apollo Hospital. Call ambulance immediately.",
    "createdAt": "2026-05-07T12:30:00Z"
  },
  "timestamp": "2026-05-07T12:30:00Z"
}
```

### Error Responses

**400 BAD_REQUEST** (validation fails):
```json
{
  "status": "error",
  "code": "VALIDATION_ERROR",
  "message": "Latitude must be between -90 and 90",
  "errors": [
    { "field": "latitude", "message": "Latitude must be between -90 and 90" }
  ],
  "timestamp": "2026-05-07T12:30:00Z"
}
```

**404 NOT_FOUND** (hospital doesn't exist):
```json
{
  "status": "error",
  "code": "RESOURCE_NOT_FOUND",
  "message": "Hospital with ID 999 not found",
  "timestamp": "2026-05-07T12:30:00Z"
}
```

### curl Example

```bash
curl -X POST http://localhost:8080/api/v1/emergency \
  -H "Content-Type: application/json" \
  -d '{
    "latitude": 28.7041,
    "longitude": 77.1025,
    "emergencyType": "CARDIAC_ARREST",
    "hospitalId": 1,
    "userPhone": "+91-98765432xx"
  }'
```

### Internal Notes

- Logs hospital ID on create
- Returns HTTP 201 on success
- Validation happens before service layer
- Hospital lookup via ID (immediate fail if not found)

---

## 2. Get Emergencies by Hospital

Fetch all emergency requests for a specific hospital.

| Field | Value |
|-------|-------|
| **Method** | GET |
| **Endpoint** | `/api/v1/emergency/hospital/{hospitalId}` |
| **Status Code** | 200 OK |
| **Auth** | None (public) |

### Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `hospitalId` | Long | Yes | Hospital identifier |

### Response Body (200)

```json
{
  "status": "success",
  "data": [
    {
      "requestId": "ER-12345",
      "hospital": {
        "id": 1,
        "name": "Apollo Hospital",
        "phone": "+91-11-123456",
        "address": "Delhi, India",
        "latitude": 28.7041,
        "longitude": 77.1025
      },
      "status": "INITIATED",
      "message": "We've alerted Apollo Hospital. Call ambulance immediately.",
      "createdAt": "2026-05-07T12:30:00Z"
    }
  ],
  "timestamp": "2026-05-07T12:30:00Z"
}
```

### Error Responses

**404 NOT_FOUND** (hospital doesn't exist):
```json
{
  "status": "error",
  "code": "RESOURCE_NOT_FOUND",
  "message": "Hospital with ID 999 not found",
  "timestamp": "2026-05-07T12:30:00Z"
}
```

### curl Example

```bash
curl -X GET http://localhost:8080/api/v1/emergency/hospital/1
```

### Internal Notes

- Returns empty list if no emergencies for hospital
- No pagination (returns all)
- Ordered by creation time

---

## 3. Get Active Emergencies

Fetch all active emergency requests (status = INITIATED).

| Field | Value |
|-------|-------|
| **Method** | GET |
| **Endpoint** | `/api/v1/emergency/active` |
| **Status Code** | 200 OK |
| **Auth** | None (public) |

### Response Body (200)

```json
{
  "status": "success",
  "data": [
    {
      "requestId": "ER-12345",
      "hospital": {
        "id": 1,
        "name": "Apollo Hospital",
        "phone": "+91-11-123456",
        "address": "Delhi, India",
        "latitude": 28.7041,
        "longitude": 77.1025
      },
      "status": "INITIATED",
      "message": "We've alerted Apollo Hospital. Call ambulance immediately.",
      "createdAt": "2026-05-07T12:30:00Z"
    }
  ],
  "timestamp": "2026-05-07T12:30:00Z"
}
```

### curl Example

```bash
curl -X GET http://localhost:8080/api/v1/emergency/active
```

### Internal Notes

- Filters by status = "INITIATED"
- Returns empty list if none active
- Used by dashboard to show live emergencies

---

## 4. Get Recent Emergencies

Fetch emergency requests from last N minutes.

| Field | Value |
|-------|-------|
| **Method** | GET |
| **Endpoint** | `/api/v1/emergency/recent` |
| **Status Code** | 200 OK |
| **Auth** | None (public) |

### Query Parameters

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `minutes` | int | No | 30 | Time window in minutes |

### Response Body (200)

```json
{
  "status": "success",
  "data": [
    {
      "requestId": "ER-12345",
      "hospital": {
        "id": 1,
        "name": "Apollo Hospital",
        "phone": "+91-11-123456",
        "address": "Delhi, India",
        "latitude": 28.7041,
        "longitude": 77.1025
      },
      "status": "INITIATED",
      "message": "We've alerted Apollo Hospital. Call ambulance immediately.",
      "createdAt": "2026-05-07T12:30:00Z"
    }
  ],
  "timestamp": "2026-05-07T12:30:00Z"
}
```

### curl Example

```bash
# Last 30 minutes (default)
curl -X GET http://localhost:8080/api/v1/emergency/recent

# Last 60 minutes
curl -X GET http://localhost:8080/api/v1/emergency/recent?minutes=60
```

### Internal Notes

- Default window: 30 minutes
- Filters by `createdAt >= now - minutes`
- Used for recent activity timeline

---

## 5. Update Emergency Status

Update emergency request status (acknowledgment, dispatch, arrival, completion).

| Field | Value |
|-------|-------|
| **Method** | PATCH |
| **Endpoint** | `/api/v1/emergency/{emergencyId}/status` |
| **Status Code** | 200 OK |
| **Auth** | None (public) |

### Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `emergencyId` | Long | Yes | Emergency request ID |

### Query Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `status` | String | Yes | New status (ACKNOWLEDGED, DISPATCHED, ARRIVED, COMPLETED, CANCELLED) |

### Response Body (200)

```json
{
  "status": "success",
  "data": {
    "requestId": "ER-12345",
    "hospital": {
      "id": 1,
      "name": "Apollo Hospital",
      "phone": "+91-11-123456",
      "address": "Delhi, India",
      "latitude": 28.7041,
      "longitude": 77.1025
    },
    "status": "ACKNOWLEDGED",
    "message": "Hospital acknowledged emergency.",
    "createdAt": "2026-05-07T12:30:00Z"
  },
  "timestamp": "2026-05-07T12:30:00Z"
}
```

### Status Transitions

| From | To | Meaning |
|------|----|---------| 
| INITIATED | ACKNOWLEDGED | Hospital received alert |
| INITIATED/ACKNOWLEDGED | DISPATCHED | Ambulance dispatched |
| DISPATCHED | ARRIVED | Ambulance arrived at patient location |
| ARRIVED | COMPLETED | Patient transferred to hospital |
| Any | CANCELLED | Emergency cancelled |

### Error Responses

**404 NOT_FOUND** (emergency request doesn't exist):
```json
{
  "status": "error",
  "code": "RESOURCE_NOT_FOUND",
  "message": "Emergency with ID 999 not found",
  "timestamp": "2026-05-07T12:30:00Z"
}
```

**400 BAD_REQUEST** (invalid status):
```json
{
  "status": "error",
  "code": "INVALID_REQUEST",
  "message": "Invalid status: INVALID_STATUS",
  "timestamp": "2026-05-07T12:30:00Z"
}
```

### curl Example

```bash
curl -X PATCH "http://localhost:8080/api/v1/emergency/1/status?status=ACKNOWLEDGED" \
  -H "Content-Type: application/json"
```

### Internal Notes

- Used by hospitals to track response progress
- Logs status update with emergency ID
- No request body required (status via query param)

---

## Status Codes Summary

| Code | Meaning |
|------|---------|
| 200 | Successful GET/PATCH |
| 201 | Successful POST (resource created) |
| 400 | Validation error or invalid request |
| 404 | Emergency/Hospital not found |
| 500 | Server error |

---

## Common Integration Patterns

### Flow 1: Submit Emergency & Track Response

```bash
# 1. Submit emergency
RESPONSE=$(curl -X POST http://localhost:8080/api/v1/emergency \
  -H "Content-Type: application/json" \
  -d '{"latitude":28.7041,"longitude":77.1025,"emergencyType":"CARDIAC_ARREST","hospitalId":1}')

REQUEST_ID=$(echo $RESPONSE | jq -r '.data.requestId')

# 2. Poll for active emergencies
curl -X GET http://localhost:8080/api/v1/emergency/active

# 3. Hospital acknowledges
curl -X PATCH "http://localhost:8080/api/v1/emergency/1/status?status=ACKNOWLEDGED"
```

### Flow 2: Recent Activity Dashboard

```bash
# Get emergencies from last 60 minutes
curl -X GET "http://localhost:8080/api/v1/emergency/recent?minutes=60"
```

### Flow 3: Hospital Emergency Queue

```bash
# Get all emergencies for hospital
curl -X GET http://localhost:8080/api/v1/emergency/hospital/1
```

---

## Changelog

- **2026-05-07** – Initial API documentation generated from controller code
