package com.healthcare.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDateTime;

public class EmergencyResponseDTO {

  @JsonProperty("requestId")
  private Long id;

  private HospitalAlertDTO hospital;

  private String status;

  private String message;

  private LocalDateTime createdAt;

  // Constructors
  public EmergencyResponseDTO() {}

  public EmergencyResponseDTO(
      Long id, HospitalAlertDTO hospital, String status, String message, LocalDateTime createdAt) {
    this.id = id;
    this.hospital = hospital;
    this.status = status;
    this.message = message;
    this.createdAt = createdAt;
  }

  // Getters
  public Long getId() {
    return id;
  }

  public HospitalAlertDTO getHospital() {
    return hospital;
  }

  public String getStatus() {
    return status;
  }

  public String getMessage() {
    return message;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  // Setters
  public void setId(Long id) {
    this.id = id;
  }

  public void setHospital(HospitalAlertDTO hospital) {
    this.hospital = hospital;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }

  // Builder
  public static Builder builder() {
    return new Builder();
  }

  public static class Builder {
    private Long id;
    private HospitalAlertDTO hospital;
    private String status;
    private String message;
    private LocalDateTime createdAt;

    public Builder id(Long id) {
      this.id = id;
      return this;
    }

    public Builder hospital(HospitalAlertDTO hospital) {
      this.hospital = hospital;
      return this;
    }

    public Builder status(String status) {
      this.status = status;
      return this;
    }

    public Builder message(String message) {
      this.message = message;
      return this;
    }

    public Builder createdAt(LocalDateTime createdAt) {
      this.createdAt = createdAt;
      return this;
    }

    public EmergencyResponseDTO build() {
      return new EmergencyResponseDTO(id, hospital, status, message, createdAt);
    }
  }

  public static class HospitalAlertDTO {

    private Long id;
    private String name;
    private String phone;
    private String address;
    private Double latitude;
    private Double longitude;

    // Constructors
    public HospitalAlertDTO() {}

    public HospitalAlertDTO(
        Long id, String name, String phone, String address, Double latitude, Double longitude) {
      this.id = id;
      this.name = name;
      this.phone = phone;
      this.address = address;
      this.latitude = latitude;
      this.longitude = longitude;
    }

    // Getters
    public Long getId() {
      return id;
    }

    public String getName() {
      return name;
    }

    public String getPhone() {
      return phone;
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

    // Setters
    public void setId(Long id) {
      this.id = id;
    }

    public void setName(String name) {
      this.name = name;
    }

    public void setPhone(String phone) {
      this.phone = phone;
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

    // Builder
    public static Builder builder() {
      return new Builder();
    }

    public static class Builder {
      private Long id;
      private String name;
      private String phone;
      private String address;
      private Double latitude;
      private Double longitude;

      public Builder id(Long id) {
        this.id = id;
        return this;
      }

      public Builder name(String name) {
        this.name = name;
        return this;
      }

      public Builder phone(String phone) {
        this.phone = phone;
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

      public HospitalAlertDTO build() {
        return new HospitalAlertDTO(id, name, phone, address, latitude, longitude);
      }
    }
  }
}
