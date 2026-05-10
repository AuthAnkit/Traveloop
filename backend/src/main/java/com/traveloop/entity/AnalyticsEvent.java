package com.traveloop.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "analytics_events")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class AnalyticsEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String eventType;

    private Long userId;
    private Long tripId;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
