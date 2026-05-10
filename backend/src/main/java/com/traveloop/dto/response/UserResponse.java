package com.traveloop.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data @Builder
public class UserResponse {
    private Long id;
    private String name;
    private String email;
    private String profilePhoto;
    private String bio;
    private LocalDateTime createdAt;
    private int totalTrips;
}
