package com.traveloop.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalTime;

@Entity
@Table(name = "stop_activities")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class StopActivity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_stop_id", nullable = false)
    private TripStop tripStop;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "activity_id", nullable = false)
    private Activity activity;

    private LocalTime scheduledTime;

    @Column(columnDefinition = "TEXT")
    private String notes;
}
