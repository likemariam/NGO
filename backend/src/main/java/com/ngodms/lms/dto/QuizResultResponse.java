package com.ngodms.lms.dto;

import com.ngodms.lms.model.QuizResult;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class QuizResultResponse {
    private Long id;
    private Long quizId;
    private String quizTitle;
    private String userName;
    private Integer score;
    private Integer totalQuestions;
    private LocalDateTime submittedAt;

    public static QuizResultResponse from(QuizResult r) {
        return QuizResultResponse.builder()
            .id(r.getId())
            .quizId(r.getQuiz().getId())
            .quizTitle(r.getQuiz().getTitle())
            .userName(r.getUser().getFirstName() + " " + r.getUser().getLastName())
            .score(r.getScore())
            .totalQuestions(r.getTotalQuestions())
            .submittedAt(r.getSubmittedAt())
            .build();
    }
}
