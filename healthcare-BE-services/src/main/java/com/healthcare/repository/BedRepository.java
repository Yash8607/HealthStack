package com.healthcare.repository;

import com.healthcare.entity.Bed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BedRepository extends JpaRepository<Bed, Long> {
  List<Bed> findByHospitalId(Long hospitalId);
}
