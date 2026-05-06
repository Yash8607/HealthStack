# Backend Architecture - Healthcare Services

Spring Boot 3 layered architecture for emergency and hospital management system.

## Overview

**Scope:** Delhi NCR single-city MVP
**Language:** Java 17
**Framework:** Spring Boot 3
**Database:** PostgreSQL
**Scalability:** Monolithic with modular separation (ready for microservices split)

## Module Structure

```
healthcare-BE-services/
├── src/main/java/com/healthcare/
│   ├── config/                    (Spring configuration)
│   ├── api/v1/                    (API layer)
│   │   ├── controller/            (HTTP endpoints)
│   │   └── dto/                   (Data Transfer Objects)
│   ├── service/                   (Business logic layer)
│   ├── repository/                (Data access layer)
│   ├── entity/                    (JPA entities)
│   ├── mapper/                    (DTO ↔ Entity conversion)
│   ├── exception/                 (Custom exceptions)
│   ├── validation/                (Request validators)
│   ├── util/                      (Utilities)
│   └── websocket/                 (Real-time alerts)
└── src/main/resources/
    ├── application.yaml           (Configuration)
    └── db/migration/              (Flyway migrations)
```

## Core Modules

### 1. Hospital Module

**Responsibility:** Hospital data management, search, filtering

**Components:**

```
Hospital Entity
  ├── id, name, address, latitude, longitude
  ├── phone, email, rating
  └── Relationships: departments, doctors, beds, services

HospitalController
  ├── GET /hospitals              (list/search)
  ├── GET /hospitals/{id}         (details)
  ├── GET /hospitals/nearby       (geolocation)
  └── GET /hospitals/search       (full-text search)

HospitalService
  ├── search(query)               (filter & paginate)
  ├── getById(id)                 (fetch details)
  ├── findNearby(lat, lng, radius)(geolocation query)
  └── getByDepartment(dept)       (filter by dept)

HospitalRepository
  ├── findByNameContainingIgnoreCase(name)
  ├── findNearby(lat, lng, radius)
  └── findByDepartment(department)

Supporting Entities:
  ├── Department (has doctors, beds)
  ├── Doctor (specialization, qualification)
  ├── Service (available services)
  └── Bed (bed inventory per department)
```

**API Endpoints:**

```
GET    /api/v1/hospitals                   Search/list (paginated)
GET    /api/v1/hospitals?search=...        Filter by name
GET    /api/v1/hospitals/{id}              Get details
GET    /api/v1/hospitals/nearby            Nearby (geolocation)
  Query: latitude, longitude, radius(km)
```

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "name": "Apollo Hospital",
      "address": "Delhi",
      "latitude": 28.7041,
      "longitude": 77.1025,
      "phone": "+91-11-123456",
      "departments": [
        { "id": 101, "name": "Cardiology" }
      ],
      "beds": { "total": 500, "occupied": 350 },
      "rating": 4.5
    }
  ],
  "pagination": { "page": 0, "size": 20, "total": 150 }
}
```

### 2. Emergency Module

**Responsibility:** Emergency request handling, hospital notifications, logging

**Components:**

```
EmergencyRequest Entity
  ├── id, requestId (ER-xxxxx)
  ├── hospitalId, user location
  ├── emergencyType (CARDIAC, TRAUMA, BREATHING, etc)
  ├── status (INITIATED, ACKNOWLEDGED, DISPATCHED)
  └── timestamps (createdAt, updatedAt)

EmergencyController
  ├── POST /emergency              (submit request)
  └── GET /emergency/{id}/status   (check status)

EmergencyService
  ├── submitRequest(location, type, hospitalId)
  ├── notifyHospital(requestId)    (WebSocket alert)
  ├── logRequest(data)             (audit trail)
  └── getStatus(requestId)         (check status)

NotificationService
  ├── sendWebSocketAlert(hospitalId, data)
  ├── sendPushNotification(hospital)
  └── broadcastToNearbyHospitals(location)

EmergencyRepository
  ├── findByRequestId(requestId)
  ├── findByHospitalId(hospitalId)
  └── findByCreatedAtBetween(from, to)
```

**API Endpoints:**

```
POST   /api/v1/emergency                   Submit emergency request
  Body: { latitude, longitude, emergencyType, hospitalId }

GET    /api/v1/emergency/{requestId}       Check request status

WS     /api/v1/emergency-alerts            WebSocket for hospitals
  Subscribe: { action: "subscribe", hospitalId: 1 }
  Receive: { type: "EMERGENCY_ALERT", requestId, location, type }
```

**Request Flow:**

```
User submits emergency request
  ↓
EmergencyController.submitRequest()
  ↓
EmergencyService.submitRequest()
  ├─ Validate request (location, hospital exists)
  ├─ Save EmergencyRequest to DB
  ├─ Trigger WebSocket notification
  └─ Return response with requestId
  ↓
Response: { requestId: "ER-12345", hospital, status, message }
```

### 3. First Aid Module

**Responsibility:** Medical guidance content (static data)

**Components:**

```
FirstAidContent Entity
  ├── id, title, category
  ├── description, steps (JSON)
  ├── precautions, warnings
  └── timestamps

FirstAidController
  ├── GET /first-aid              (list articles)
  ├── GET /first-aid/{id}         (article detail)
  └── GET /first-aid?category=... (filter by category)

FirstAidService
  ├── getAll()                    (cached)
  ├── getById(id)
  ├── getByCategory(category)
  └── search(query)               (full-text)

FirstAidRepository
  ├── findByCategory(category)
  ├── findByTitleContainingIgnoreCase(query)
```

**Seed Data Categories:**
- Cardiac Arrest
- Severe Bleeding
- Choking
- Burns
- Fractures
- Poisoning
- Shock
- Breathing Difficulty
- Chest Pain
- Severe Allergic Reaction

## Layered Architecture

### Request Flow (Top-Down)

```
HTTP Request
    ↓
@RestController (HospitalController)
  └─ Parse request
  └─ Call service layer
    ↓
@Service (HospitalService)
  └─ Business logic
  └─ Validation
  └─ Call repository
    ↓
Repository (JpaRepository<Hospital, Long>)
  └─ Query database
  └─ Return entities
    ↓
Mapper (HospitalMapper)
  └─ Convert Entity → DTO
    ↓
Service returns DTO
    ↓
Controller returns ResponseEntity
    ↓
HTTP Response (200, 404, 500, etc)
```

### Layer Responsibilities

**1. Controller (@RestController)**
- Parse HTTP requests
- Call service methods
- Return ResponseEntity with HTTP status
- No business logic

```java
@RestController
@RequestMapping("/api/v1/hospitals")
public class HospitalController {
  @Autowired private HospitalService service;
  
  @GetMapping("/{id}")
  public ResponseEntity<HospitalDTO> getById(@PathVariable Long id) {
    return ResponseEntity.ok(service.getById(id));
  }
}
```

**2. DTO (Data Transfer Object)**
- API contract layer
- Never expose entities
- Request/response mapping

```java
@Data
public class HospitalDTO {
  private Long id;
  private String name;
  private String address;
  private List<DepartmentDTO> departments;
  private LocalDateTime createdAt;
}
```

**3. Service (@Service)**
- Business logic
- Validation
- Orchestration between repositories
- Transaction management

```java
@Service
public class HospitalService {
  @Autowired private HospitalRepository repo;
  @Autowired private HospitalMapper mapper;
  
  public HospitalDTO getById(Long id) {
    Hospital hospital = repo.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException(...));
    return mapper.toDTO(hospital);
  }
  
  @Transactional
  public List<HospitalDTO> search(String query) {
    return repo.findByNameContainingIgnoreCase(query)
      .stream()
      .map(mapper::toDTO)
      .collect(Collectors.toList());
  }
}
```

**4. Repository (JpaRepository)**
- Data access
- Query database
- No business logic

```java
public interface HospitalRepository extends JpaRepository<Hospital, Long> {
  List<Hospital> findByNameContainingIgnoreCase(String name);
  
  @Query("SELECT h FROM Hospital h WHERE " +
         "SQRT(POWER(h.latitude - :lat, 2) + POWER(h.longitude - :lng, 2)) < :radius")
  List<Hospital> findNearby(@Param("lat") Double lat, @Param("lng") Double lng, @Param("radius") Double radius);
}
```

**5. Entity (@Entity)**
- JPA-managed database tables
- Relationships (OneToMany, ManyToOne)
- No business logic

```java
@Entity
@Table(name = "hospitals")
public class Hospital {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  
  private String name;
  
  @OneToMany(mappedBy = "hospital")
  private List<Department> departments;
  
  @CreationTimestamp
  private LocalDateTime createdAt;
}
```

**6. Mapper (MapStruct)**
- Convert Entity ↔ DTO
- Compile-time safety

```java
@Mapper(componentModel = "spring")
public interface HospitalMapper {
  HospitalDTO toDTO(Hospital entity);
  Hospital toEntity(CreateHospitalRequest request);
}
```

**7. Exception Handler (@RestControllerAdvice)**
- Global exception handling
- Consistent error responses

```java
@RestControllerAdvice
public class GlobalExceptionHandler {
  @ExceptionHandler(ResourceNotFoundException.class)
  public ResponseEntity<ApiErrorDTO> handleNotFound(ResourceNotFoundException e) {
    return ResponseEntity.status(HttpStatus.NOT_FOUND)
      .body(new ApiErrorDTO(e.getMessage(), "RESOURCE_NOT_FOUND"));
  }
}
```

## Database Design

### Schema Overview

```
hospitals
├── id (PK)
├── name, address
├── latitude, longitude
├── phone, email, rating
└── created_at, updated_at

departments
├── id (PK)
├── hospital_id (FK)
├── name
└── timestamps

doctors
├── id (PK)
├── hospital_id (FK)
├── name, specialization
└── timestamps

services
├── id (PK)
├── hospital_id (FK)
├── name, available
└── timestamps

beds
├── id (PK)
├── hospital_id (FK)
├── department_id (FK)
├── total_beds, occupied_beds
└── timestamps

emergency_requests
├── id (PK)
├── hospital_id (FK)
├── user_latitude, user_longitude
├── emergency_type, status
└── timestamps
```

### Indexes

```sql
CREATE INDEX idx_hospital_name ON hospitals(name);
CREATE INDEX idx_hospital_location ON hospitals(latitude, longitude);
CREATE INDEX idx_department_hospital ON departments(hospital_id);
CREATE INDEX idx_doctor_hospital ON doctors(hospital_id);
CREATE INDEX idx_service_hospital ON services(hospital_id);
CREATE INDEX idx_bed_hospital ON beds(hospital_id);
CREATE INDEX idx_emergency_hospital ON emergency_requests(hospital_id);
CREATE INDEX idx_emergency_created ON emergency_requests(created_at);
```

## WebSocket (Real-Time Alerts)

**Architecture:**

```
Hospital connects to WebSocket
  ↓
EmergencyWebSocketHandler.afterConnectionEstablished()
  └─ Store session in map: hospitalId → WebSocketSession
  ↓
Emergency request submitted
  ↓
EmergencyService.submitRequest()
  ├─ Save to database
  └─ Call NotificationService.sendWebSocketAlert()
  ↓
NotificationService broadcasts alert
  ├─ Find hospital's WebSocket session
  └─ Send JSON message: { type: "EMERGENCY_ALERT", data: {...} }
  ↓
Hospital receives alert in real-time
```

**WebSocket Message Format:**

```json
{
  "type": "EMERGENCY_ALERT",
  "requestId": "ER-12345",
  "emergencyType": "CARDIAC_ARREST",
  "userLocation": {
    "latitude": 28.7041,
    "longitude": 77.1025
  },
  "userPhone": "+91-98765432xx",
  "distance": 2.5,
  "timestamp": "2026-04-21T12:30:00Z"
}
```

## Configuration

### application.yaml

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/healthcare_dev
  jpa:
    hibernate:
      ddl-auto: validate  (migrations via Flyway)
  flyway:
    locations: classpath:db/migration

server:
  port: 8080
  servlet:
    context-path: /api/v1  (or bare root)
```

### CorsConfig

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/api/**")
      .allowedOrigins("http://localhost:3000")
      .allowedMethods("GET", "POST", "PUT", "DELETE")
      .allowCredentials(true);
  }
}
```

## API Response Format

**Success Response (200, 201):**

```json
{
  "status": "success",
  "data": { ...payload... },
  "timestamp": "2026-04-21T12:30:00Z",
  "path": "/api/v1/hospitals"
}
```

**Error Response (4xx, 5xx):**

```json
{
  "status": "error",
  "code": "RESOURCE_NOT_FOUND",
  "message": "Hospital not found",
  "timestamp": "2026-04-21T12:30:00Z",
  "path": "/api/v1/hospitals/999"
}
```

**Paginated Response:**

```json
{
  "status": "success",
  "data": [...],
  "pagination": {
    "page": 0,
    "size": 20,
    "total": 150,
    "totalPages": 8
  },
  "timestamp": "2026-04-21T12:30:00Z"
}
```

## Validation & Exception Handling

**Request Validation:**

```java
@PostMapping
public ResponseEntity<HospitalDTO> create(
  @Valid @RequestBody CreateHospitalRequest req  // Triggers validation
) {
  return ResponseEntity.status(HttpStatus.CREATED)
    .body(service.create(req));
}
```

**DTO Validation:**

```java
@Data
public class CreateHospitalRequest {
  @NotBlank(message = "Name is required")
  private String name;
  
  @Min(-90) @Max(90)
  private Double latitude;
  
  @Min(-180) @Max(180)
  private Double longitude;
}
```

**Custom Exceptions:**

```java
public class ResourceNotFoundException extends RuntimeException { }
public class ValidationException extends RuntimeException { }
public class UnauthorizedException extends RuntimeException { }
```

**Global Exception Handler:**

```java
@RestControllerAdvice
public class GlobalExceptionHandler {
  @ExceptionHandler(ResourceNotFoundException.class)
  public ResponseEntity<ApiErrorDTO> handleNotFound(...) { }
  
  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ApiErrorDTO> handleValidation(...) { }
  
  @ExceptionHandler(Exception.class)
  public ResponseEntity<ApiErrorDTO> handleGeneral(...) { }
}
```

## Caching Strategy

**Cache-aside pattern for hospital data:**

```java
@Service
@CacheConfig(cacheNames = "hospitals")
public class HospitalService {
  @Cacheable
  public HospitalDTO getById(Long id) { ... }
  
  @CacheEvict(allEntries = true)
  public void invalidateCache() { ... }
}
```

**Cache config (Spring):**

```java
@Configuration
@EnableCaching
public class CacheConfig { ... }
```

## Testing Strategy

**Unit Tests:** Service layer (MockMvc for controllers)
**Integration Tests:** Full flow with TestContainers PostgreSQL
**Repository Tests:** @DataJpaTest

```java
@SpringBootTest
class HospitalServiceTest {
  @Autowired private HospitalService service;
  @Autowired private HospitalRepository repo;
  
  @Test
  void testSearch() {
    Hospital h = new Hospital();
    h.setName("Test Hospital");
    repo.save(h);
    
    List<HospitalDTO> results = service.search("Test");
    assertEquals(1, results.size());
  }
}
```

## Future Scalability

### Phase 2: Microservices Split

```
Monolith (current)
  ├── Hospital Service (microservice)
  ├── Emergency Service (microservice)
  └── First Aid Service (microservice)

Communication: REST + async messaging (Kafka/RabbitMQ)
```

### Phase 3: Advanced Features

- **Caching:** Redis for hospital data
- **Messaging:** Kafka for async emergency notifications
- **Search:** Elasticsearch for full-text hospital search
- **Monitoring:** Prometheus + Grafana
- **Logging:** ELK stack (Elasticsearch, Logstash, Kibana)
- **API Gateway:** Kong or AWS API Gateway
- **Authentication:** OAuth2 / JWT (future admin panel)

### Performance Optimization

1. **Database:** Horizontal shading by city
2. **Caching:** Redis layer for hospitals, departments
3. **Async:** Kafka for non-blocking emergency notifications
4. **CDN:** CloudFront for static first-aid content
5. **Load Balancing:** Nginx/HAProxy for scaling

## Monitoring & Logging

**Logging:**

```yaml
logging:
  level:
    com.healthcare: DEBUG
    org.springframework.web: INFO
```

**Monitoring Endpoints:**

```
GET /actuator/health           Health check
GET /actuator/metrics          Metrics
```

## Deployment

**Docker:**

```dockerfile
FROM openjdk:17-slim
COPY healthcare-services.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
```

**Docker Compose (for dev):**

```yaml
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: healthcare_dev
      POSTGRES_USER: healthcare
      POSTGRES_PASSWORD: healthcare
```

**Production (AWS/GCP):**
- RDS PostgreSQL (managed)
- ECS/Kubernetes for container orchestration
- CloudFront CDN
- Route53 for DNS
- CloudWatch for monitoring

## Summary

- **Monolithic MVP** for fast development
- **Clean layering** (Controller → Service → Repository)
- **DTO/Entity separation** for API safety
- **Global exception handling** for consistency
- **Modular structure** ready for microservices split
- **Caching & indexing** for performance
- **WebSocket** for real-time alerts
- **Scalable** to multi-city via horizontal sharding
