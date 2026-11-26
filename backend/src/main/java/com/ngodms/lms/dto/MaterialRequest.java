package com.ngodms.lms.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class MaterialRequest {
    @NotBlank
    private String title;

    private String description;

    @NotBlank
    private String fileType;
}
