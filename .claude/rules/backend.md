# Backend Rules

Production-grade Spring Boot patterns for healthcare-BE-services.

## Architecture Layers

**Strict layering** (top-down flow):
```
Controller (@RestController)
  ↓ requests, calls service methods
Service (@Service, business logic)
  ↓ uses repositories, applies rules
Repository (extends JpaRepository)
  ↓ queries database
Entity (@Entity, JPA-managed)
  ↓ database table
```

**No skipping layers:** Never query database from controller. Never put business logic in entity.

## Entity Design

**Rules:**
- One entity = one table
- Use `@Entity` annotation
- PK: `@Id @GeneratedValue(strategy = GenerationType.IDENTITY)`
- Relationships: `@OneToMany`, `@ManyToOne`, `@JoinColumn`
- Audit fields: `@CreationTimestamp`, `@UpdateTimestamp`
- No business logic (getters/setters only)
- Use `@Data` from Lombok for boilerplate

**Example:**
```java
@Entity
@Table(name = "hospitals")
@Data
public class Hospital {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  
  @Column(nullable = false)
  private String name;
  
  @Column(length = 512)
  private String address;
  
  private Double latitude;
  private Double longitude;
  
  @OneToMany(mappedBy = "hospital", cascade = CascadeType.ALL)
  private List<Department> departments = new ArrayList<>();
  
  @CreationTimestamp
  private LocalDateTime createdAt;
  
  @UpdateTimestamp
  private LocalDateTime updatedAt;
}
```

## Repository Pattern

**Extend JpaRepository for CRUD:**
```java
public interface HospitalRepository extends JpaRepository<Hospital, Long> {
  List<Hospital> findByNameContainingIgnoreCase(String name);
  
  @Query("SELECT h FROM Hospital h WHERE " +
         "SQRT(POWER(h.latitude - :lat, 2) + POWER(h.longitude - :lng, 2)) < :radius")
  List<Hospital> findNearby(
    @Param("lat") Double latitude,
    @Param("lng") Double longitude,
    @Param("radius") Double radiusKm
  );
}
```

**No raw SQL** unless absolutely necessary. Use `@Query` with JPQL.

## Service Layer

**@Service classes contain business logic:**
```java
@Service
public class HospitalService {
  @Autowired private HospitalRepository repository;
  @Autowired private DepartmentRepository deptRepo;
  @Autowired private HospitalMapper mapper;
  
  public List<HospitalDTO> search(String query) {
    return repository.findByNameContainingIgnoreCase(query)
      .stream()
      .map(mapper::toDTO)
      .collect(Collectors.toList());
  }
  
  @Transactional
  public HospitalDTO update(Long id, UpdateHospitalRequest req) {
    Hospital hospital = repository.findById(id)
      .orElseThrow(() -> new ResourceNotFoundException("Hospital not found"));
    
    hospital.setName(req.getName());
    hospital.setAddress(req.getAddress());
    
    return mapper.toDTO(repository.save(hospital));
  }
}
```

**Transactional boundaries:** Use `@Transactional` for operations that modify data.

## Controller & API

**@RestController with @RequestMapping:**
```java
@RestController
@RequestMapping("/api/v1/hospitals")
public class HospitalController {
  @Autowired private HospitalService service;
  
  @GetMapping
  public ResponseEntity<List<HospitalDTO>> search(
    @RequestParam String query,
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "20") int size
  ) {
    return ResponseEntity.ok(service.search(query));
  }
  
  @GetMapping("/{id}")
  public ResponseEntity<HospitalDTO> getById(@PathVariable Long id) {
    return ResponseEntity.ok(service.getById(id));
  }
  
  @PostMapping
  public ResponseEntity<HospitalDTO> create(@Valid @RequestBody CreateHospitalRequest req) {
    return ResponseEntity.status(HttpStatus.CREATED)
      .body(service.create(req));
  }
}
```

**HTTP status codes:**
- `200 OK` – successful GET/PUT/PATCH
- `201 CREATED` – successful POST
- `204 NO_CONTENT` – successful DELETE
- `400 BAD_REQUEST` – validation error
- `401 UNAUTHORIZED` – auth required
- `404 NOT_FOUND` – resource not found
- `500 INTERNAL_SERVER_ERROR` – server error

## DTO Pattern

**Request DTOs (input):**
```java
@Data
@Valid
public class CreateHospitalRequest {
  @NotBlank(message = "Name is required")
  private String name;
  
  @NotBlank
  private String address;
  
  @Min(-90) @Max(90)
  private Double latitude;
  
  @Min(-180) @Max(180)
  private Double longitude;
}
```

**Response DTOs (output):**
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

**Rules:**
- Never expose entities in API responses (always use DTOs)
- DTOs map to API contracts (not database structure)
- Use mappers for conversion

## Mapper Pattern

```java
@Mapper(componentModel = "spring")
public interface HospitalMapper {
  HospitalDTO toDTO(Hospital entity);
  List<HospitalDTO> toDTOList(List<Hospital> entities);
  
  Hospital toEntity(CreateHospitalRequest request);
}
```

Use MapStruct for compile-time mapping.

## Exception Handling

**Global exception handler:**
```java
@RestControllerAdvice
public class GlobalExceptionHandler {
  @ExceptionHandler(ResourceNotFoundException.class)
  public ResponseEntity<ApiErrorDTO> handleNotFound(ResourceNotFoundException e) {
    return ResponseEntity.status(HttpStatus.NOT_FOUND)
      .body(new ApiErrorDTO(e.getMessage(), "RESOURCE_NOT_FOUND"));
  }
  
  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ApiErrorDTO> handleValidation(MethodArgumentNotValidException e) {
    String message = e.getBindingResult().getFieldError().getDefaultMessage();
    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
      .body(new ApiErrorDTO(message, "VALIDATION_ERROR"));
  }
}
```

**Custom exceptions:**
```java
public class ResourceNotFoundException extends RuntimeException {
  public ResourceNotFoundException(String message) {
    super(message);
  }
}
```

## Validation

**Use JSR-303 annotations:**
```java
public class CreateHospitalRequest {
  @NotBlank(message = "Name is required")
  private String name;
  
  @Size(min = 10, message = "Address too short")
  private String address;
  
  @Email
  private String email;
}
```

**In controller, use `@Valid`:**
```java
@PostMapping
public ResponseEntity<HospitalDTO> create(
  @Valid @RequestBody CreateHospitalRequest req
) { ... }
```

## Database Migrations

**Flyway migrations** in `src/main/resources/db/migration/`:
```sql
-- V1__Initial_Schema.sql
CREATE TABLE hospitals (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(512),
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_hospital_name ON hospitals(name);
```

**Naming:** `V{version}__{description}.sql` (V1__, V2__, etc.)

## Testing

**Unit tests** (MockMvc for controllers):
```java
@WebMvcTest(HospitalController.class)
class HospitalControllerTest {
  @Autowired private MockMvc mvc;
  @MockBean private HospitalService service;
  
  @Test
  void testSearch() throws Exception {
    mvc.perform(get("/api/v1/hospitals?query=test"))
      .andExpect(status().isOk());
  }
}
```

**Service tests** (with @DataJpaTest for repositories):
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

## Naming Conventions

- **Classes:** PascalCase (`HospitalService`, `HospitalDTO`)
- **Methods:** camelCase, verb-first (`getById`, `findByName`)
- **Constants:** UPPER_SNAKE_CASE (`DEFAULT_PAGE_SIZE`)
- **Packages:** lowercase, reverse-domain (`com.healthcare.service`)

## Code Review Checklist

- [ ] Layering respected (no business logic in controller)
- [ ] DTOs used for API boundaries
- [ ] Validation with `@Valid` and annotations
- [ ] Global exception handling
- [ ] Transactions properly scoped
- [ ] Repository queries optimized
- [ ] Mapper for entity ↔ DTO conversion
- [ ] Migrations in place
- [ ] Tests cover happy path + errors
- [ ] No N+1 queries
- [ ] Indexes on frequently queried columns
