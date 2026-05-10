package com.traveloop.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data @Builder
public class DashboardResponse {
    private int totalTrips;
    private int plannedTrips;
    private int completedTrips;
    private Double totalBudgetSpent;
    private List<TripResponse> recentTrips;
    private List<CityResponse> popularCities;
}
