package com.traveloop.dto.request;

import com.traveloop.entity.enums.TripVisibility;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDate;

@Data
public class CreateTripRequest {
    @NotBlank
    private String title;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private String coverImage;
    private TripVisibility visibility = TripVisibility.PRIVATE;
}
