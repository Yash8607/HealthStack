package com.healthcare.dto;

import java.time.LocalDateTime;

public class FirstAidDTO {
  private Long id;
  private String title;
  private String description;
  private String steps;
  private String precautions;
  private String category;
  private Boolean published;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;

  public FirstAidDTO() {}

  public FirstAidDTO(Long id, String title, String description, String steps,
                     String precautions, String category, Boolean published,
                     LocalDateTime createdAt, LocalDateTime updatedAt) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.steps = steps;
    this.precautions = precautions;
    this.category = category;
    this.published = published;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public Long getId() { return id; }
  public String getTitle() { return title; }
  public String getDescription() { return description; }
  public String getSteps() { return steps; }
  public String getPrecautions() { return precautions; }
  public String getCategory() { return category; }
  public Boolean getPublished() { return published; }
  public LocalDateTime getCreatedAt() { return createdAt; }
  public LocalDateTime getUpdatedAt() { return updatedAt; }

  public void setId(Long id) { this.id = id; }
  public void setTitle(String title) { this.title = title; }
  public void setDescription(String description) { this.description = description; }
  public void setSteps(String steps) { this.steps = steps; }
  public void setPrecautions(String precautions) { this.precautions = precautions; }
  public void setCategory(String category) { this.category = category; }
  public void setPublished(Boolean published) { this.published = published; }
  public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
  public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
