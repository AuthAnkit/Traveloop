package com.traveloop.dto.response;

import lombok.Builder;
import lombok.Data;

@Data @Builder
public class BudgetResponse {
    private Long id;
    private Long tripId;
    private Double hotelCost;
    private Double transportCost;
    private Double foodCost;
    private Double activityCost;
    private Double miscCost;
    private Double totalCost;
    private Double dailyAverage;
}
