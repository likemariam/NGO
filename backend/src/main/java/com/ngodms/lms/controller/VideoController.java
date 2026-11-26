package com.ngodms.lms.controller;

import com.ngodms.common.response.ApiResponse;
import com.ngodms.lms.model.Video;
import com.ngodms.lms.service.VideoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/videos")
@RequiredArgsConstructor
public class VideoController {

    private final VideoService videoService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Video>>> getAll() {
        return ResponseEntity.ok(ApiResponse.ok(videoService.findAll()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Video>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(videoService.findById(id)));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER','MANAGER')")
    public ResponseEntity<ApiResponse<Video>> create(@Valid @RequestBody Video video) {
        return ResponseEntity.ok(ApiResponse.ok("Video created", videoService.create(video)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','TEACHER','MANAGER')")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        videoService.delete(id);
        return ResponseEntity.ok(ApiResponse.ok("Video deleted", null));
    }
}
