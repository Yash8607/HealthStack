# Healthcare Project - Claude Workspace Guide

Full-stack healthcare platform connecting patients to hospitals for emergency & routine care.

## Project Structure

```
HealthCareProject/
├── healthcare-ui/          (Next.js frontend - React)
├── healthcare-BE-services/ (Spring Boot backend - Java)
├── .claude/                (Claude workspace config)
└── docs/                   (API specs, architecture)
```

## Tech Stack

**Frontend:** Next.js 14, React 18, TypeScript, Tailwind CSS
**Backend:** Spring Boot 3, Java 17, PostgreSQL, WebSocket
**DevOps:** Docker, Docker Compose

## Key Workflows

### Frontend Development

```bash
cd healthcare-ui
npm install
npm run dev           # Dev server at localhost:3000
npm run lint
npm run type-check
npm test
```

**Structure:** Feature-based modules → components, hooks, API, utils
**Patterns:** React hooks, custom hooks, API service layer, TypeScript strict mode

### Backend Development

```bash
cd healthcare-BE-services
mvn clean install
mvn spring-boot:run   # Server at localhost:8080
mvn test
mvn spotless:apply    # Auto-format
```

**Structure:** Layered architecture → controller → service → repository → entity
**Patterns:** Spring Boot best practices, JPA/Hibernate, exception handling, DTOs

## Module Map

| Feature | FE Module | BE Service | Endpoint |
|---------|-----------|------------|----------|
| Hospital Search | `hospital/HospitalSearch` | `HospitalService` | `GET /api/v1/hospitals` |
| Hospital Details | `hospital/HospitalDetails` | `HospitalService` | `GET /api/v1/hospitals/{id}` |
| Emergency Request | `emergency/EmergencyButton` | `EmergencyService` | `POST /api/v1/emergency` |
| Nearby Hospitals | `emergency/NearbyHospitals` | `HospitalService` | `GET /api/v1/hospitals/nearby` |
| First-Aid Library | `firstAid/FirstAidList` | `FirstAidService` | `GET /api/v1/first-aid` |

## API Contract

**Base URL:** `http://localhost:8080/api/v1`

All responses follow:
```json
{
  "status": "success|error",
  "data": {},
  "timestamp": "2026-04-21T12:00:00Z"
}
```

## Database

PostgreSQL running via Docker Compose. Migrations via Flyway in `healthcare-BE-services/src/main/resources/db/migration/`.

## Rules & Patterns

**Frontend:**
- Feature-based file organization (features/{name}/)
- TypeScript strict mode required
- Custom hooks for reusable logic
- API service layer isolates HTTP calls
- CSS modules or Tailwind for styling
- One component per file

**Backend:**
- Layered architecture: Controller → Service → Repository
- DTOs for API boundaries (never expose entities)
- Exception handling via GlobalExceptionHandler
- Repository pattern for data access
- Validation annotations (@NotNull, @Valid)
- Mappers for DTO ↔ Entity conversion

**API:**
- Versioned endpoints (/api/v1/)
- RESTful conventions
- Query params for filtering (GET /hospitals?search=...)
- Request body for mutations (POST, PUT)
- Consistent error responses with HTTP status codes

**Database:**
- JPA entities with @Entity
- Migrations in SQL files (V1_, V2_, etc.)
- Indexes on frequently queried columns
- Foreign keys for referential integrity
- Audit fields (created_at, updated_at)

## Commands

Use `/fe-review` before committing frontend code.
Use `/be-review` before committing backend code.
Use `/arch-check` to validate FE-BE alignment.

## Files to Know

- `.claude/settings.json` – permissions, hooks, environment
- `.claude/rules/` – FE/BE/API/DB guidelines
- `.claude/agents/` – specialized Claude roles
- `healthcare-ui/package.json` – npm dependencies
- `healthcare-BE-services/pom.xml` – Maven dependencies
- `docs/API_SPEC.md` – full API documentation
- `docker-compose.yml` – local dev environment

## Common Tasks

**Add new FE feature:**
```
1. Create feature folder: healthcare-ui/src/features/{name}
2. Add components, hooks, api, utils subdirs
3. Connect to FE pages
4. Update .claude/FEATURE_MAP.md
```

**Add new BE endpoint:**
```
1. Create entity in healthcare-BE-services/src/main/java/com/healthcare/entity/
2. Create repository extending JpaRepository
3. Create service with business logic
4. Create controller with @RestController
5. Test via integration tests
```

**Run full stack locally:**
```bash
docker-compose up -d          # PostgreSQL
cd healthcare-ui && npm run dev
cd healthcare-BE-services && mvn spring-boot:run
```

## Debugging Tips

**Frontend:**
- Check Network tab for API calls
- React DevTools for component state
- Console for errors
- `/fe-review` for lint/type issues

**Backend:**
- Check logs: `mvn spring-boot:run` output
- Use breakpoints in IDE
- Check database: `psql healthcare_dev`
- `/be-review` for test failures

## Deployment

Frontend: Vercel (auto-deploy on main)
Backend: Docker container on AWS/GCP (CI/CD via GitHub Actions)

## Next Steps

1. Install dependencies (npm, Maven)
2. Start PostgreSQL (docker-compose)
3. Seed hospital data (SQL scripts)
4. Run dev servers
5. Check API at http://localhost:8080/api/v1/hospitals
6. Check frontend at http://localhost:3000
