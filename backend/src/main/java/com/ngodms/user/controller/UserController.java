package com.ngodms.user.controller;

import com.ngodms.common.response.ApiResponse;
import com.ngodms.user.dto.ProfileUpdateRequest;
import com.ngodms.user.dto.UserRequest;
import com.ngodms.user.dto.UserResponse;
import com.ngodms.user.model.Role;
import com.ngodms.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // ── Profile (any authenticated user) ──────────────────────────────────

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<UserResponse>> myProfile() {
        return ResponseEntity.ok(ApiResponse.ok(userService.me()));
    }

    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<UserResponse>> updateProfile(
        @Valid @RequestBody ProfileUpdateRequest request) {
        return ResponseEntity.ok(ApiResponse.ok("Profile updated",
            userService.updateProfile(request)));
    }

    // ── User management (admin only) ──────────────────────────────────────

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<List<UserResponse>>> getAll(
        @RequestParam(required = false) Role role) {
        List<UserResponse> users = role != null
            ? userService.findByRole(role)
            : userService.findAll();
        return ResponseEntity.ok(ApiResponse.ok(users));
    }

    @GetMapping("/users/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public ResponseEntity<ApiResponse<UserResponse>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(userService.findById(id)));
    }

    @PostMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<UserResponse>> create(
        @Valid @RequestBody UserRequest request) {
        return ResponseEntity.ok(ApiResponse.ok("User created", userService.create(request)));
    }

    @PutMapping("/users/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<UserResponse>> update(
        @PathVariable Long id, @Valid @RequestBody UserRequest request) {
        return ResponseEntity.ok(ApiResponse.ok("User updated", userService.update(id, request)));
    }

    @PatchMapping("/users/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> setStatus(
        @PathVariable Long id, @RequestParam boolean enabled) {
        userService.setEnabled(id, enabled);
        return ResponseEntity.ok(ApiResponse.ok("User status updated", null));
    }

    @DeleteMapping("/users/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.ok(ApiResponse.ok("User deleted", null));
    }

    // ── Roles ─────────────────────────────────────────────────────────────

    @GetMapping("/roles")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Role[]>> getRoles() {
        return ResponseEntity.ok(ApiResponse.ok(Role.values()));
    }
}
