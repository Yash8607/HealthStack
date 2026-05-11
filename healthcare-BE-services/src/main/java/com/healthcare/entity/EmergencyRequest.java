package com.healthcare.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(
    name = "emergency_requests",
    indexes = {
      @Index(name = "idx_emergency_hospital", columnList = "hospital_id"),
      @Index(name = "idx_emergency_created", columnList = "created_at")
    })
public class EmergencyRequest {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "hospital_id")
  private Hospital hospital;

  @Column(name = "user_latitude")
  private Double userLatitude;

  @Column(name = "user_longitude")
  private Double userLongitude;

  @Column(name = "emergency_type", length = 100)
  private String emergencyType;

  @Column(length = 50)
  private String status;

  @Column(name = "user_phone", length = 20)
  private String userPhone;

  @CreationTimestamp
  @Column(name = "created_at", nullable = false, updatable = false)
  private LocalDateTime createdAt;

  @UpdateTimestamp
  @Column(name = "updated_at", nullable = false)
  private LocalDateTime updatedAt;

  // Constructors
  public EmergencyRequest() {}

  public EmergencyRequest(
      Long id,
      Hospital hospital,
      Double userLatitude,
      Double userLongitude,
      String emergencyType,
      String status,
      String userPhone,
      LocalDateTime createdAt,
      LocalDateTime updatedAt) {
    this.id = id;
    this.hospital = hospital;
    this.userLatitude = userLatitude;
    this.userLongitude = userLongitude;
    this.emergencyType = emergencyType;
    this.status = status;
    this.userPhone = userPhone;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  // Getters
  public Long getId() {
    return id;
  }

  public Hospital getHospital() {
    return hospital;
  }

  public Double getUserLatitude() {
    return userLatitude;
  }

  public Double getUserLongitude() {
    return userLongitude;
  }

  public String getEmergencyType() {
    return emergencyType;
  }

  public String getStatus() {
    return status;
  }

  public String getUserPhone() {
    return userPhone;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public LocalDateTime getUpdatedAt() {
    return updatedAt;
  }

  // Setters
  public void setId(Long id) {
    this.id = id;
  }

  public void setHospital(Hospital hospital) {
    this.hospital = hospital;
  }

  public void setUserLatitude(Double userLatitude) {
    this.userLatitude = userLatitude;
  }

  public void setUserLongitude(Double userLongitude) {
    this.userLongitude = userLongitude;
  }

  public void setEmergencyType(String emergencyType) {
    this.emergencyType = emergencyType;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public void setUserPhone(String userPhone) {
    this.userPhone = userPhone;
  }

  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }

  public void setUpdatedAt(LocalDateTime updatedAt) {
    this.updatedAt = updatedAt;
  }

  // Builder
  public static Builder builder() {
    return new Builder();
  }

  public static class Builder {
    private Long id;
    private Hospital hospital;
    private Double userLatitude;
    private Double userLongitude;
    private String emergencyType;
    private String status;
    private String userPhone;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Builder id(Long id) {
      this.id = id;
      return this;
    }

    public Builder hospital(Hospital hospital) {
      this.hospital = hospital;
      return this;
    }

    public Builder userLatitude(Double userLatitude) {
      this.userLatitude = userLatitude;
      return this;
    }

    public Builder userLongitude(Double userLongitude) {
      this.userLongitude = userLongitude;
      return this;
    }

    public Builder emergencyType(String emergencyType) {
      this.emergencyType = emergencyType;
      return this;
    }

    public Builder status(String status) {
      this.status = status;
      return this;
    }

    public Builder userPhone(String userPhone) {
      this.userPhone = userPhone;
      return this;
    }

    public Builder createdAt(LocalDateTime createdAt) {
      this.createdAt = createdAt;
      return this;
    }

    public Builder updatedAt(LocalDateTime updatedAt) {
      this.updatedAt = updatedAt;
      return this;
    }

    public EmergencyRequest build() {
      return new EmergencyRequest(
          id,
          hospital,
          userLatitude,
          userLongitude,
          emergencyType,
          status,
          userPhone,
          createdAt,
          updatedAt);
    }
  }
}
