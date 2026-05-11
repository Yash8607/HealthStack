package com.healthcare.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(
    name = "hospitals",
    indexes = {
      @Index(name = "idx_hospital_name", columnList = "name"),
      @Index(name = "idx_hospital_location", columnList = "latitude, longitude")
    })
public class Hospital {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, length = 255)
  private String name;

  @Column(length = 512)
  private String address;

  @Column private Double latitude;

  @Column private Double longitude;

  @Column(length = 20)
  private String phone;

  @Column(length = 255)
  private String email;

  @Column(name = "established_year")
  private Integer establishedYear;

  @Column private Double rating;

  @Column(name = "is_active", nullable = false)
  private Boolean active = true;

  @CreationTimestamp
  @Column(name = "created_at", nullable = false, updatable = false)
  private LocalDateTime createdAt;

  @UpdateTimestamp
  @Column(name = "updated_at", nullable = false)
  private LocalDateTime updatedAt;

  // Constructors
  public Hospital() {}

  public Hospital(
      Long id,
      String name,
      String address,
      Double latitude,
      Double longitude,
      String phone,
      String email,
      Integer establishedYear,
      Double rating,
      Boolean active,
      LocalDateTime createdAt,
      LocalDateTime updatedAt) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.latitude = latitude;
    this.longitude = longitude;
    this.phone = phone;
    this.email = email;
    this.establishedYear = establishedYear;
    this.rating = rating;
    this.active = active;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  // Getters
  public Long getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public String getAddress() {
    return address;
  }

  public Double getLatitude() {
    return latitude;
  }

  public Double getLongitude() {
    return longitude;
  }

  public String getPhone() {
    return phone;
  }

  public String getEmail() {
    return email;
  }

  public Integer getEstablishedYear() {
    return establishedYear;
  }

  public Double getRating() {
    return rating;
  }

  public Boolean getActive() {
    return active;
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

  public void setName(String name) {
    this.name = name;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public void setLatitude(Double latitude) {
    this.latitude = latitude;
  }

  public void setLongitude(Double longitude) {
    this.longitude = longitude;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public void setEstablishedYear(Integer establishedYear) {
    this.establishedYear = establishedYear;
  }

  public void setRating(Double rating) {
    this.rating = rating;
  }

  public void setActive(Boolean active) {
    this.active = active;
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
    private String name;
    private String address;
    private Double latitude;
    private Double longitude;
    private String phone;
    private String email;
    private Integer establishedYear;
    private Double rating;
    private Boolean active = true;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Builder id(Long id) {
      this.id = id;
      return this;
    }

    public Builder name(String name) {
      this.name = name;
      return this;
    }

    public Builder address(String address) {
      this.address = address;
      return this;
    }

    public Builder latitude(Double latitude) {
      this.latitude = latitude;
      return this;
    }

    public Builder longitude(Double longitude) {
      this.longitude = longitude;
      return this;
    }

    public Builder phone(String phone) {
      this.phone = phone;
      return this;
    }

    public Builder email(String email) {
      this.email = email;
      return this;
    }

    public Builder establishedYear(Integer establishedYear) {
      this.establishedYear = establishedYear;
      return this;
    }

    public Builder rating(Double rating) {
      this.rating = rating;
      return this;
    }

    public Builder active(Boolean active) {
      this.active = active;
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

    public Hospital build() {
      return new Hospital(
          id,
          name,
          address,
          latitude,
          longitude,
          phone,
          email,
          establishedYear,
          rating,
          active,
          createdAt,
          updatedAt);
    }
  }

  /**
   * Check if hospital is inactive.
   *
   * @return true if hospital is inactive, false if active
   */
  public boolean isInactive() {
    return active == null || !active;
  }
}
