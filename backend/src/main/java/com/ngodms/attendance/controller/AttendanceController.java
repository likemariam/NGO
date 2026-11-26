package com.ngodms.attendance.controller;

import com.ngodms.attendance.dto.AttendanceReportResponse;
import com.ngodms.attendance.dto.AttendanceResponse;
import com.ngodms.attendance.dto.CheckInRequest;
import com.ngodms.attendance.dto.CheckOutRequest;
import com.ngodms.attendance.service.AttendanceService;
import com.ngodms.common.response.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@RequiredArgsConstructor
public class AttendanceController {

    private final AttendanceService attendanceService;

    @PostMapping("/check-in")
    public ResponseEntity<ApiResponse<AttendanceResponse>> checkIn(
        @Valid @RequestBody CheckInRequest request) {
        return ResponseEntity.ok(ApiResponse.ok("Checked in", attendanceService.checkIn(request)));
    }

    @PostMapping("/check-out")
    public ResponseEntity<ApiResponse<AttendanceResponse>> checkOut(
        @Valid @RequestBody CheckOutRequest request) {
        return ResponseEntity.ok(ApiResponse.ok("Checked out", attendanceService.checkOut(request)));
    }

    @PostMapping("/scan")
    public ResponseEntity<ApiResponse<AttendanceResponse>> scan(
        @Valid @RequestBody com.ngodms.attendance.dto.ScanRequest request) {
        AttendanceResponse result = attendanceService.scan(request);
        String msg = result.getCheckOutTime() != null
            ? String.format("Checked out %s at %s", result.getUserName(),
                result.getCheckOutTime().toLocalTime())
            : String.format("Checked in %s at %s", result.getUserName(),
                result.getCheckInTime().toLocalTime());
        return ResponseEntity.ok(ApiResponse.ok(msg, result));
    }

    @GetMapping("/my-history")
    public ResponseEntity<ApiResponse<List<AttendanceResponse>>> myHistory() {
        return ResponseEntity.ok(ApiResponse.ok(attendanceService.myHistory()));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public ResponseEntity<ApiResponse<List<AttendanceResponse>>> all() {
        return ResponseEntity.ok(ApiResponse.ok(attendanceService.all()));
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public ResponseEntity<ApiResponse<List<AttendanceResponse>>> forUser(@PathVariable Long userId) {
        return ResponseEntity.ok(ApiResponse.ok(attendanceService.allForUser(userId)));
    }

    @GetMapping("/reports")
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    public ResponseEntity<ApiResponse<AttendanceReportResponse>> report(
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to) {
        return ResponseEntity.ok(ApiResponse.ok(attendanceService.report(from, to)));
    }
}
