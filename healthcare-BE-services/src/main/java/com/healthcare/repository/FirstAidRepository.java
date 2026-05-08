package com.healthcare.repository;

import com.healthcare.entity.FirstAid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FirstAidRepository extends JpaRepository<FirstAid, Long> {
  List<FirstAid> findByPublishedTrue();
  List<FirstAid> findByCategoryAndPublishedTrue(String category);
}
