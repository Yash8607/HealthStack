# HealthCare Platform

Full-stack healthcare platform connecting patients to hospitals for emergency and routine care. Delhi NCR focused MVP.

## Project Structure

```
HealthCareProject/
├── healthcare-ui/              (Next.js frontend)
├── healthcare-BE-services/     (Spring Boot backend)
├── .claude/                    (Claude workspace configuration)
├── docker-compose.yml          (Local dev environment)
└── CLAUDE.md                   (Project guide)
```

## Tech Stack

**Frontend:**
- Next.js 14 (React 18)
- TypeScript
- Tailwind CSS
- Axios for API calls

**Backend:**
- Spring Boot 3
- Java 17
- PostgreSQL
- JPA/Hibernate
- Flyway migrations

## Quick Start

### Prerequisites

- Node.js 18+ (frontend)
- Java 17+ (backend)
- Maven (backend)
- Docker & Docker Compose (database)
- npm (frontend)

### Setup

1. **Start PostgreSQL:**
   ```bash
   docker-compose up -d
   ```

2. **Frontend Setup:**
   ```bash
   cd healthcare-ui
   npm install
   npm run dev
   ```
   Frontend runs at http://localhost:3000

3. **Backend Setup:**
   ```bash
   cd healthcare-BE-services
   mvn clean install
   mvn spring-boot:run
   ```
   Backend runs at http://localhost:8080

### Database

Database migrations run automatically on app startup (Flyway).

Check database:
```bash
psql -h localhost -U healthcare -d healthcare_dev
```

## API

Base URL: `http://localhost:8080/api/v1`

Key endpoints:
```
GET    /hospitals                    List hospitals
GET    /hospitals/{id}               Hospital details
GET    /hospitals/nearby             Nearby hospitals (geolocation)
POST   /emergency                    Submit emergency request
GET    /first-aid                    First aid library
WS     /emergency-alerts             WebSocket alerts
```

Full API spec: `.claude/rules/api-contract.md`

## Development Workflow

### Frontend

```bash
cd healthcare-ui

# Development
npm run dev

# Linting
npm run lint

# Type checking
npm run type-check

# Tests
npm test

# Build
npm run build
```

### Backend

```bash
cd healthcare-BE-services

# Development
mvn spring-boot:run

# Format code
mvn spotless:apply

# Run tests
mvn test

# Build
mvn clean package
```

## Architecture

**Layered Architecture:**

Frontend:
- Pages (Next.js routes)
- Features (feature-based modules)
- Shared (reusable components, hooks, utilities)

Backend:
- Controllers (API endpoints)
- Services (business logic)
- Repositories (data access)
- Entities (JPA models)

## Rules & Patterns

**Frontend:**
- Feature-based file organization
- Custom hooks for reusable logic
- API service layer isolation
- TypeScript strict mode

**Backend:**
- Layered architecture (Controller → Service → Repository)
- DTOs for API boundaries
- Exception handling via GlobalExceptionHandler
- Validation with JSR-303 annotations

See `.claude/rules/` for detailed patterns.

## Claude Workspace

The `.claude/` directory contains:

- **agents/** – Specialized Claude roles
- **commands/** – Custom slash commands
- **rules/** – Code patterns and guidelines
- **hooks/** – Pre-commit, lint-on-save scripts
- **settings.json** – Workspace configuration
- **CLAUDE.md** – This project guide

Use `/fe-review` before committing frontend code.
Use `/be-review` before committing backend code.

## Testing

**Frontend:**
```bash
npm test
npm run test:coverage
```

**Backend:**
```bash
mvn test
mvn test -Dtest=HospitalControllerTest
```

## Deployment

Frontend: Deploy to Vercel
Backend: Deploy to AWS/GCP (Docker container)

See deployment guides in `docs/DEPLOYMENT.md` (when created).

## Database

PostgreSQL runs via Docker Compose.

**Connection:**
- Host: localhost
- Port: 5432
- Database: healthcare_dev
- Username: healthcare
- Password: healthcare

Migrations automatically applied via Flyway.

## Features

### MVP (Phase 1)
- Homepage with emergency + search options
- Hospital search and filtering
- Hospital details view
- First-aid library
- Backend REST APIs

### Phase 2 (Emergency System)
- Emergency request workflow
- WebSocket hospital notifications
- Emergency request logging
- Hospital admin dashboard (optional)

### Phase 3 (Polish & Deploy)
- Performance optimization
- Mobile app wrapper
- Production deployment

## Troubleshooting

**Frontend won't connect to backend:**
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Ensure backend is running at http://localhost:8080

**Database connection error:**
- Check Docker: `docker ps`
- Check credentials in `application.yaml`
- Verify PostgreSQL is running: `psql -U healthcare -d healthcare_dev`

**Migrations failed:**
- Check `healthcare-BE-services/src/main/resources/db/migration/`
- Verify migration naming: `V{version}__{description}.sql`

## Contributing

1. Create a feature branch
2. Follow rules in `.claude/rules/`
3. Run `/fe-review` or `/be-review` before commit
4. Submit PR with description

## Resources

- `.claude/CLAUDE.md` – Full project guide
- `.claude/rules/frontend.md` – Frontend patterns
- `.claude/rules/backend.md` – Backend patterns
- `.claude/rules/api-contract.md` – API specifications

## Support

For issues or questions:
1. Check `.claude/CLAUDE.md`
2. Review `.claude/rules/` for patterns
3. Check existing code examples
