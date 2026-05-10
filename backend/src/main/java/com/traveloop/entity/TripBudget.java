package com.traveloop.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "trip_budgets")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class TripBudget {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_id", nullable = false, unique = true)
    private Trip trip;

    @Builder.Default private Double hotelCost = 0.0;
    @Builder.Default private Double transportCost = 0.0;
    @Builder.Default private Double foodCost = 0.0;
    @Builder.Default private Double activityCost = 0.0;
    @Builder.Default private Double miscCost = 0.0;
    @Builder.Default private Double totalCost = 0.0;
    @Builder.Default private Double dailyAverage = 0.0;

    public void recalculate() {
        this.totalCost = hotelCost + transportCost + foodCost + activityCost + miscCost;
        if (trip != null && trip.getStartDate() != null && trip.getEndDate() != null) {
            long days = java.time.temporal.ChronoUnit.DAYS.between(trip.getStartDate(), trip.getEndDate());
            this.dailyAverage = days > 0 ? totalCost / days : totalCost;
        }
    }
}
