package com.ngodms.lms.dto;

import com.ngodms.lms.model.Material;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class MaterialResponse {
    private Long id;
    private String title;
    private String description;
    private String filePath;
    private String fileType;
    private Long fileSize;
    private String uploadedByName;
    private LocalDateTime createdAt;

    public static MaterialResponse from(Material m) {
        return MaterialResponse.builder()
            .id(m.getId())
            .title(m.getTitle())
            .description(m.getDescription())
            .filePath(m.getFilePath())
            .fileType(m.getFileType())
            .fileSize(m.getFileSize())
            .uploadedByName(m.getUploadedBy() != null
                ? m.getUploadedBy().getFirstName() + " " + m.getUploadedBy().getLastName() : null)
            .createdAt(m.getCreatedAt())
            .build();
    }
}
