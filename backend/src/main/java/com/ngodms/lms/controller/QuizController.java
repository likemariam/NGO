package com.ngodms.lms.controller;

import com.ngodms.common.response.ApiResponse;
import com.ngodms.lms.dto.QuizRequest;
import com.ngodms.lms.dto.QuizResultResponse;
import com.ngodms.lms.dto.QuizSubmissionRequest;
import com.ngodms.lms.model.Quiz;
import com.ngodms.lms.service.QuizService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quizzes")
@RequiredArgsConstructor
public class QuizController {

    private final QuizService quizService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Quiz>>> getAll() {
        return ResponseEntity.ok(ApiResponse.ok(quizService.findAll()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Quiz>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(quizService.findById(id)));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public ResponseEntity<ApiResponse<Quiz>> create(@Valid @RequestBody QuizRequest request) {
        return ResponseEntity.ok(ApiResponse.ok("Quiz created", quizService.create(request)));
    }

    @PostMapping("/{id}/submit")
    public ResponseEntity<ApiResponse<QuizResultResponse>> submit(
        @PathVariable Long id, @Valid @RequestBody QuizSubmissionRequest submission) {
        return ResponseEntity.ok(ApiResponse.ok("Quiz submitted", quizService.submit(id, submission)));
    }

    @GetMapping("/{id}/results")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER','MANAGER')")
    public ResponseEntity<ApiResponse<List<QuizResultResponse>>> getResults(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(quizService.getResults(id)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        quizService.delete(id);
        return ResponseEntity.ok(ApiResponse.ok("Quiz deleted", null));
    }
}
