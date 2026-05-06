package com.healthcare.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "hospitals", indexes = {
    @Index(name = "idx_hospital_name", columnList = "name"),
    @Index(name = "idx_hospital_location", columnList = "latitude, longitude")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Hospital {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, length = 255)
  private String name;

  @Column(length = 512)
  private String address;

  @Column(precision = 10, scale = 8)
  private Double latitude;

  @Column(precision = 11, scale = 8)
  private Double longitude;

  @Column(length = 20)
  private String phone;

  @Column(length = 255)
  private String email;

  @Column(name = "established_year")
  private Integer establishedYear;

  @Column(precision = 3, scale = 2)
  private Double rating;

  @OneToMany(mappedBy = "hospital", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Department> departments = new ArrayList<>();

  @OneToMany(mappedBy = "hospital", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Doctor> doctors = new ArrayList<>();

  @OneToMany(mappedBy = "hospital", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Bed> beds = new ArrayList<>();

  @OneToMany(mappedBy = "hospital", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Service> services = new ArrayList<>();

  @CreationTimestamp
  @Column(name = "created_at", nullable = false, updatable = false)
  private LocalDateTime createdAt;

  @UpdateTimestamp
  @Column(name = "updated_at", nullable = false)
  private LocalDateTime updatedAt;
}
