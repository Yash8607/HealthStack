package com.healthcare.repository;

import com.healthcare.entity.FirstAid;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FirstAidRepository extends JpaRepository<FirstAid, Long> {
  List<FirstAid> findByPublishedTrue();

  List<FirstAid> findByCategoryAndPublishedTrue(String category);
}
