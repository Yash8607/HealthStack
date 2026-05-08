package com.healthcare.controller;

import com.healthcare.dto.HospitalDTO;
import com.healthcare.dto.HospitalDetailDTO;
import com.healthcare.service.HospitalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/hospitals")
public class HospitalController {

  @Autowired private HospitalService hospitalService;

  @GetMapping
  public ResponseEntity<Page<HospitalDTO>> search(
      @RequestParam(name = "search", defaultValue = "") String search,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "20") int size) {
    Pageable pageable = PageRequest.of(page, size);
    return ResponseEntity.ok(hospitalService.search(search, pageable));
  }

  @GetMapping("/{id}")
  public ResponseEntity<HospitalDetailDTO> getById(@PathVariable Long id) {
    return ResponseEntity.ok(hospitalService.getById(id));
  }

  @GetMapping("/nearby")
  public ResponseEntity<List<HospitalDTO>> getNearby(
      @RequestParam Double latitude,
      @RequestParam Double longitude,
      @RequestParam(defaultValue = "5") Double radius) {
    return ResponseEntity.ok(hospitalService.getNearby(latitude, longitude, radius));
  }
}
