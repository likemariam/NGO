package com.ngodms.attendance.repository;

import com.ngodms.attendance.model.Attendance;
import com.ngodms.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> findByUserOrderByCheckInTimeDesc(User user);

    @Query("SELECT a FROM Attendance a WHERE a.user = :user AND a.checkInTime >= :from AND a.checkInTime < :to")
    List<Attendance> findByUserAndDateRange(User user, LocalDateTime from, LocalDateTime to);

    Optional<Attendance> findTopByUserAndCheckOutTimeIsNullOrderByCheckInTimeDesc(User user);

    List<Attendance> findAllByOrderByCheckInTimeDesc();
}
