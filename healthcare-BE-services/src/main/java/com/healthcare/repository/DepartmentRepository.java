package com.healthcare.repository;

import com.healthcare.entity.Department;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {
  List<Department> findByHospitalId(Long hospitalId);
}
