package com.ngodms.project.repository;

import com.ngodms.project.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByStatusOrderByCreatedAtDesc(Project.ProjectStatus status);
    List<Project> findAllByOrderByCreatedAtDesc();
}
