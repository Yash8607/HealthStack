package com.healthcare.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

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
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
@DisplayName("Emergency Service Tests")
class EmergencyServiceTest {

  @Mock private EmergencyRequestRepository emergencyRepository;
  @Mock private HospitalRepository hospitalRepository;
  @Mock private EmergencyMapper mapper;
  @Mock private EmergencyAlertBroadcaster alertBroadcaster;
  @InjectMocks private EmergencyService emergencyService;

  private CreateEmergencyRequest validRequest;
  private Hospital mockHospital;
  private EmergencyRequest mockEmergency;
  private EmergencyResponseDTO mockResponse;

  @BeforeEach
  void setUp() {
    validRequest =
        CreateEmergencyRequest.builder()
            .latitude(28.7041)
            .longitude(77.1025)
            .emergencyType("CARDIAC_ARREST")
            .hospitalId(1L)
            .userPhone("+91-9876543210")
            .build();

    mockHospital =
        Hospital.builder()
            .id(1L)
            .name("Apollo Hospital")
            .phone("+91-11-123456")
            .address("Delhi, India")
            .latitude(28.7041)
            .longitude(77.1025)
            .active(true)
            .build();

    mockEmergency =
        EmergencyRequest.builder()
            .id(1L)
            .hospital(mockHospital)
            .userLatitude(28.7041)
            .userLongitude(77.1025)
            .emergencyType("CARDIAC_ARREST")
            .status("INITIATED")
            .userPhone("+91-9876543210")
            .build();

    mockResponse =
        EmergencyResponseDTO.builder()
            .id(1L)
            .status("INITIATED")
            .message("We've alerted Apollo Hospital. Call ambulance immediately.")
            .hospital(
                EmergencyResponseDTO.HospitalAlertDTO.builder()
                    .id(1L)
                    .name("Apollo Hospital")
                    .phone("+91-11-123456")
                    .build())
            .build();
  }

  @Test
  @DisplayName("createEmergency - Success with valid request")
  void testCreateEmergencySuccess() {
    when(hospitalRepository.findById(1L)).thenReturn(Optional.of(mockHospital));
    when(emergencyRepository.save(any(EmergencyRequest.class))).thenReturn(mockEmergency);
    when(mapper.toResponseDTO(any(), any())).thenReturn(mockResponse);

    EmergencyResponseDTO result = emergencyService.createEmergency(validRequest);

    assertNotNull(result);
    assertEquals(1L, result.getId());
    assertEquals("INITIATED", result.getStatus());
    verify(hospitalRepository).findById(1L);
    verify(emergencyRepository).save(any(EmergencyRequest.class));
    try {
      verify(alertBroadcaster).notifyHospital(1L, mockEmergency);
    } catch (Exception e) {
      // Mock exception handling
    }
  }

  @Test
  @DisplayName("createEmergency - Hospital not found")
  void testCreateEmergencyHospitalNotFound() {
    when(hospitalRepository.findById(999L)).thenReturn(Optional.empty());

    ResourceNotFoundException exception =
        assertThrows(
            ResourceNotFoundException.class,
            () ->
                emergencyService.createEmergency(
                    validRequest.toBuilder().hospitalId(999L).build()));

    assertTrue(exception.getMessage().contains("not found"));
    verify(hospitalRepository).findById(999L);
    verify(emergencyRepository, never()).save(any());
  }

  @Test
  @DisplayName("createEmergency - Hospital inactive")
  void testCreateEmergencyHospitalInactive() {
    mockHospital.setActive(false);
    when(hospitalRepository.findById(1L)).thenReturn(Optional.of(mockHospital));

    HospitalNotAvailableException exception =
        assertThrows(
            HospitalNotAvailableException.class,
            () -> emergencyService.createEmergency(validRequest));

    assertTrue(exception.getMessage().contains("not currently accepting alerts"));
    verify(emergencyRepository, never()).save(any());
  }

  @Test
  @DisplayName("createEmergency - WebSocket broadcast failure doesn't fail request")
  void testCreateEmergencyWebSocketBroadcastFailure() throws Exception {
    when(hospitalRepository.findById(1L)).thenReturn(Optional.of(mockHospital));
    when(emergencyRepository.save(any(EmergencyRequest.class))).thenReturn(mockEmergency);
    when(mapper.toResponseDTO(any(), any())).thenReturn(mockResponse);
    doThrow(new RuntimeException("WebSocket unavailable"))
        .when(alertBroadcaster)
        .notifyHospital(1L, mockEmergency);

    // Should not throw exception
    EmergencyResponseDTO result =
        assertDoesNotThrow(() -> emergencyService.createEmergency(validRequest));

    assertNotNull(result);
    assertEquals(1L, result.getId());
  }

  @Test
  @DisplayName("updateStatus - Success")
  void testUpdateStatusSuccess() {
    when(emergencyRepository.findById(1L)).thenReturn(Optional.of(mockEmergency));
    when(emergencyRepository.save(any(EmergencyRequest.class))).thenReturn(mockEmergency);
    when(mapper.toResponseDTO(any(), any())).thenReturn(mockResponse);

    EmergencyResponseDTO result = emergencyService.updateStatus(1L, "ACKNOWLEDGED");

    assertNotNull(result);
    verify(emergencyRepository).findById(1L);
    verify(emergencyRepository).save(any(EmergencyRequest.class));
  }

  @Test
  @DisplayName("updateStatus - Emergency not found")
  void testUpdateStatusNotFound() {
    when(emergencyRepository.findById(999L)).thenReturn(Optional.empty());

    ResourceNotFoundException exception =
        assertThrows(
            ResourceNotFoundException.class,
            () -> emergencyService.updateStatus(999L, "ACKNOWLEDGED"));

    assertTrue(exception.getMessage().contains("not found"));
  }
}
