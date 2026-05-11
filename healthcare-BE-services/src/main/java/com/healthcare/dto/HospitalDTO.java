package com.healthcare.dto;

import java.time.LocalDateTime;

public class HospitalDTO {
  private Long id;
  private String name;
  private String address;
  private Double latitude;
  private Double longitude;
  private String phone;
  private String email;
  private Integer establishedYear;
  private Double rating;
  private Boolean active;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;

  public HospitalDTO() {}

  public HospitalDTO(
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
}
