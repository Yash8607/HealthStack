package com.healthcare.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "first_aid_articles")
public class FirstAid {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, length = 255)
  private String title;

  @Column(nullable = false, length = 2000)
  private String description;

  @Column(length = 5000)
  private String steps;

  @Column(length = 1000)
  private String precautions;

  @Column(length = 255)
  private String category;

  @Column(nullable = false)
  private Boolean published = true;

  @CreationTimestamp
  @Column(name = "created_at", nullable = false, updatable = false)
  private LocalDateTime createdAt;

  @UpdateTimestamp
  @Column(name = "updated_at", nullable = false)
  private LocalDateTime updatedAt;

  public FirstAid() {}

  public FirstAid(Long id, String title, String description, String steps,
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
