package com.ngodms.lms.repository;

import com.ngodms.lms.model.Questionnaire;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionnaireRepository extends JpaRepository<Questionnaire, Long> {
    List<Questionnaire> findAllByOrderByCreatedAtDesc();
}
