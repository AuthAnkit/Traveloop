package com.traveloop.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class CreateTripStopRequest {
    @NotNull
    private Long cityId;
    private LocalDate arrivalDate;
    private LocalDate departureDate;
    private String notes;
}
