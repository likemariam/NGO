package com.ngodms.attendance.service;

import com.ngodms.attendance.dto.AttendanceReportResponse;
import com.ngodms.attendance.dto.AttendanceResponse;
import com.ngodms.attendance.dto.CheckInRequest;
import com.ngodms.attendance.dto.CheckOutRequest;
import com.ngodms.attendance.model.Attendance;
import com.ngodms.attendance.repository.AttendanceRepository;
import com.ngodms.common.exception.BadRequestException;
import com.ngodms.common.exception.ResourceNotFoundException;
import com.ngodms.user.model.User;
import com.ngodms.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final UserRepository userRepository;

    @Transactional
    public AttendanceResponse checkIn(CheckInRequest request) {
        User user = currentUser();

        Optional<Attendance> open = attendanceRepository
            .findTopByUserAndCheckOutTimeIsNullOrderByCheckInTimeDesc(user);
        if (open.isPresent()) {
            throw new BadRequestException("Already checked in at " + open.get().getCheckInTime());
        }

        Attendance attendance = Attendance.builder()
            .user(user)
            .checkInTime(LocalDateTime.now())
            .location(request.getLocation())
            .notes(request.getNotes())
            .build();

        return AttendanceResponse.from(attendanceRepository.save(attendance));
    }

    @Transactional
    public AttendanceResponse checkOut(CheckOutRequest request) {
        User user = currentUser();

        Attendance attendance = attendanceRepository
            .findTopByUserAndCheckOutTimeIsNullOrderByCheckInTimeDesc(user)
            .orElseThrow(() -> new BadRequestException("No open check-in found"));

        attendance.setCheckOutTime(LocalDateTime.now());
        if (request.getNotes() != null) {
            attendance.setNotes(attendance.getNotes() == null
                ? request.getNotes()
                : attendance.getNotes() + " | " + request.getNotes());
        }

        return AttendanceResponse.from(attendanceRepository.save(attendance));
    }

    public List<AttendanceResponse> myHistory() {
        return attendanceRepository.findByUserOrderByCheckInTimeDesc(currentUser()).stream()
            .map(AttendanceResponse::from)
            .toList();
    }

    public List<AttendanceResponse> allForUser(Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User", userId));
        return attendanceRepository.findByUserOrderByCheckInTimeDesc(user).stream()
            .map(AttendanceResponse::from)
            .toList();
    }

    public List<AttendanceResponse> all() {
        return attendanceRepository.findAllByOrderByCheckInTimeDesc().stream()
            .map(AttendanceResponse::from)
            .toList();
    }

    public AttendanceReportResponse report(LocalDate from, LocalDate to) {
        LocalDateTime start = from.atStartOfDay();
        LocalDateTime end = to.plusDays(1).atStartOfDay();

        List<Attendance> records = attendanceRepository.findAllByOrderByCheckInTimeDesc().stream()
            .filter(a -> !a.getCheckInTime().isBefore(start) && a.getCheckInTime().isBefore(end))
            .toList();

        int fullDays = 0;
        int partialDays = 0;
        long totalMinutes = 0;
        Map<String, Integer> perUser = new HashMap<>();

        for (Attendance a : records) {
            String name = a.getUser().getFirstName() + " " + a.getUser().getLastName();
            perUser.merge(name, 1, Integer::sum);

            if (a.getCheckOutTime() != null) {
                long minutes = Duration.between(a.getCheckInTime(), a.getCheckOutTime()).toMinutes();
                totalMinutes += minutes;
                if (minutes >= 480) fullDays++;
                else partialDays++;
            } else {
                partialDays++;
            }
        }

        double avgHours = records.isEmpty() ? 0 : (totalMinutes / 60.0) / records.size();

        return AttendanceReportResponse.builder()
            .period(from + " to " + to)
            .totalRecords(records.size())
            .fullDays(fullDays)
            .partialDays(partialDays)
            .averageHours(Math.round(avgHours * 10) / 10.0)
            .perUserCounts(perUser)
            .build();
    }

    /**
     * Processes a QR or barcode scan.
     * QR format : NGODMS-{userId}-{email}
     * Barcode    : zero-padded userId (e.g. 00000001)
     *
     * Logic: if the user has an open check-in → check them out,
     *        otherwise → check them in.
     */
    @Transactional
    public AttendanceResponse scan(com.ngodms.attendance.dto.ScanRequest request) {
        // Parse userId from either format
        Long userId;
        try {
            String code = request.getQrCode().trim();
            if (code.startsWith("NGODMS-")) {
                // NGODMS-<userId>-<email>
                userId = Long.parseLong(code.split("-")[1]);
            } else {
                // barcode: padded number
                userId = Long.parseLong(code.replaceFirst("^0+(?!$)", ""));
            }
        } catch (NumberFormatException e) {
            throw new com.ngodms.common.exception.BadRequestException("Invalid QR/barcode format");
        }

        User user = userRepository.findById(userId)
            .orElseThrow(() -> new com.ngodms.common.exception.ResourceNotFoundException("User", userId));

        java.util.Optional<Attendance> open =
            attendanceRepository.findTopByUserAndCheckOutTimeIsNullOrderByCheckInTimeDesc(user);

        if (open.isPresent()) {
            // Check out
            Attendance a = open.get();
            a.setCheckOutTime(java.time.LocalDateTime.now());
            if (request.getLocation() != null) a.setLocation(request.getLocation());
            return AttendanceResponse.from(attendanceRepository.save(a));
        } else {
            // Check in
            Attendance a = Attendance.builder()
                .user(user)
                .checkInTime(java.time.LocalDateTime.now())
                .location(request.getLocation())
                .build();
            return AttendanceResponse.from(attendanceRepository.save(a));
        }
    }

    private User currentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
            .orElseThrow(() -> new ResourceNotFoundException("Current user not found", 0L));
    }
}
