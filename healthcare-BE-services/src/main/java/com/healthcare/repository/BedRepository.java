package com.healthcare.repository;

import com.healthcare.entity.Bed;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BedRepository extends JpaRepository<Bed, Long> {
  List<Bed> findByHospitalId(Long hospitalId);
}
