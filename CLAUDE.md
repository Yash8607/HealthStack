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
**Backend:** Spring Boot 3, Java 17, H2 (dev), PostgreSQL (prod), WebSocket
**DevOps:** Docker, Docker Compose (prod only)

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

### Backend Development (H2 - no Docker)

```bash
cd healthcare-BE-services
mvn clean install
mvn spring-boot:run   # Server at localhost:8080 (uses H2 by default)
mvn test              # Uses H2 in-memory
mvn spotless:apply    # Auto-format
```

**Database:** H2 file stored in `./data/healthcare_dev` (persists across restarts)
**H2 Console:** Visit http://localhost:8080/h2-console to inspect database (sa / blank)
**Structure:** Layered architecture → controller → service → repository → entity
**Patterns:** Spring Boot best practices, JPA/Hibernate, exception handling, DTOs

### Backend Development (PostgreSQL - prod)

```bash
cd healthcare-BE-services
mvn clean install
mvn spring-boot:run -Dspring-boot.run.arguments="--spring.profiles.active=prod"   # Uses PostgreSQL
```

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

**Development:** H2 file-based (auto-creates `./data/healthcare_dev`). No Docker required.
**Production:** PostgreSQL via Docker Compose. 
**Migrations:** Flyway in `healthcare-BE-services/src/main/resources/db/migration/` (compatible with both H2 & PostgreSQL)
**H2 Console:** Available at `http://localhost:8080/h2-console` during dev (username: sa, password: blank)

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

**Run full stack locally (H2 - no Docker):**
```bash
cd healthcare-ui && npm run dev &
cd healthcare-BE-services && mvn spring-boot:run
# Frontend at http://localhost:3000
# Backend at http://localhost:8080
# H2 Console at http://localhost:8080/h2-console
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
- Check H2 database: Visit http://localhost:8080/h2-console (sa / blank)
- Or query file: `./data/healthcare_dev.mv.db`
- `/be-review` for test failures

## Deployment

Frontend: Vercel (auto-deploy on main)
Backend: Docker container on AWS/GCP (CI/CD via GitHub Actions)

## Next Steps

1. Install dependencies (npm, Maven)
2. No Docker needed for dev (H2 auto-creates database)
3. Run `mvn spring-boot:run` in healthcare-BE-services (creates ./data/healthcare_dev)
4. Run `npm run dev` in healthcare-ui
5. Optional: Seed hospital data via SQL scripts (upload via H2 Console if needed)
6. Check API at http://localhost:8080/api/v1/hospitals
7. Check frontend at http://localhost:3000
8. Inspect DB at http://localhost:8080/h2-console (sa / blank)
