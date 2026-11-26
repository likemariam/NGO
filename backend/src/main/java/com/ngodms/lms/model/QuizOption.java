package com.ngodms.lms.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "quiz_options")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuizOption {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quiz_question_id", nullable = false)
    private QuizQuestion quizQuestion;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String optionText;

    @Column(nullable = false)
    private boolean isCorrect;
}
