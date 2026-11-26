package com.ngodms.project.dto;

import com.ngodms.project.model.Activity;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
public class ActivityResponse {
    private Long id;
    private Long projectId;
    private String projectName;
    private String fieldWorkerName;
    private String title;
    private String description;
    private LocalDate activityDate;
    private LocalDateTime createdAt;

    public static ActivityResponse from(Activity a) {
        return ActivityResponse.builder()
            .id(a.getId())
            .projectId(a.getProject().getId())
            .projectName(a.getProject().getName())
            .fieldWorkerName(a.getFieldWorker() != null
                ? a.getFieldWorker().getFirstName() + " " + a.getFieldWorker().getLastName() : null)
            .title(a.getTitle())
            .description(a.getDescription())
            .activityDate(a.getActivityDate())
            .createdAt(a.getCreatedAt())
            .build();
    }
}
