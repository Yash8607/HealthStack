package com.healthcare.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "doctors")
public class Doctor {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "department_id", nullable = false)
  private Department department;

  @Column(nullable = false)
  private String name;

  @Column(length = 255)
  private String specialization;

  @Column(length = 255)
  private String qualification;

  @Column(length = 20)
  private String phone;

  @CreationTimestamp
  @Column(name = "created_at", nullable = false, updatable = false)
  private LocalDateTime createdAt;

  @UpdateTimestamp
  @Column(name = "updated_at", nullable = false)
  private LocalDateTime updatedAt;

  public Doctor() {}

  public Doctor(
      Long id,
      Department department,
      String name,
      String specialization,
      String qualification,
      String phone,
      LocalDateTime createdAt,
      LocalDateTime updatedAt) {
    this.id = id;
    this.department = department;
    this.name = name;
    this.specialization = specialization;
    this.qualification = qualification;
    this.phone = phone;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public Long getId() {
    return id;
  }

  public Department getDepartment() {
    return department;
  }

  public String getName() {
    return name;
  }

  public String getSpecialization() {
    return specialization;
  }

  public String getQualification() {
    return qualification;
  }

  public String getPhone() {
    return phone;
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

  public void setDepartment(Department department) {
    this.department = department;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setSpecialization(String specialization) {
    this.specialization = specialization;
  }

  public void setQualification(String qualification) {
    this.qualification = qualification;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }

  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }

  public void setUpdatedAt(LocalDateTime updatedAt) {
    this.updatedAt = updatedAt;
  }
}
