package com.healthcare.service;

import com.healthcare.dto.CreateEmergencyRequest;
import com.healthcare.dto.EmergencyResponseDTO;
import com.healthcare.entity.EmergencyRequest;
import com.healthcare.entity.Hospital;
import com.healthcare.exception.HospitalNotAvailableException;
import com.healthcare.exception.ResourceNotFoundException;
import com.healthcare.mapper.EmergencyMapper;
import com.healthcare.repository.EmergencyRequestRepository;
import com.healthcare.repository.HospitalRepository;
import com.healthcare.websocket.EmergencyAlertBroadcaster;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class EmergencyService {

  private static final Logger log = LoggerFactory.getLogger(EmergencyService.class);

  private final EmergencyRequestRepository emergencyRepository;
  private final HospitalRepository hospitalRepository;
  private final EmergencyMapper mapper;
  private final EmergencyAlertBroadcaster alertBroadcaster;

  public EmergencyService(EmergencyRequestRepository emergencyRepository,
                          HospitalRepository hospitalRepository,
                          EmergencyMapper mapper,
                          EmergencyAlertBroadcaster alertBroadcaster) {
    this.emergencyRepository = emergencyRepository;
    this.hospitalRepository = hospitalRepository;
    this.mapper = mapper;
    this.alertBroadcaster = alertBroadcaster;
  }

  /**
   * Create emergency request and alert nearest hospital.
   *
   * @param request emergency request with user location and hospital ID
   * @return emergency response with hospital details and alert status
   * @throws ResourceNotFoundException if hospital not found
   * @throws HospitalNotAvailableException if hospital cannot receive alerts
   */
  @Transactional
  public EmergencyResponseDTO createEmergency(CreateEmergencyRequest request) {
    log.info("Creating emergency request for hospital ID: {}", request.getHospitalId());

    // Lookup hospital
    Hospital hospital = hospitalRepository.findById(request.getHospitalId())
        .orElseThrow(() -> {
          log.warn("Hospital not found: {}", request.getHospitalId());
          return new ResourceNotFoundException(
              "Hospital with ID " + request.getHospitalId() + " not found");
        });

    // Validate hospital can receive alerts
    if (hospital.isInactive()) {
      log.warn("Hospital inactive: {}", hospital.getId());
      throw new HospitalNotAvailableException(
          "Hospital " + hospital.getName() + " is not currently accepting alerts");
    }

    // Create emergency request entity
    EmergencyRequest emergency = EmergencyRequest.builder()
        .hospital(hospital)
        .userLatitude(request.getLatitude())
        .userLongitude(request.getLongitude())
        .emergencyType(request.getEmergencyType())
        .userPhone(request.getUserPhone())
        .status("INITIATED")
        .build();

    // Persist to database
    EmergencyRequest saved = emergencyRepository.save(emergency);
    log.info("Emergency request created: {} for hospital: {}", saved.getId(), hospital.getId());

    // Broadcast alert to hospital via WebSocket
    try {
      alertBroadcaster.notifyHospital(hospital.getId(), saved);
      log.info("Alert broadcasted to hospital: {}", hospital.getId());
    } catch (Exception e) {
      log.error("Failed to broadcast alert to hospital: {}", hospital.getId(), e);
      // Don't fail the request if broadcast fails; hospital can poll for updates
    }

    // Return response DTO
    return mapper.toResponseDTO(saved, hospital);
  }

  /**
   * Get emergency requests for a hospital.
   *
   * @param hospitalId hospital identifier
   * @return list of recent emergency requests
   */
  @Transactional(readOnly = true)
  public List<EmergencyResponseDTO> getEmergenciesByHospital(Long hospitalId) {
    log.info("Fetching emergencies for hospital: {}", hospitalId);
    return emergencyRepository.findByHospitalIdOrderByCreatedAtDesc(hospitalId)
        .stream()
        .map(emergency -> mapper.toResponseDTO(emergency, emergency.getHospital()))
        .toList();
  }

  /**
   * Get active emergency requests.
   *
   * @return list of active emergencies
   */
  @Transactional(readOnly = true)
  public List<EmergencyResponseDTO> getActiveEmergencies() {
    log.info("Fetching active emergencies");
    return emergencyRepository.findByStatusOrderByCreatedAtDesc("INITIATED")
        .stream()
        .map(emergency -> mapper.toResponseDTO(emergency, emergency.getHospital()))
        .toList();
  }

  /**
   * Get emergencies from last N minutes.
   *
   * @param minutes time window in minutes
   * @return recent emergency requests
   */
  @Transactional(readOnly = true)
  public List<EmergencyResponseDTO> getRecentEmergencies(int minutes) {
    LocalDateTime since = LocalDateTime.now().minusMinutes(minutes);
    log.info("Fetching emergencies since: {}", since);
    return emergencyRepository.findByCreatedAtAfterOrderByCreatedAtDesc(since)
        .stream()
        .map(emergency -> mapper.toResponseDTO(emergency, emergency.getHospital()))
        .toList();
  }

  /**
   * Update emergency request status.
   *
   * @param emergencyId emergency request ID
   * @param status new status
   * @return updated emergency response
   */
  @Transactional
  public EmergencyResponseDTO updateStatus(Long emergencyId, String status) {
    log.info("Updating emergency status: {} -> {}", emergencyId, status);

    EmergencyRequest emergency = emergencyRepository.findById(emergencyId)
        .orElseThrow(() -> new ResourceNotFoundException(
            "Emergency request with ID " + emergencyId + " not found"));

    emergency.setStatus(status);
    EmergencyRequest updated = emergencyRepository.save(emergency);

    log.info("Emergency status updated: {}", emergencyId);
    return mapper.toResponseDTO(updated, updated.getHospital());
  }
}
