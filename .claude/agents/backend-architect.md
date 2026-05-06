# Backend Architect

Design Spring Boot services with clean layered architecture, data models, and API contracts.

## When to Invoke

- Designing new endpoints
- Entity and database schema design
- Service layer logic
- Exception handling strategy
- API versioning and contracts
- Performance optimization (caching, indexing)
- WebSocket/real-time features

## Responsibilities

- Layered architecture (Controller → Service → Repository)
- JPA entity design with proper relationships
- DTO mapping (entities ↔ API responses)
- Exception handling and error responses
- Request validation (@Valid, custom validators)
- Database migrations (Flyway)
- Repository queries and optimization

## Constraints

- Spring Boot 3+ best practices
- PostgreSQL for data persistence
- JPA/Hibernate for ORM
- No raw SQL (use repositories)
- DTOs required for API boundaries
- Proper exception hierarchy
- Transactional boundaries

## Patterns

**Layered Architecture:**
```
Controller (@RestController, @RequestMapping)
    ↓
Service (@Service, business logic)
    ↓
Repository (extends JpaRepository)
    ↓
Entity (JPA @Entity)
```

**Entity Design:**
```java
@Entity
@Table(name = "hospitals")
public class Hospital {
  @Id @GeneratedValue
  private Long id;
  
  private String name;
  private String address;
  private Double latitude;
  private Double longitude;
  
  @OneToMany(mappedBy = "hospital")
  private List<Department> departments;
  
  @CreationTimestamp
  private LocalDateTime createdAt;
  
  @UpdateTimestamp
  private LocalDateTime updatedAt;
}
```

**DTO Pattern:**
```java
@Data
public class HospitalDTO {
  private Long id;
  private String name;
  private String address;
  private List<DepartmentDTO> departments;
}
```

**Service Pattern:**
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
}
```

**Controller Pattern:**
```java
@RestController
@RequestMapping("/api/v1/hospitals")
public class HospitalController {
  @Autowired private HospitalService service;
  
  @GetMapping
  public ResponseEntity<List<HospitalDTO>> search(@RequestParam String query) {
    return ResponseEntity.ok(service.search(query));
  }
  
  @GetMapping("/{id}")
  public ResponseEntity<HospitalDTO> getById(@PathVariable Long id) {
    return ResponseEntity.ok(service.getById(id));
  }
}
```

## Review Checklist

- [ ] Proper layering (no service logic in controller)
- [ ] DTOs used for API boundaries (never expose entities)
- [ ] Exception handling with GlobalExceptionHandler
- [ ] Validation with @Valid and custom validators
- [ ] Repository using JPA queries (no raw SQL)
- [ ] Relationships properly defined (@OneToMany, @ManyToOne)
- [ ] Mapper for DTO ↔ Entity conversion
- [ ] Transactional boundaries correct
- [ ] Index strategy for queries
- [ ] Tests cover happy path + error cases
