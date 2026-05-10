package com.traveloop.dto.response;

import lombok.Builder;
import lombok.Data;

@Data @Builder
public class SharedTripResponse {
    private Long id;
    private Long tripId;
    private String publicSlug;
    private Long views;
    private Long copiedCount;
    private String shareUrl;
}
