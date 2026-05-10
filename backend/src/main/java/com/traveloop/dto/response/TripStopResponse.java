package com.traveloop.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data @Builder
public class TripStopResponse {
    private Long id;
    private CityResponse city;
    private LocalDate arrivalDate;
    private LocalDate departureDate;
    private Integer position;
    private String notes;
    private List<StopActivityResponse> activities;
}
