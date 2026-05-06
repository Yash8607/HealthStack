# INSTRUCTION.md

## Project Name
Healthcare Platform

## Main Rule
Before creating or editing any file, first understand the existing folder structure.

Do not create duplicate folders or random files.

## Root Folder Structure

The project root is:

YASH_PROJECT/

Required structure:

YASH_PROJECT/
├── INSTRUCTION.md
├── BE_ARCHITECTURE.md
├── FE_ARCHITECTURE.md
├── healthcare-ui/
└── healthcare-BE-services/
    ├── emergency-module/
    └── hospital-module/

## Folder Rules

### Frontend Rules
All frontend code must be created only inside:

healthcare-ui/

Do not create frontend files inside backend folders.

### Backend Rules
All backend code must be created only inside:

healthcare-BE-services/

Backend modules should be separate:

healthcare-BE-services/
├── emergency-module/
└── hospital-module/

Do not mix emergency-module and hospital-module code.

## Backend Tech Rules

Use:
- Java 17
- Spring Boot
- Spring Web
- Spring Data JPA
- Maven
- H2 for local development first
- MySQL/PostgreSQL can be added later

Follow layered architecture:

controller → service → repository → entity → dto → exception → config

Rules:
- Controller should only handle request and response.
- Business logic must be inside service layer.
- Database logic must be inside repository layer.
- Entity should represent database table.
- DTO should be used for API request and response.
- Use proper exception handling.
- Do not write everything in one class.
- Use meaningful class and method names.

## Backend Naming Rules

Use this naming pattern:

Controller:
EmergencyController
HospitalController

Service:
EmergencyService
HospitalService

Service Implementation:
EmergencyServiceImpl
HospitalServiceImpl

Repository:
EmergencyRepository
HospitalRepository

DTO:
EmergencyRequest
EmergencyResponse
HospitalRequest
HospitalResponse

Exception:
ResourceNotFoundException
GlobalExceptionHandler

## Frontend Tech Rules

Use:
- React or Next.js
- TypeScript
- Component-based structure
- API calls inside services folder
- Reusable UI components

Recommended frontend structure:

healthcare-ui/
├── src/
│   ├── components/
│   ├── pages/ or app/
│   ├── services/
│   ├── hooks/
│   ├── utils/
│   ├── types/
│   ├── styles/
│   └── assets/

Rules:
- Keep components reusable.
- Do not write API calls directly inside UI components.
- Keep API logic inside services folder.
- Keep TypeScript types inside types folder.
- Keep helper functions inside utils folder.
- UI should be responsive for mobile and desktop.

## Feature Rules

Project has two main modes:

1. Emergency Mode
- Emergency type selection
- Ambulance call button
- Nearby hospitals
- First-aid suggestions

2. Normal Mode
- Hospital search
- Filter by distance, rating, type
- Hospital detail page
- Doctor/facility information

## API Rules

Use REST APIs.

API base structure:

/api/v1/emergencies
/api/v1/hospitals

Use proper HTTP methods:

GET    → fetch data
POST   → create data
PUT    → update full data
PATCH  → update partial data
DELETE → delete data

## Database Rules

Start simple.

Emergency module tables:
- emergency_request
- emergency_type
- first_aid_guide

Hospital module tables:
- hospital
- doctor
- facility

Use proper relationships only when needed.

## Git/Code Safety Rules

Before editing:
- Check existing files.
- Do not overwrite working code without asking.
- Do not delete files unless clearly instructed.
- Do not rename folders without asking.
- Do not create duplicate modules.

## Claude Working Rules

Claude must follow this flow:

1. Analyze existing project structure.
2. Explain what files will be created or updated.
3. Ask before making major structural changes.
4. Create small changes step by step.
5. After changes, summarize what was done.
6. Mention next recommended step.

## Documentation Rules

Update documentation when major changes are made:

- README.md
- BE_ARCHITECTURE.md
- FE_ARCHITECTURE.md
- API documentation if APIs are added

## Testing Rules

Backend:
- Add unit tests for service layer where possible.
- Add controller tests later.
- Keep test names meaningful.

Frontend:
- Keep components simple and testable.
- Add tests later after UI is stable.

## Do Not Rules

Do not:
- Create frontend files inside backend.
- Create backend files inside frontend.
- Put business logic in controller.
- Hardcode API URLs inside components.
- Create duplicate folder structures.
- Delete existing files without permission.
- Use random package names.
- Mix emergency and hospital module logic.
- Generate too many files in one step without explaining.
