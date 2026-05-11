package com.healthcare.dto;

public class DoctorDTO {
  private Long id;
  private String name;
  private String specialization;
  private String qualification;
  private String phone;

  public DoctorDTO() {}

  public DoctorDTO(
      Long id, String name, String specialization, String qualification, String phone) {
    this.id = id;
    this.name = name;
    this.specialization = specialization;
    this.qualification = qualification;
    this.phone = phone;
  }

  public Long getId() {
    return id;
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

  public void setId(Long id) {
    this.id = id;
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
}
