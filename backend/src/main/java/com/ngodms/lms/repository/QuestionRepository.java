package com.ngodms.lms.repository;

import com.ngodms.lms.model.Question;
import com.ngodms.lms.model.Questionnaire;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByQuestionnaireOrderByQuestionOrderAsc(Questionnaire questionnaire);
    void deleteByQuestionnaire(Questionnaire questionnaire);
}
