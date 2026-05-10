package com.traveloop.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PopularPlaceResponse {
    private Long id;
    private String stateName;
    private String cityName;
    private String placeName;
    private String category;
    private String description;
    private String imageUrl;
}
