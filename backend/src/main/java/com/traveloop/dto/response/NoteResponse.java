package com.traveloop.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data @Builder
public class NoteResponse {
    private Long id;
    private Long tripId;
    private Long tripStopId;
    private String title;
    private String content;
    private LocalDateTime createdAt;
}
