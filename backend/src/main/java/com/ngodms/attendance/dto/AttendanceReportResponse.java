package com.ngodms.attendance.dto;

import lombok.Builder;
import lombok.Data;

import java.util.Map;

@Data
@Builder
public class AttendanceReportResponse {
    private String period;
    private int totalRecords;
    private int fullDays;
    private int partialDays;
    private double averageHours;
    private Map<String, Integer> perUserCounts;
}
