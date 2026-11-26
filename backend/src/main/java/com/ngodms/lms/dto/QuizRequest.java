package com.ngodms.lms.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;

@Data
public class QuizRequest {
    @NotBlank
    private String title;

    private String description;

    @Valid
    @NotEmpty
    private List<QuestionDto> questions;

    @Data
    public static class QuestionDto {
        @NotBlank
        private String question;

        private int questionOrder;

        @Valid
        @NotEmpty
        private List<OptionDto> options;
    }

    @Data
    public static class OptionDto {
        @NotBlank
        private String optionText;

        private boolean isCorrect;
    }
}
