# Document Command

Generate & maintain API documentation from backend code.

## Usage

```
/document <module> [action]
```

Examples:
- `/document HospitalService` – Extract & document all APIs in HospitalService
- `/document EmergencyService --update` – Refresh existing Emergency API docs
- `/document all` – Scan all controllers, update Notion docs
- `/document --diff` – Show what changed since last doc

## What It Does

1. Inspects Spring Boot controllers
2. Extracts request/response DTOs
3. Reads validation rules
4. Checks auth requirements
5. Generates curl examples
6. Updates Notion (or outputs markdown)

## Output Format

```
API: Get Hospital Details
Method: GET
Endpoint: /api/v1/hospitals/{id}
Description: Fetch single hospital with departments & beds
Auth: None (public)

Request:
  Path params:
    - id (Long, required) – Hospital ID

Response (200):
  {
    "status": "success",
    "data": {
      "id": 1,
      "name": "Apollo Hospital",
      "departments": [...],
      "beds": { "total": 500, "available": 150 }
    },
    "timestamp": "2026-04-21T12:30:00Z"
  }

Validation:
  - id must be > 0

Errors:
  - 404 NOT_FOUND – Hospital not found
  - 400 BAD_REQUEST – Invalid id

curl:
  curl -X GET http://localhost:8080/api/v1/hospitals/1

Internal Notes:
  - Joins with departments (N+1 risk if not careful)
  - Cached for 5 min
```

## Integration

Reads from:
- `healthcare-BE-services/src/main/java/com/healthcare/controller/`
- `healthcare-BE-services/src/main/java/com/healthcare/dto/`
- `healthcare-BE-services/src/main/java/com/healthcare/service/`

Updates:
- Notion API Documentation (if configured)
- Local markdown files (docs/API_*.md)
- `.claude/agents/apidoc-generator.md` for reference

## Config

Set `NOTION_TOKEN` + `NOTION_DATABASE_ID` in `.claude/settings.json` to auto-sync to Notion.

Otherwise outputs markdown to console/files.
