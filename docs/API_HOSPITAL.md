# Hospital Management API

**Base URL:** `http://localhost:8080/api/v1/hospitals`

---

## Overview

Hospital discovery and management endpoints for searching, retrieving details, and finding nearby hospitals based on geolocation.

---

## Endpoints

### 1. Search Hospitals (Paginated)

**Endpoint:** `GET /api/v1/hospitals`

**Purpose:** Search for hospitals by name with pagination support.

**Query Parameters:**
| Parameter | Type | Default | Required | Description |
|-----------|------|---------|----------|-------------|
| `search` | string | "" | No | Hospital name search query (case-insensitive) |
| `page` | integer | 0 | No | Page number (0-indexed) |
| `size` | integer | 20 | No | Items per page (max 100) |

**Request Example:**
```bash
curl -X GET "http://localhost:8080/api/v1/hospitals?search=Apollo&page=0&size=10"
```

**Response (200 OK):**
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
      "email": "contact@apollo.com",
      "establishedYear": 1983,
      "rating": 4.5,
      "active": true,
      "createdAt": "2026-01-01T10:00:00Z",
      "updatedAt": "2026-04-21T12:30:00Z"
    }
  ],
  "page": 0,
  "size": 10,
  "total": 25,
  "totalPages": 3,
  "timestamp": "2026-05-08T10:15:30Z"
}
```

**Error Response (400 Bad Request):**
```json
{
  "status": "error",
  "code": "VALIDATION_ERROR",
  "message": "Invalid page number",
  "timestamp": "2026-05-08T10:15:30Z"
}
```

---

### 2. Get Hospital Details

**Endpoint:** `GET /api/v1/hospitals/{id}`

**Purpose:** Retrieve complete hospital details including departments, doctors, and bed availability.

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | long | Yes | Hospital ID |

**Request Example:**
```bash
curl -X GET "http://localhost:8080/api/v1/hospitals/1"
```

**Response (200 OK):**
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
    "establishedYear": 1983,
    "rating": 4.5,
    "active": true,
    "departments": [
      {
        "id": 101,
        "name": "Cardiology",
        "description": "Heart and cardiovascular care",
        "doctors": [
          {
            "id": 1001,
            "name": "Dr. Rajesh Kumar",
            "specialization": "Cardiologist",
            "qualification": "MBBS, MD (Cardiology)",
            "phone": "+91-98765432"
          }
        ]
      },
      {
        "id": 102,
        "name": "Orthopedics",
        "description": "Bone and joint care",
        "doctors": [
          {
            "id": 1002,
            "name": "Dr. Priya Singh",
            "specialization": "Orthopedic Surgeon",
            "qualification": "MBBS, MS (Orthopedics)",
            "phone": "+91-98765431"
          }
        ]
      }
    ],
    "beds": {
      "id": 201,
      "totalBeds": 500,
      "occupiedBeds": 350,
      "availableBeds": 150
    },
    "createdAt": "2026-01-01T10:00:00Z",
    "updatedAt": "2026-04-21T12:30:00Z"
  },
  "timestamp": "2026-05-08T10:15:30Z"
}
```

**Error Response (404 Not Found):**
```json
{
  "status": "error",
  "code": "RESOURCE_NOT_FOUND",
  "message": "Hospital with ID 999 not found",
  "timestamp": "2026-05-08T10:15:30Z",
  "path": "/api/v1/hospitals/999"
}
```

---

### 3. Find Nearby Hospitals

**Endpoint:** `GET /api/v1/hospitals/nearby`

**Purpose:** Find hospitals within specified radius using geolocation coordinates.

**Query Parameters:**
| Parameter | Type | Required | Unit | Description |
|-----------|------|----------|------|-------------|
| `latitude` | double | Yes | degrees | User latitude (-90 to 90) |
| `longitude` | double | Yes | degrees | User longitude (-180 to 180) |
| `radius` | double | No | km | Search radius (default: 5 km) |

**Validation Rules:**
- Latitude must be between -90 and 90
- Longitude must be between -180 and 180
- Radius must be positive

**Request Example:**
```bash
curl -X GET "http://localhost:8080/api/v1/hospitals/nearby?latitude=28.7041&longitude=77.1025&radius=10"
```

**Response (200 OK):**
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
      "email": "contact@apollo.com",
      "establishedYear": 1983,
      "rating": 4.5,
      "active": true,
      "createdAt": "2026-01-01T10:00:00Z",
      "updatedAt": "2026-04-21T12:30:00Z"
    },
    {
      "id": 2,
      "name": "Max Healthcare",
      "address": "Gurgaon, India",
      "latitude": 28.4595,
      "longitude": 77.0266,
      "phone": "+91-124-456789",
      "email": "contact@maxhealthcare.com",
      "establishedYear": 1999,
      "rating": 4.3,
      "active": true,
      "createdAt": "2026-01-02T10:00:00Z",
      "updatedAt": "2026-04-21T12:30:00Z"
    }
  ],
  "timestamp": "2026-05-08T10:15:30Z"
}
```

**Error Response (400 Bad Request):**
```json
{
  "status": "error",
  "code": "VALIDATION_ERROR",
  "message": "Latitude must be between -90 and 90",
  "errors": [
    {
      "field": "latitude",
      "message": "Latitude must be between -90 and 90"
    }
  ],
  "timestamp": "2026-05-08T10:15:30Z"
}
```

---

## Response Models

### HospitalDTO
```typescript
{
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string;
  email: string;
  establishedYear: number;
  rating: number;
  active: boolean;
  createdAt: ISO8601DateTime;
  updatedAt: ISO8601DateTime;
}
```

### HospitalDetailDTO
```typescript
{
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string;
  email: string;
  establishedYear: number;
  rating: number;
  active: boolean;
  departments: DepartmentDTO[];
  beds: BedDTO;
  createdAt: ISO8601DateTime;
  updatedAt: ISO8601DateTime;
}
```

### DepartmentDTO
```typescript
{
  id: number;
  name: string;
  description: string;
  doctors: DoctorDTO[];
}
```

### DoctorDTO
```typescript
{
  id: number;
  name: string;
  specialization: string;
  qualification: string;
  phone: string;
}
```

### BedDTO
```typescript
{
  id: number;
  totalBeds: number;
  occupiedBeds: number;
  availableBeds: number;
}
```

---

## HTTP Status Codes

| Code | Scenario |
|------|----------|
| `200` | Hospital search/details retrieved successfully |
| `400` | Invalid query parameters (invalid coordinates, page, size) |
| `404` | Hospital not found |
| `500` | Server error |

---

## Notes

- **Geolocation:** Uses approximate Haversine formula with 111.32 km/degree conversion
- **Pagination:** Page numbers are 0-indexed; default page size is 20
- **Search:** Case-insensitive partial name matching
- **Active Filter:** Only returns hospitals with `is_active = true`
- **Nearby:** Returns results ordered by distance (nearest first)
