package com.healthcare.controller;

import com.healthcare.dto.CreateEmergencyRequest;
import com.healthcare.dto.EmergencyResponseDTO;
import com.healthcare.exception.HospitalNotAvailableException;
import com.healthcare.exception.ResourceNotFoundException;
import com.healthcare.service.EmergencyService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(EmergencyController.class)
@DisplayName("Emergency Controller Tests")
class EmergencyControllerTest {

  @Autowired private MockMvc mvc;
  @Autowired private ObjectMapper objectMapper;
  @MockBean private EmergencyService emergencyService;

  private CreateEmergencyRequest validRequest;
  private EmergencyResponseDTO mockResponse;

  @BeforeEach
  void setUp() {
    validRequest = CreateEmergencyRequest.builder()
        .latitude(28.7041)
        .longitude(77.1025)
        .emergencyType("CARDIAC_ARREST")
        .hospitalId(1L)
        .userPhone("+91-9876543210")
        .build();

    mockResponse = EmergencyResponseDTO.builder()
        .id(1L)
        .status("INITIATED")
        .message("We've alerted Apollo Hospital. Call ambulance immediately.")
        .createdAt(LocalDateTime.now())
        .hospital(EmergencyResponseDTO.HospitalAlertDTO.builder()
            .id(1L)
            .name("Apollo Hospital")
            .phone("+91-11-123456")
            .address("Delhi, India")
            .latitude(28.7041)
            .longitude(77.1025)
            .build())
        .build();
  }

  @Test
  @DisplayName("POST /api/v1/emergency - Success with valid request")
  void testCreateEmergencySuccess() throws Exception {
    when(emergencyService.createEmergency(any())).thenReturn(mockResponse);

    mvc.perform(post("/api/v1/emergency")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(validRequest)))
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.status").value("INITIATED"))
        .andExpect(jsonPath("$.id").value(1))
        .andExpect(jsonPath("$.hospital.name").value("Apollo Hospital"))
        .andExpect(jsonPath("$.message").exists());
  }

  @Test
  @DisplayName("POST /api/v1/emergency - Invalid latitude")
  void testCreateEmergencyInvalidLatitude() throws Exception {
    validRequest.setLatitude(95.0); // Invalid: > 90

    mvc.perform(post("/api/v1/emergency")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(validRequest)))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.code").value("VALIDATION_ERROR"))
        .andExpect(jsonPath("$.fieldErrors.latitude").exists());
  }

  @Test
  @DisplayName("POST /api/v1/emergency - Invalid longitude")
  void testCreateEmergencyInvalidLongitude() throws Exception {
    validRequest.setLongitude(185.0); // Invalid: > 180

    mvc.perform(post("/api/v1/emergency")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(validRequest)))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.code").value("VALIDATION_ERROR"))
        .andExpect(jsonPath("$.fieldErrors.longitude").exists());
  }

  @Test
  @DisplayName("POST /api/v1/emergency - Missing required fields")
  void testCreateEmergencyMissingRequired() throws Exception {
    validRequest.setLatitude(null);
    validRequest.setHospitalId(null);

    mvc.perform(post("/api/v1/emergency")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(validRequest)))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.code").value("VALIDATION_ERROR"));
  }

  @Test
  @DisplayName("POST /api/v1/emergency - Hospital not found")
  void testCreateEmergencyHospitalNotFound() throws Exception {
    when(emergencyService.createEmergency(any()))
        .thenThrow(new ResourceNotFoundException("Hospital with ID 999 not found"));

    mvc.perform(post("/api/v1/emergency")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(validRequest)))
        .andExpect(status().isNotFound())
        .andExpect(jsonPath("$.code").value("RESOURCE_NOT_FOUND"))
        .andExpect(jsonPath("$.message").value("Hospital with ID 999 not found"));
  }

  @Test
  @DisplayName("POST /api/v1/emergency - Hospital not available")
  void testCreateEmergencyHospitalNotAvailable() throws Exception {
    when(emergencyService.createEmergency(any()))
        .thenThrow(new HospitalNotAvailableException("Hospital is currently offline"));

    mvc.perform(post("/api/v1/emergency")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(validRequest)))
        .andExpect(status().isServiceUnavailable())
        .andExpect(jsonPath("$.code").value("HOSPITAL_NOT_AVAILABLE"));
  }

  @Test
  @DisplayName("GET /api/v1/emergency/active - Get active emergencies")
  void testGetActiveEmergencies() throws Exception {
    mvc.perform(get("/api/v1/emergency/active"))
        .andExpect(status().isOk());
  }

  @Test
  @DisplayName("GET /api/v1/emergency/recent - Get recent emergencies")
  void testGetRecentEmergencies() throws Exception {
    mvc.perform(get("/api/v1/emergency/recent?minutes=60"))
        .andExpect(status().isOk());
  }

  @Test
  @DisplayName("GET /api/v1/emergency/hospital/{id} - Get hospital emergencies")
  void testGetEmergenciesByHospital() throws Exception {
    mvc.perform(get("/api/v1/emergency/hospital/1"))
        .andExpect(status().isOk());
  }
}
