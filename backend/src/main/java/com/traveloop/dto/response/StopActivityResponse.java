package com.traveloop.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalTime;

@Data @Builder
public class StopActivityResponse {
    private Long id;
    private ActivityResponse activity;
    private LocalTime scheduledTime;
    private String notes;
}
