package com.traveloop.dto.response;

import com.traveloop.entity.enums.TripStatus;
import com.traveloop.entity.enums.TripVisibility;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data @Builder
public class TripResponse {
    private Long id;
    private Long userId;
    private String userName;
    private String title;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private String coverImage;
    private TripVisibility visibility;
    private TripStatus status;
    private LocalDateTime createdAt;
    private int stopCount;
    private List<TripStopResponse> stops;
    private BudgetResponse budget;
    private String publicSlug;
}
