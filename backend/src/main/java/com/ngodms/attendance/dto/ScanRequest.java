package com.ngodms.attendance.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ScanRequest {
    /** QR content: NGODMS-<userId>-<email>  or plain userId barcode */
    @NotBlank
    private String qrCode;

    private String location;
}
