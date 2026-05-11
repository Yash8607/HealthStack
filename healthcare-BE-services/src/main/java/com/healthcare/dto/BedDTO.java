package com.healthcare.dto;

public class BedDTO {
  private Long id;
  private Integer totalBeds;
  private Integer occupiedBeds;
  private Integer availableBeds;

  public BedDTO() {}

  public BedDTO(Long id, Integer totalBeds, Integer occupiedBeds, Integer availableBeds) {
    this.id = id;
    this.totalBeds = totalBeds;
    this.occupiedBeds = occupiedBeds;
    this.availableBeds = availableBeds;
  }

  public Long getId() {
    return id;
  }

  public Integer getTotalBeds() {
    return totalBeds;
  }

  public Integer getOccupiedBeds() {
    return occupiedBeds;
  }

  public Integer getAvailableBeds() {
    return availableBeds;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public void setTotalBeds(Integer totalBeds) {
    this.totalBeds = totalBeds;
  }

  public void setOccupiedBeds(Integer occupiedBeds) {
    this.occupiedBeds = occupiedBeds;
  }

  public void setAvailableBeds(Integer availableBeds) {
    this.availableBeds = availableBeds;
  }
}
