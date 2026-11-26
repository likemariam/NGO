package com.ngodms.attendance.dto;

import com.ngodms.attendance.model.Attendance;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class AttendanceResponse {
    private Long id;
    private Long userId;
    private String userName;
    private LocalDateTime checkInTime;
    private LocalDateTime checkOutTime;
    private String location;
    private String notes;

    public static AttendanceResponse from(Attendance a) {
        return AttendanceResponse.builder()
            .id(a.getId())
            .userId(a.getUser().getId())
            .userName(a.getUser().getFirstName() + " " + a.getUser().getLastName())
            .checkInTime(a.getCheckInTime())
            .checkOutTime(a.getCheckOutTime())
            .location(a.getLocation())
            .notes(a.getNotes())
            .build();
    }
}
