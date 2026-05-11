package com.healthcare.service;

import com.healthcare.dto.BedDTO;
import com.healthcare.dto.DepartmentDTO;
import com.healthcare.dto.DoctorDTO;
import com.healthcare.dto.HospitalDTO;
import com.healthcare.dto.HospitalDetailDTO;
import com.healthcare.entity.Bed;
import com.healthcare.entity.Department;
import com.healthcare.entity.Doctor;
import com.healthcare.entity.Hospital;
import com.healthcare.exception.ResourceNotFoundException;
import com.healthcare.repository.BedRepository;
import com.healthcare.repository.DepartmentRepository;
import com.healthcare.repository.DoctorRepository;
import com.healthcare.repository.HospitalRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class HospitalService {

  @Autowired private HospitalRepository hospitalRepository;
  @Autowired private DepartmentRepository departmentRepository;
  @Autowired private DoctorRepository doctorRepository;
  @Autowired private BedRepository bedRepository;

  @Transactional(readOnly = true)
  public Page<HospitalDTO> search(String query, Pageable pageable) {
    String searchQuery = query != null ? query : "";
    return hospitalRepository
        .findByNameContainingIgnoreCaseAndActiveTrue(searchQuery, pageable)
        .map(this::toDTO);
  }

  @Transactional(readOnly = true)
  public HospitalDetailDTO getById(Long id) {
    Hospital hospital =
        hospitalRepository
            .findById(id)
            .orElseThrow(
                () -> new ResourceNotFoundException("Hospital with ID " + id + " not found"));

    if (!hospital.getActive()) {
      throw new ResourceNotFoundException("Hospital with ID " + id + " not found");
    }

    List<Department> departments = departmentRepository.findByHospitalId(id);
    List<DepartmentDTO> departmentDTOs =
        departments.stream().map(this::toDepartmentDTO).collect(Collectors.toList());

    List<Bed> beds = bedRepository.findByHospitalId(id);
    BedDTO bedDTO = null;
    if (!beds.isEmpty()) {
      Bed bed = beds.get(0);
      bedDTO =
          new BedDTO(
              bed.getId(), bed.getTotalBeds(), bed.getOccupiedBeds(), bed.getAvailableBeds());
    }

    return toDetailDTO(hospital, departmentDTOs, bedDTO);
  }

  @Transactional(readOnly = true)
  public List<HospitalDTO> getNearby(Double latitude, Double longitude, Double radiusKm) {
    List<Hospital> hospitals = hospitalRepository.findNearby(latitude, longitude, radiusKm);
    return hospitals.stream().map(this::toDTO).collect(Collectors.toList());
  }

  private HospitalDTO toDTO(Hospital hospital) {
    return new HospitalDTO(
        hospital.getId(),
        hospital.getName(),
        hospital.getAddress(),
        hospital.getLatitude(),
        hospital.getLongitude(),
        hospital.getPhone(),
        hospital.getEmail(),
        hospital.getEstablishedYear(),
        hospital.getRating(),
        hospital.getActive(),
        hospital.getCreatedAt(),
        hospital.getUpdatedAt());
  }

  private DepartmentDTO toDepartmentDTO(Department department) {
    List<Doctor> doctors = doctorRepository.findByDepartmentId(department.getId());
    List<DoctorDTO> doctorDTOs =
        doctors.stream().map(this::toDoctorDTO).collect(Collectors.toList());

    return new DepartmentDTO(
        department.getId(), department.getName(), department.getDescription(), doctorDTOs);
  }

  private DoctorDTO toDoctorDTO(Doctor doctor) {
    return new DoctorDTO(
        doctor.getId(),
        doctor.getName(),
        doctor.getSpecialization(),
        doctor.getQualification(),
        doctor.getPhone());
  }

  private HospitalDetailDTO toDetailDTO(
      Hospital hospital, List<DepartmentDTO> departments, BedDTO beds) {
    return new HospitalDetailDTO(
        hospital.getId(),
        hospital.getName(),
        hospital.getAddress(),
        hospital.getLatitude(),
        hospital.getLongitude(),
        hospital.getPhone(),
        hospital.getEmail(),
        hospital.getEstablishedYear(),
        hospital.getRating(),
        hospital.getActive(),
        departments,
        beds,
        hospital.getCreatedAt(),
        hospital.getUpdatedAt());
  }
}
