package com.ngodms.lms.controller;

import com.ngodms.common.response.ApiResponse;
import com.ngodms.lms.dto.MaterialRequest;
import com.ngodms.lms.dto.MaterialResponse;
import com.ngodms.lms.model.Material;
import com.ngodms.lms.service.MaterialService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/materials")
@RequiredArgsConstructor
public class MaterialController {

    private final MaterialService materialService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<MaterialResponse>>> getAll(
        @RequestParam(required = false) String type) {
        List<MaterialResponse> materials = type != null
            ? materialService.findByType(type)
            : materialService.findAll();
        return ResponseEntity.ok(ApiResponse.ok(materials));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<MaterialResponse>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(materialService.findById(id)));
    }

    @GetMapping("/{id}/download")
    public ResponseEntity<Resource> download(@PathVariable Long id) {
        Material material = materialService.getEntity(id);
        Resource resource = new FileSystemResource(
            Paths.get("uploads/learning-materials").resolve(material.getFilePath()));

        return ResponseEntity.ok()
            .contentType(MediaType.APPLICATION_OCTET_STREAM)
            .header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\"" + material.getTitle() + "\"")
            .body(resource);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER','MANAGER')")
    public ResponseEntity<ApiResponse<MaterialResponse>> upload(
        @RequestPart("meta") @Valid MaterialRequest request,
        @RequestPart("file") MultipartFile file) {
        return ResponseEntity.ok(ApiResponse.ok("Material uploaded",
            materialService.upload(request, file)));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER','MANAGER')")
    public ResponseEntity<ApiResponse<MaterialResponse>> update(
        @PathVariable Long id, @RequestBody @Valid MaterialRequest request) {
        return ResponseEntity.ok(ApiResponse.ok("Material updated",
            materialService.update(id, request)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER','MANAGER')")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        materialService.delete(id);
        return ResponseEntity.ok(ApiResponse.ok("Material deleted", null));
    }
}
