package com.healthcare.repository;

import com.healthcare.entity.EmergencyRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface EmergencyRequestRepository extends JpaRepository<EmergencyRequest, Long> {
  List<EmergencyRequest> findByHospitalIdOrderByCreatedAtDesc(Long hospitalId);

  List<EmergencyRequest> findByStatusOrderByCreatedAtDesc(String status);

  List<EmergencyRequest> findByCreatedAtAfterOrderByCreatedAtDesc(LocalDateTime dateTime);
}
