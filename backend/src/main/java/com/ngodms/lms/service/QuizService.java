package com.ngodms.lms.service;

import com.ngodms.common.exception.BadRequestException;
import com.ngodms.common.exception.ResourceNotFoundException;
import com.ngodms.lms.dto.QuizRequest;
import com.ngodms.lms.dto.QuizResultResponse;
import com.ngodms.lms.dto.QuizSubmissionRequest;
import com.ngodms.lms.model.Quiz;
import com.ngodms.lms.model.QuizOption;
import com.ngodms.lms.model.QuizQuestion;
import com.ngodms.lms.model.QuizResult;
import com.ngodms.lms.repository.QuizRepository;
import com.ngodms.lms.repository.QuizResultRepository;
import com.ngodms.user.model.User;
import com.ngodms.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class QuizService {

    private final QuizRepository quizRepository;
    private final QuizResultRepository quizResultRepository;
    private final UserRepository userRepository;

    public List<Quiz> findAll() {
        return quizRepository.findAllByOrderByCreatedAtDesc();
    }

    public Quiz findById(Long id) {
        return quizRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Quiz", id));
    }

    @Transactional
    public Quiz create(QuizRequest request) {
        Quiz quiz = Quiz.builder()
            .title(request.getTitle())
            .description(request.getDescription())
            .createdBy(currentUser())
            .build();

        List<QuizQuestion> questions = request.getQuestions().stream()
            .map(qd -> {
                QuizQuestion question = QuizQuestion.builder()
                    .quiz(quiz)
                    .question(qd.getQuestion())
                    .questionOrder(qd.getQuestionOrder())
                    .build();

                List<QuizOption> options = qd.getOptions().stream()
                    .map(od -> QuizOption.builder()
                        .quizQuestion(question)
                        .optionText(od.getOptionText())
                        .isCorrect(od.isCorrect())
                        .build())
                    .toList();
                question.setOptions(options);
                return question;
            })
            .toList();

        // Ensure exactly one correct answer per question
        questions.forEach(q -> {
            long correct = q.getOptions().stream().filter(QuizOption::isCorrect).count();
            if (correct != 1) {
                throw new BadRequestException("Question must have exactly one correct option: " + q.getQuestion());
            }
        });

        quiz.setQuestions(questions);
        return quizRepository.save(quiz);
    }

    @Transactional
    public QuizResultResponse submit(Long quizId, QuizSubmissionRequest submission) {
        Quiz quiz = findById(quizId);
        User user = userRepository.findById(submission.getUserId())
            .orElseThrow(() -> new ResourceNotFoundException("User", submission.getUserId()));

        Map<Long, Long> answers = submission.getAnswers();
        int score = 0;

        for (QuizQuestion question : quiz.getQuestions()) {
            Long selectedOptionId = answers.get(question.getId());
            if (selectedOptionId == null) continue;
            boolean correct = question.getOptions().stream()
                .anyMatch(o -> o.getId().equals(selectedOptionId) && o.isCorrect());
            if (correct) score++;
        }

        QuizResult result = QuizResult.builder()
            .quiz(quiz)
            .user(user)
            .score(score)
            .totalQuestions(quiz.getQuestions().size())
            .build();

        quizResultRepository.save(result);
        return QuizResultResponse.from(result);
    }

    public List<QuizResultResponse> getResults(Long quizId) {
        Quiz quiz = findById(quizId);
        return quizResultRepository.findByQuizOrderBySubmittedAtDesc(quiz).stream()
            .map(QuizResultResponse::from)
            .toList();
    }

    @Transactional
    public void delete(Long id) {
        quizRepository.delete(findById(id));
    }

    private User currentUser() {
        String email = org.springframework.security.core.context.SecurityContextHolder
            .getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
            .orElseThrow(() -> new ResourceNotFoundException("Current user not found", 0L));
    }
}
