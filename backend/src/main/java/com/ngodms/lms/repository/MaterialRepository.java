package com.ngodms.lms.repository;

import com.ngodms.lms.model.Material;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MaterialRepository extends JpaRepository<Material, Long> {
    List<Material> findAllByOrderByCreatedAtDesc();
    List<Material> findByFileTypeOrderByCreatedAtDesc(String fileType);
}
