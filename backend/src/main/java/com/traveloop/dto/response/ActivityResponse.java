package com.traveloop.dto.response;

import lombok.Builder;
import lombok.Data;

@Data @Builder
public class ActivityResponse {
    private Long id;
    private Long cityId;
    private String cityName;
    private String title;
    private String description;
    private String category;
    private Double estimatedCost;
    private Double durationHours;
    private Double rating;
    private String imageUrl;
}
