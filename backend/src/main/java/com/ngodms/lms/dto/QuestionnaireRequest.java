package com.ngodms.lms.dto;

import com.ngodms.lms.model.Question;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;

@Data
public class QuestionnaireRequest {
    @NotBlank
    private String title;

    private String description;

    @Valid
    @NotEmpty
    private List<QuestionDto> questions;

    @Data
    public static class QuestionDto {
        @NotBlank
        private String questionText;

        private Question.QuestionType type = Question.QuestionType.TEXT;

        private String options;

        private int questionOrder;
    }
}
