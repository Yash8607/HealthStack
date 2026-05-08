package com.healthcare.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "departments")
public class Department {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "hospital_id", nullable = false)
  private Hospital hospital;

  @Column(nullable = false)
  private String name;

  @Column(length = 1024)
  private String description;

  @OneToMany(mappedBy = "department", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Doctor> doctors = new ArrayList<>();

  @CreationTimestamp
  @Column(name = "created_at", nullable = false, updatable = false)
  private LocalDateTime createdAt;

  @UpdateTimestamp
  @Column(name = "updated_at", nullable = false)
  private LocalDateTime updatedAt;

  public Department() {}

  public Department(Long id, Hospital hospital, String name, String description,
                    List<Doctor> doctors, LocalDateTime createdAt, LocalDateTime updatedAt) {
    this.id = id;
    this.hospital = hospital;
    this.name = name;
    this.description = description;
    this.doctors = doctors;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public Long getId() { return id; }
  public Hospital getHospital() { return hospital; }
  public String getName() { return name; }
  public String getDescription() { return description; }
  public List<Doctor> getDoctors() { return doctors; }
  public LocalDateTime getCreatedAt() { return createdAt; }
  public LocalDateTime getUpdatedAt() { return updatedAt; }

  public void setId(Long id) { this.id = id; }
  public void setHospital(Hospital hospital) { this.hospital = hospital; }
  public void setName(String name) { this.name = name; }
  public void setDescription(String description) { this.description = description; }
  public void setDoctors(List<Doctor> doctors) { this.doctors = doctors; }
  public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
  public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
