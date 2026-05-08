package com.healthcare.dto;

import jakarta.validation.constraints.*;

public class CreateEmergencyRequest {

  @NotNull(message = "Latitude is required")
  @DecimalMin(value = "-90.0", message = "Latitude must be between -90 and 90")
  @DecimalMax(value = "90.0", message = "Latitude must be between -90 and 90")
  private Double latitude;

  @NotNull(message = "Longitude is required")
  @DecimalMin(value = "-180.0", message = "Longitude must be between -180 and 180")
  @DecimalMax(value = "180.0", message = "Longitude must be between -180 and 180")
  private Double longitude;

  @NotBlank(message = "Emergency type is required")
  @Size(min = 3, max = 100, message = "Emergency type must be between 3 and 100 characters")
  private String emergencyType;

  @NotNull(message = "Hospital ID is required")
  @Positive(message = "Hospital ID must be positive")
  private Long hospitalId;

  @Size(max = 20, message = "Phone number must not exceed 20 characters")
  private String userPhone;

  // Constructors
  public CreateEmergencyRequest() {}

  public CreateEmergencyRequest(Double latitude, Double longitude, String emergencyType,
                                Long hospitalId, String userPhone) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.emergencyType = emergencyType;
    this.hospitalId = hospitalId;
    this.userPhone = userPhone;
  }

  // Getters
  public Double getLatitude() { return latitude; }
  public Double getLongitude() { return longitude; }
  public String getEmergencyType() { return emergencyType; }
  public Long getHospitalId() { return hospitalId; }
  public String getUserPhone() { return userPhone; }

  // Setters
  public void setLatitude(Double latitude) { this.latitude = latitude; }
  public void setLongitude(Double longitude) { this.longitude = longitude; }
  public void setEmergencyType(String emergencyType) { this.emergencyType = emergencyType; }
  public void setHospitalId(Long hospitalId) { this.hospitalId = hospitalId; }
  public void setUserPhone(String userPhone) { this.userPhone = userPhone; }

  // Builder
  public static Builder builder() {
    return new Builder();
  }

  public Builder toBuilder() {
    return new Builder()
        .latitude(this.latitude)
        .longitude(this.longitude)
        .emergencyType(this.emergencyType)
        .hospitalId(this.hospitalId)
        .userPhone(this.userPhone);
  }

  public static class Builder {
    private Double latitude;
    private Double longitude;
    private String emergencyType;
    private Long hospitalId;
    private String userPhone;

    public Builder latitude(Double latitude) { this.latitude = latitude; return this; }
    public Builder longitude(Double longitude) { this.longitude = longitude; return this; }
    public Builder emergencyType(String emergencyType) { this.emergencyType = emergencyType; return this; }
    public Builder hospitalId(Long hospitalId) { this.hospitalId = hospitalId; return this; }
    public Builder userPhone(String userPhone) { this.userPhone = userPhone; return this; }

    public CreateEmergencyRequest build() {
      return new CreateEmergencyRequest(latitude, longitude, emergencyType, hospitalId, userPhone);
    }
  }
}
