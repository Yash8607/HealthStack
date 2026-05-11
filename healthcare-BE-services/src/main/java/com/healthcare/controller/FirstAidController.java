package com.healthcare.controller;

import com.healthcare.dto.FirstAidDTO;
import com.healthcare.service.FirstAidService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/first-aid")
public class FirstAidController {

  @Autowired private FirstAidService firstAidService;

  @GetMapping
  public ResponseEntity<List<FirstAidDTO>> getAll(@RequestParam(required = false) String category) {
    if (category != null && !category.isEmpty()) {
      return ResponseEntity.ok(firstAidService.getByCategory(category));
    }
    return ResponseEntity.ok(firstAidService.getAll());
  }

  @GetMapping("/{id}")
  public ResponseEntity<FirstAidDTO> getById(@PathVariable Long id) {
    return ResponseEntity.ok(firstAidService.getById(id));
  }
}
