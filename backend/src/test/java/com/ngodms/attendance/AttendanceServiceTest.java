package com.ngodms.attendance;

import com.ngodms.attendance.repository.AttendanceRepository;
import com.ngodms.attendance.service.AttendanceService;
import com.ngodms.user.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AttendanceServiceTest {

    @Mock AttendanceRepository attendanceRepository;
    @Mock UserRepository userRepository;
    @InjectMocks AttendanceService attendanceService;

    @Test
    void all_returnsEmptyList_whenNoRecords() {
        when(attendanceRepository.findAllByOrderByCheckInTimeDesc()).thenReturn(List.of());
        assertThat(attendanceService.all()).isEmpty();
    }
}
