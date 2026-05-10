package com.traveloop.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalTime;

@Data
public class AddStopActivityRequest {
    @NotNull
    private Long activityId;
    private LocalTime scheduledTime;
    private String notes;
}
