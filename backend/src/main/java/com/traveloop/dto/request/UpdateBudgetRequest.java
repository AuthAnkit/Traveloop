package com.traveloop.dto.request;

import lombok.Data;

@Data
public class UpdateBudgetRequest {
    private Double hotelCost;
    private Double transportCost;
    private Double foodCost;
    private Double activityCost;
    private Double miscCost;
}
