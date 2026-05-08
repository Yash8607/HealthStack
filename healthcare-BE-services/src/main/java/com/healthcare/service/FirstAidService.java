package com.healthcare.service;

import com.healthcare.dto.FirstAidDTO;
import com.healthcare.entity.FirstAid;
import com.healthcare.repository.FirstAidRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FirstAidService {

  @Autowired private FirstAidRepository firstAidRepository;

  @Transactional(readOnly = true)
  public List<FirstAidDTO> getAll() {
    return firstAidRepository.findByPublishedTrue().stream()
        .map(this::toDTO)
        .collect(Collectors.toList());
  }

  @Transactional(readOnly = true)
  public List<FirstAidDTO> getByCategory(String category) {
    return firstAidRepository.findByCategoryAndPublishedTrue(category).stream()
        .map(this::toDTO)
        .collect(Collectors.toList());
  }

  private FirstAidDTO toDTO(FirstAid firstAid) {
    return new FirstAidDTO(
        firstAid.getId(),
        firstAid.getTitle(),
        firstAid.getDescription(),
        firstAid.getSteps(),
        firstAid.getPrecautions(),
        firstAid.getCategory(),
        firstAid.getPublished(),
        firstAid.getCreatedAt(),
        firstAid.getUpdatedAt()
    );
  }
}
