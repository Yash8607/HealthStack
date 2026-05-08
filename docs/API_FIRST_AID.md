# First Aid Library API

**Base URL:** `http://localhost:8080/api/v1/first-aid`

---

## Overview

First aid articles and educational resources for emergency medical guidance.

---

## Endpoints

### Get First Aid Articles

**Endpoint:** `GET /api/v1/first-aid`

**Purpose:** Retrieve list of published first aid articles with optional category filtering.

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `category` | string | No | Filter articles by category (e.g., "CPR", "Burns", "Bleeding") |

**Request Examples:**
```bash
# Get all published articles
curl -X GET "http://localhost:8080/api/v1/first-aid"

# Get articles for specific category
curl -X GET "http://localhost:8080/api/v1/first-aid?category=CPR"
```

**Response (200 OK):**
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "title": "CPR (Cardiopulmonary Resuscitation)",
      "description": "Step-by-step guide for performing CPR on an unconscious person to maintain circulation",
      "steps": "1. Check responsiveness and call 911\n2. Place on hard surface\n3. Tilt head back\n4. Open airway\n5. Give 30 chest compressions\n6. Give 2 rescue breaths\n7. Continue CPR cycle",
      "precautions": "Do not interrupt compressions. Apply proper force (2-2.4 inches depth). Ensure airway is clear before rescue breaths.",
      "category": "CPR",
      "published": true,
      "createdAt": "2026-02-15T08:30:00Z",
      "updatedAt": "2026-04-20T14:22:30Z"
    },
    {
      "id": 2,
      "title": "Severe Bleeding Control",
      "description": "Techniques to stop severe bleeding and apply pressure dressings",
      "steps": "1. Put on gloves\n2. Call emergency services\n3. Apply direct pressure with clean cloth\n4. Maintain pressure for 10-15 minutes\n5. Apply tourniquet above wound if needed\n6. Elevate limb if possible",
      "precautions": "Do not remove embedded objects. Use sterile materials when available. Keep victim calm and lying down.",
      "category": "Bleeding",
      "published": true,
      "createdAt": "2026-02-16T09:00:00Z",
      "updatedAt": "2026-04-20T14:22:30Z"
    },
    {
      "id": 3,
      "title": "Burns Treatment",
      "description": "First aid management for thermal burns of varying severity",
      "steps": "1. Remove from heat source\n2. Cool burn with water for 10-20 minutes\n3. Remove jewelry and tight clothing\n4. Cover with clean, non-stick dressing\n5. Give pain reliever if conscious\n6. Elevate affected area",
      "precautions": "Do not apply ice directly. Do not apply ointments. For severe burns, call emergency services immediately.",
      "category": "Burns",
      "published": true,
      "createdAt": "2026-02-17T10:15:00Z",
      "updatedAt": "2026-04-20T14:22:30Z"
    }
  ],
  "timestamp": "2026-05-08T10:15:30Z"
}
```

**Response with Category Filter (200 OK):**
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "title": "CPR (Cardiopulmonary Resuscitation)",
      "description": "Step-by-step guide for performing CPR on an unconscious person to maintain circulation",
      "steps": "1. Check responsiveness and call 911\n2. Place on hard surface\n3. Tilt head back\n4. Open airway\n5. Give 30 chest compressions\n6. Give 2 rescue breaths\n7. Continue CPR cycle",
      "precautions": "Do not interrupt compressions. Apply proper force (2-2.4 inches depth). Ensure airway is clear before rescue breaths.",
      "category": "CPR",
      "published": true,
      "createdAt": "2026-02-15T08:30:00Z",
      "updatedAt": "2026-04-20T14:22:30Z"
    }
  ],
  "timestamp": "2026-05-08T10:15:30Z"
}
```

**Error Response (500 Server Error):**
```json
{
  "status": "error",
  "code": "INTERNAL_SERVER_ERROR",
  "message": "Error retrieving first aid articles",
  "timestamp": "2026-05-08T10:15:30Z"
}
```

---

## Response Model

### FirstAidDTO
```typescript
{
  id: number;
  title: string;                    // Article title
  description: string;              // Brief description
  steps: string;                    // Numbered/detailed steps
  precautions: string;              // Safety warnings and precautions
  category: string;                 // Article category/topic
  published: boolean;               // Published/draft status
  createdAt: ISO8601DateTime;       // Creation timestamp
  updatedAt: ISO8601DateTime;       // Last updated timestamp
}
```

---

## Categories

Common first aid categories (non-exhaustive):
- `CPR` – Cardiopulmonary resuscitation
- `Bleeding` – Severe bleeding control
- `Burns` – Thermal and chemical burns
- `Fractures` – Bone fractures and sprains
- `Choking` – Airway obstruction
- `Poisoning` – Toxic ingestion
- `Shock` – Hypovolemic/anaphylactic shock
- `Allergic Reactions` – Anaphylaxis
- `Heatstroke` – Heat-related illness
- `Hypothermia` – Cold exposure

---

## HTTP Status Codes

| Code | Scenario |
|------|----------|
| `200` | Articles retrieved successfully |
| `500` | Server error during retrieval |

---

## Notes

- **Published Filter:** Only returns articles with `published = true`
- **No Pagination:** All published articles are returned (consider adding pagination in future)
- **Case Sensitivity:** Category filter is case-sensitive
- **Ordering:** Articles ordered by creation date (oldest first)
