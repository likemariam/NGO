package com.ngodms.lms.service;

import com.ngodms.common.exception.ResourceNotFoundException;
import com.ngodms.lms.dto.QuestionnaireRequest;
import com.ngodms.lms.model.Question;
import com.ngodms.lms.model.Questionnaire;
import com.ngodms.lms.repository.QuestionnaireRepository;
import com.ngodms.lms.repository.QuestionRepository;
import com.ngodms.user.model.User;
import com.ngodms.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionnaireService {

    private final QuestionnaireRepository questionnaireRepository;
    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;

    public List<Questionnaire> findAll() {
        return questionnaireRepository.findAllByOrderByCreatedAtDesc();
    }

    public Questionnaire findById(Long id) {
        return questionnaireRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Questionnaire", id));
    }

    @Transactional
    public Questionnaire create(QuestionnaireRequest request) {
        Questionnaire questionnaire = Questionnaire.builder()
            .title(request.getTitle())
            .description(request.getDescription())
            .createdBy(currentUser())
            .build();

        List<Question> questions = request.getQuestions().stream()
            .map(q -> Question.builder()
                .questionnaire(questionnaire)
                .questionText(q.getQuestionText())
                .type(q.getType())
                .options(q.getOptions())
                .questionOrder(q.getQuestionOrder())
                .build())
            .toList();

        questionnaire.setQuestions(questions);
        return questionnaireRepository.save(questionnaire);
    }

    @Transactional
    public void delete(Long id) {
        questionnaireRepository.delete(findById(id));
    }

    private User currentUser() {
        String email = org.springframework.security.core.context.SecurityContextHolder
            .getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
            .orElseThrow(() -> new ResourceNotFoundException("Current user not found", 0L));
    }
}
