package com.ngodms.user.service;

import com.ngodms.common.exception.BadRequestException;
import com.ngodms.common.exception.ResourceNotFoundException;
import com.ngodms.user.dto.ProfileUpdateRequest;
import com.ngodms.user.dto.UserRequest;
import com.ngodms.user.dto.UserResponse;
import com.ngodms.user.model.Role;
import com.ngodms.user.model.User;
import com.ngodms.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public List<UserResponse> findAll() {
        return userRepository.findAll().stream().map(UserResponse::from).toList();
    }

    public List<UserResponse> findByRole(Role role) {
        return userRepository.findByRole(role).stream().map(UserResponse::from).toList();
    }

    public UserResponse findById(Long id) {
        return userRepository.findById(id).map(UserResponse::from)
            .orElseThrow(() -> new ResourceNotFoundException("User", id));
    }

    public UserResponse me() {
        return UserResponse.from(currentUser());
    }

    @Transactional
    public UserResponse create(UserRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already in use: " + request.getEmail());
        }

        User user = User.builder()
            .firstName(request.getFirstName())
            .lastName(request.getLastName())
            .email(request.getEmail())
            .password(passwordEncoder.encode(request.getPassword()))
            .role(request.getRole())
            .phone(request.getPhone())
            .build();

        return UserResponse.from(userRepository.save(user));
    }

    @Transactional
    public UserResponse update(Long id, UserRequest request) {
        User user = getUser(id);
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setRole(request.getRole());
        user.setPhone(request.getPhone());

        if (request.getPassword() != null && !request.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        return UserResponse.from(userRepository.save(user));
    }

    @Transactional
    public UserResponse updateProfile(ProfileUpdateRequest request) {
        User user = currentUser();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPhone(request.getPhone());
        if (request.getAvatarUrl() != null) {
            user.setAvatarUrl(request.getAvatarUrl());
        }
        return UserResponse.from(userRepository.save(user));
    }

    @Transactional
    public void setEnabled(Long id, boolean enabled) {
        User user = getUser(id);
        user.setEnabled(enabled);
        userRepository.save(user);
    }

    @Transactional
    public void delete(Long id) {
        User current = currentUser();
        if (current.getId().equals(id)) {
            throw new BadRequestException("You cannot delete your own account");
        }
        userRepository.delete(getUser(id));
    }

    private User getUser(Long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User", id));
    }

    private User currentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
            .orElseThrow(() -> new ResourceNotFoundException("Current user not found", 0L));
    }
}
