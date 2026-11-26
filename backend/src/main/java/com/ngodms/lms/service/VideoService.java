package com.ngodms.lms.service;

import com.ngodms.common.exception.ResourceNotFoundException;
import com.ngodms.lms.model.Video;
import com.ngodms.lms.repository.VideoRepository;
import com.ngodms.user.model.User;
import com.ngodms.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VideoService {

    private final VideoRepository videoRepository;
    private final UserRepository userRepository;

    public List<Video> findAll() {
        return videoRepository.findAllByOrderByCreatedAtDesc();
    }

    public Video findById(Long id) {
        return videoRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Video", id));
    }

    public Video create(Video video) {
        video.setUploadedBy(currentUser());
        return videoRepository.save(video);
    }

    public void delete(Long id) {
        videoRepository.delete(findById(id));
    }

    private User currentUser() {
        String email = org.springframework.security.core.context.SecurityContextHolder
            .getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
            .orElseThrow(() -> new ResourceNotFoundException("Current user not found", 0L));
    }
}
