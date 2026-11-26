package com.ngodms.attendance.dto;

import lombok.Data;

@Data
public class CheckInRequest {
    private String location;
    private String notes;
}
