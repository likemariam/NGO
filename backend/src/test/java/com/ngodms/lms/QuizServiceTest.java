package com.ngodms.lms;

import com.ngodms.lms.repository.QuizRepository;
import com.ngodms.lms.repository.QuizResultRepository;
import com.ngodms.lms.service.QuizService;
import com.ngodms.user.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class QuizServiceTest {

    @Mock QuizRepository quizRepository;
    @Mock QuizResultRepository quizResultRepository;
    @Mock UserRepository userRepository;
    @InjectMocks QuizService quizService;

    @Test
    void findAll_returnsEmptyList_whenNoQuizzes() {
        when(quizRepository.findAllByOrderByCreatedAtDesc()).thenReturn(List.of());
        assertThat(quizService.findAll()).isEmpty();
    }
}
