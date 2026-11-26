package com.ngodms.project.dto;

import com.ngodms.project.model.Funding;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
public class FundingResponse {
    private Long id;
    private Long projectId;
    private String projectName;
    private String funderName;
    private BigDecimal amount;
    private LocalDate fundingDate;
    private String notes;

    public static FundingResponse from(Funding f) {
        return FundingResponse.builder()
            .id(f.getId())
            .projectId(f.getProject().getId())
            .projectName(f.getProject().getName())
            .funderName(f.getFunder() != null
                ? f.getFunder().getFirstName() + " " + f.getFunder().getLastName() : null)
            .amount(f.getAmount())
            .fundingDate(f.getFundingDate())
            .notes(f.getNotes())
            .build();
    }
}
