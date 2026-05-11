package com.healthcare.dto;

import java.util.ArrayList;
import java.util.List;

public class DepartmentDTO {
  private Long id;
  private String name;
  private String description;
  private List<DoctorDTO> doctors = new ArrayList<>();

  public DepartmentDTO() {}

  public DepartmentDTO(Long id, String name, String description, List<DoctorDTO> doctors) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.doctors = doctors;
  }

  public Long getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public String getDescription() {
    return description;
  }

  public List<DoctorDTO> getDoctors() {
    return doctors;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public void setDoctors(List<DoctorDTO> doctors) {
    this.doctors = doctors;
  }
}
