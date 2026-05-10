package com.traveloop.dto.response;

import lombok.Builder;
import lombok.Data;

@Data @Builder
public class CityResponse {
    private Long id;
    private String name;
    private String country;
    private String countryCode;
    private Double latitude;
    private Double longitude;
    private Double costIndex;
    private String imageUrl;
    private Double popularityScore;
}
