package com.healthcare.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "beds")
public class Bed {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "hospital_id", nullable = false)
  private Hospital hospital;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "department_id")
  private Department department;

  @Column(nullable = false)
  private Integer totalBeds;

  @Column(nullable = false)
  private Integer occupiedBeds = 0;

  @CreationTimestamp
  @Column(name = "created_at", nullable = false, updatable = false)
  private LocalDateTime createdAt;

  @UpdateTimestamp
  @Column(name = "updated_at", nullable = false)
  private LocalDateTime updatedAt;

  public Bed() {}

  public Bed(
      Long id,
      Hospital hospital,
      Department department,
      Integer totalBeds,
      Integer occupiedBeds,
      LocalDateTime createdAt,
      LocalDateTime updatedAt) {
    this.id = id;
    this.hospital = hospital;
    this.department = department;
    this.totalBeds = totalBeds;
    this.occupiedBeds = occupiedBeds;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public Long getId() {
    return id;
  }

  public Hospital getHospital() {
    return hospital;
  }

  public Department getDepartment() {
    return department;
  }

  public Integer getTotalBeds() {
    return totalBeds;
  }

  public Integer getOccupiedBeds() {
    return occupiedBeds;
  }

  public Integer getAvailableBeds() {
    return totalBeds - occupiedBeds;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public LocalDateTime getUpdatedAt() {
    return updatedAt;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public void setHospital(Hospital hospital) {
    this.hospital = hospital;
  }

  public void setDepartment(Department department) {
    this.department = department;
  }

  public void setTotalBeds(Integer totalBeds) {
    this.totalBeds = totalBeds;
  }

  public void setOccupiedBeds(Integer occupiedBeds) {
    this.occupiedBeds = occupiedBeds;
  }

  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }

  public void setUpdatedAt(LocalDateTime updatedAt) {
    this.updatedAt = updatedAt;
  }
}
