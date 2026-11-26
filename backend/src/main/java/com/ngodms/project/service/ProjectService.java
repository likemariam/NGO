package com.ngodms.project.service;

import com.ngodms.common.exception.ResourceNotFoundException;
import com.ngodms.project.dto.ActivityResponse;
import com.ngodms.project.dto.FundingResponse;
import com.ngodms.project.dto.ProjectResponse;
import com.ngodms.project.model.Project;
import com.ngodms.project.repository.FundingRepository;
import com.ngodms.project.repository.ProjectRepository;
import com.ngodms.user.model.User;
import com.ngodms.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final FundingRepository fundingRepository;
    private final UserRepository userRepository;

    public List<ProjectResponse> findAll() {
        return projectRepository.findAllByOrderByCreatedAtDesc().stream()
            .map(ProjectResponse::from).toList();
    }

    public ProjectResponse findById(Long id) {
        return projectRepository.findById(id).map(ProjectResponse::from)
            .orElseThrow(() -> new ResourceNotFoundException("Project", id));
    }

    public List<FundingResponse> getFundingsForCurrentFunder() {
        User user = currentUser();
        return fundingRepository.findByFunderOrderByFundingDateDesc(user).stream()
            .map(FundingResponse::from).toList();
    }

    public List<FundingResponse> getFundingsForProject(Long projectId) {
        Project project = projectRepository.findById(projectId)
            .orElseThrow(() -> new ResourceNotFoundException("Project", projectId));
        return fundingRepository.findByProjectOrderByFundingDateDesc(project).stream()
            .map(FundingResponse::from).toList();
    }

    private User currentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
            .orElseThrow(() -> new ResourceNotFoundException("Current user not found", 0L));
    }
}
