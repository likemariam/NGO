package com.ngodms.lms.service;

import com.ngodms.common.exception.ResourceNotFoundException;
import com.ngodms.lms.dto.MaterialRequest;
import com.ngodms.lms.dto.MaterialResponse;
import com.ngodms.lms.model.Material;
import com.ngodms.lms.repository.MaterialRepository;
import com.ngodms.user.model.User;
import com.ngodms.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MaterialService {

    private final MaterialRepository materialRepository;
    private final FileStorageService fileStorageService;
    private final UserRepository userRepository;

    public List<MaterialResponse> findAll() {
        return materialRepository.findAllByOrderByCreatedAtDesc().stream()
            .map(MaterialResponse::from)
            .toList();
    }

    public List<MaterialResponse> findByType(String fileType) {
        return materialRepository.findByFileTypeOrderByCreatedAtDesc(fileType).stream()
            .map(MaterialResponse::from)
            .toList();
    }

    public MaterialResponse findById(Long id) {
        return materialRepository.findById(id)
            .map(MaterialResponse::from)
            .orElseThrow(() -> new ResourceNotFoundException("Material", id));
    }

    @Transactional
    public MaterialResponse upload(MaterialRequest request, MultipartFile file) {
        String storedName = fileStorageService.store(file);

        Material material = Material.builder()
            .title(request.getTitle())
            .description(request.getDescription())
            .filePath(storedName)
            .fileType(request.getFileType())
            .fileSize(file.getSize())
            .uploadedBy(currentUser())
            .build();

        return MaterialResponse.from(materialRepository.save(material));
    }

    @Transactional
    public MaterialResponse update(Long id, MaterialRequest request) {
        Material material = materialRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Material", id));

        material.setTitle(request.getTitle());
        material.setDescription(request.getDescription());
        return MaterialResponse.from(materialRepository.save(material));
    }

    @Transactional
    public void delete(Long id) {
        Material material = materialRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Material", id));
        fileStorageService.delete(material.getFilePath());
        materialRepository.delete(material);
    }

    public Material getEntity(Long id) {
        return materialRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Material", id));
    }

    private User currentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
            .orElseThrow(() -> new ResourceNotFoundException("Current user not found", 0L));
    }
}
