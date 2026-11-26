package com.ngodms.lms.controller;

import com.ngodms.common.response.ApiResponse;
import com.ngodms.lms.dto.QuestionnaireRequest;
import com.ngodms.lms.model.Questionnaire;
import com.ngodms.lms.service.QuestionnaireService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questionnaires")
@RequiredArgsConstructor
public class QuestionnaireController {

    private final QuestionnaireService questionnaireService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Questionnaire>>> getAll() {
        return ResponseEntity.ok(ApiResponse.ok(questionnaireService.findAll()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Questionnaire>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(questionnaireService.findById(id)));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER','MANAGER')")
    public ResponseEntity<ApiResponse<Questionnaire>> create(
        @Valid @RequestBody QuestionnaireRequest request) {
        return ResponseEntity.ok(ApiResponse.ok("Questionnaire created",
            questionnaireService.create(request)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER','MANAGER')")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        questionnaireService.delete(id);
        return ResponseEntity.ok(ApiResponse.ok("Questionnaire deleted", null));
    }
}
