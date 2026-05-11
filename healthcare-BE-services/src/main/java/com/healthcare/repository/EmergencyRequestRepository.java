package com.healthcare.repository;

import com.healthcare.entity.EmergencyRequest;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmergencyRequestRepository extends JpaRepository<EmergencyRequest, Long> {
  List<EmergencyRequest> findByHospitalIdOrderByCreatedAtDesc(Long hospitalId);

  List<EmergencyRequest> findByStatusOrderByCreatedAtDesc(String status);

  List<EmergencyRequest> findByCreatedAtAfterOrderByCreatedAtDesc(LocalDateTime dateTime);
}
