package com.ngodms.user.dto;

import com.ngodms.user.model.User;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class UserResponse {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String role;
    private String phone;
    private String avatarUrl;
    private boolean enabled;
    private LocalDateTime createdAt;

    public static UserResponse from(User u) {
        return UserResponse.builder()
            .id(u.getId())
            .firstName(u.getFirstName())
            .lastName(u.getLastName())
            .email(u.getEmail())
            .role(u.getRole().name())
            .phone(u.getPhone())
            .avatarUrl(u.getAvatarUrl())
            .enabled(u.isEnabled())
            .createdAt(u.getCreatedAt())
            .build();
    }
}
