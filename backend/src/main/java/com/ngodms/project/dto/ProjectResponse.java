package com.ngodms.project.dto;

import com.ngodms.project.model.Project;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
public class ProjectResponse {
    private Long id;
    private String name;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private String status;
    private LocalDateTime createdAt;

    public static ProjectResponse from(Project p) {
        return ProjectResponse.builder()
            .id(p.getId())
            .name(p.getName())
            .description(p.getDescription())
            .startDate(p.getStartDate())
            .endDate(p.getEndDate())
            .status(p.getStatus() != null ? p.getStatus().name() : null)
            .createdAt(p.getCreatedAt())
            .build();
    }
}
