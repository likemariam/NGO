package com.ngodms.lms.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "questions")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "questionnaire_id", nullable = false)
    private Questionnaire questionnaire;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String questionText;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private QuestionType type;

    @Column(name = "question_order", nullable = false)
    private Integer questionOrder;

    /** Comma-separated options for MULTIPLE_CHOICE type */
    private String options;

    public enum QuestionType {
        TEXT, RATING, BOOLEAN, MULTIPLE_CHOICE
    }
}
