package com.ngodms.project.controller;

import com.ngodms.common.response.ApiResponse;
import com.ngodms.project.dto.FundingResponse;
import com.ngodms.project.dto.ProjectResponse;
import com.ngodms.project.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ProjectResponse>>> getAll() {
        return ResponseEntity.ok(ApiResponse.ok(projectService.findAll()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProjectResponse>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(projectService.findById(id)));
    }

    @GetMapping("/{id}/fundings")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER','FUNDER')")
    public ResponseEntity<ApiResponse<List<FundingResponse>>> getProjectFundings(
        @PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(projectService.getFundingsForProject(id)));
    }

    @GetMapping("/my-fundings")
    @PreAuthorize("hasRole('FUNDER')")
    public ResponseEntity<ApiResponse<List<FundingResponse>>> myFundings() {
        return ResponseEntity.ok(ApiResponse.ok(projectService.getFundingsForCurrentFunder()));
    }
}
