package com.healthcare.repository;

import com.healthcare.entity.Hospital;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HospitalRepository extends JpaRepository<Hospital, Long> {
  Page<Hospital> findByNameContainingIgnoreCaseAndActiveTrue(String name, Pageable pageable);

  @Query(value = "SELECT * FROM hospitals h WHERE h.is_active = true AND " +
                "SQRT(POWER(h.latitude - :latitude, 2) + POWER(h.longitude - :longitude, 2)) < :radiusKm / 111.32 " +
                "ORDER BY SQRT(POWER(h.latitude - :latitude, 2) + POWER(h.longitude - :longitude, 2))",
         nativeQuery = true)
  List<Hospital> findNearby(@Param("latitude") Double latitude,
                            @Param("longitude") Double longitude,
                            @Param("radiusKm") Double radiusKm);
}
