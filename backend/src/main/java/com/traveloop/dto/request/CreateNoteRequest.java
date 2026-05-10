package com.traveloop.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateNoteRequest {
    @NotBlank
    private String title;
    private String content;
    private Long tripStopId;
}
