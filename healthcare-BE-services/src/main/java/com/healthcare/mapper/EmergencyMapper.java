package com.healthcare.mapper;

import com.healthcare.dto.EmergencyResponseDTO;
import com.healthcare.entity.EmergencyRequest;
import com.healthcare.entity.Hospital;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface EmergencyMapper {

  /**
   * Map emergency request entity to response DTO with hospital details.
   *
   * @param emergency emergency request entity
   * @param hospital hospital entity
   * @return emergency response DTO
   */
  default EmergencyResponseDTO toResponseDTO(EmergencyRequest emergency, Hospital hospital) {
    if (emergency == null) {
      return null;
    }

    EmergencyResponseDTO.HospitalAlertDTO hospitalAlert =
        EmergencyResponseDTO.HospitalAlertDTO.builder()
            .id(hospital.getId())
            .name(hospital.getName())
            .phone(hospital.getPhone())
            .address(hospital.getAddress())
            .latitude(hospital.getLatitude())
            .longitude(hospital.getLongitude())
            .build();

    String message = composeMessage(hospital.getName());

    return EmergencyResponseDTO.builder()
        .id(emergency.getId())
        .hospital(hospitalAlert)
        .status(emergency.getStatus())
        .message(message)
        .createdAt(emergency.getCreatedAt())
        .build();
  }

  /**
   * Compose alert message for user.
   *
   * @param hospitalName name of alerted hospital
   * @return message text
   */
  private String composeMessage(String hospitalName) {
    return "We've alerted "
        + hospitalName
        + ". They are being notified of your emergency. Call ambulance immediately if needed.";
  }
}
