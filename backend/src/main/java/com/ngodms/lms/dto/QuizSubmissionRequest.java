package com.ngodms.lms.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Map;

@Data
public class QuizSubmissionRequest {
    /** Map of quizQuestionId -> selected quizOptionId */
    @NotEmpty
    private Map<Long, Long> answers;

    @NotNull
    private Long userId;
}
