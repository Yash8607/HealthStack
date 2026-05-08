
package com.healthcare.controller;

import com.healthcare.dto.CreateEmergencyRequest;
import com.healthcare.dto.EmergencyResponseDTO;
import com.healthcare.service.EmergencyService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/emergency")
public class EmergencyController {

  private static final Logger log = LoggerFactory.getLogger(EmergencyController.class);
  private final EmergencyService emergencyService;

  
  public EmergencyController(EmergencyService emergencyService) {
    this.emergencyService = emergencyService;
  }

  /**
   * Submit emergency request to alert nearby hospital.
   *
   * Request: POST /api/v1/emergency
   * Body: CreateEmergencyRequest (latitude, longitude, emergencyType, hospitalId, userPhone)
   * Response: 201 CREATED with EmergencyResponseDTO containing hospital alert details
   *
   * @param request emergency request with location and hospital ID
   * @return created emergency response with hospital details
   */
  @PostMapping
  public ResponseEntity<EmergencyResponseDTO> createEmergency(
      @Valid @RequestBody CreateEmergencyRequest request) {
    log.info("POST /emergency - Creating emergency for hospital: {}", request.getHospitalId());

    EmergencyResponseDTO response = emergencyService.createEmergency(request);

    log.info("POST /emergency - Success: Request ID: {}", response.getId());
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }

  /**
   * Get all emergency requests for a specific hospital.
   *
   * Request: GET /api/v1/emergency/hospital/{hospitalId}
   * Response: 200 OK with list of emergency responses
   *
   * @param hospitalId hospital identifier
   * @return list of emergency requests for hospital
   */
  @GetMapping("/hospital/{hospitalId}")
  public ResponseEntity<List<EmergencyResponseDTO>> getEmergenciesByHospital(
      @PathVariable Long hospitalId) {
    log.info("GET /emergency/hospital/{} - Fetching emergencies", hospitalId);

    List<EmergencyResponseDTO> responses = emergencyService.getEmergenciesByHospital(hospitalId);

    log.info("GET /emergency/hospital/{} - Found {} records", hospitalId, responses.size());
    return ResponseEntity.ok(responses);
  }

  /**
   * Get currently active emergency requests (INITIATED status).
   *
   * Request: GET /api/v1/emergency/active
   * Response: 200 OK with list of active emergencies
   *
   * @return list of active emergency requests
   */
  @GetMapping("/active")
  public ResponseEntity<List<EmergencyResponseDTO>> getActiveEmergencies() {
    log.info("GET /emergency/active - Fetching active emergencies");

    List<EmergencyResponseDTO> responses = emergencyService.getActiveEmergencies();

    log.info("GET /emergency/active - Found {} active records", responses.size());
    return ResponseEntity.ok(responses);
  }

  /**
   * Get emergency requests from last N minutes.
   *
   * Request: GET /api/v1/emergency/recent?minutes=30
   * Response: 200 OK with list of recent emergencies
   *
   * @param minutes time window in minutes (default 30)
   * @return list of recent emergency requests
   */
  @GetMapping("/recent")
  public ResponseEntity<List<EmergencyResponseDTO>> getRecentEmergencies(
      @RequestParam(defaultValue = "30") int minutes) {
    log.info("GET /emergency/recent?minutes={} - Fetching recent emergencies", minutes);

    List<EmergencyResponseDTO> responses = emergencyService.getRecentEmergencies(minutes);

    log.info("GET /emergency/recent - Found {} records", responses.size());
    return ResponseEntity.ok(responses);
  }

  /**
   * Update emergency request status.
   * Used by hospitals to acknowledge or update emergency status.
   *
   * Request: PATCH /api/v1/emergency/{emergencyId}/status?status=ACKNOWLEDGED
   * Response: 200 OK with updated emergency response
   *
   * @param emergencyId emergency request ID
   * @param status new status (ACKNOWLEDGED, DISPATCHED, ARRIVED, COMPLETED, CANCELLED)
   * @return updated emergency response
   */
  @PatchMapping("/{emergencyId}/status")
  public ResponseEntity<EmergencyResponseDTO> updateStatus(
      @PathVariable Long emergencyId, @RequestParam String status) {
    log.info("PATCH /emergency/{}/status - Updating to: {}", emergencyId, status);

    EmergencyResponseDTO response = emergencyService.updateStatus(emergencyId, status);

    log.info("PATCH /emergency/{}/status - Success", emergencyId);
    return ResponseEntity.ok(response);
  }
}
