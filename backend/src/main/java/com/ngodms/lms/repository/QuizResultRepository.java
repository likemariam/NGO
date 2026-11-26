package com.ngodms.lms.repository;

import com.ngodms.lms.model.Quiz;
import com.ngodms.lms.model.QuizResult;
import com.ngodms.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface QuizResultRepository extends JpaRepository<QuizResult, Long> {
    List<QuizResult> findByUserOrderBySubmittedAtDesc(User user);
    List<QuizResult> findByQuizOrderBySubmittedAtDesc(Quiz quiz);
    Optional<QuizResult> findTopByUserAndQuizOrderBySubmittedAtDesc(User user, Quiz quiz);
}
