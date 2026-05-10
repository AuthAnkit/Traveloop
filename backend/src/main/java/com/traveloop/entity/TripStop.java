package com.traveloop.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "trip_stops")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class TripStop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_id", nullable = false)
    private Trip trip;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "city_id", nullable = false)
    private City city;

    private LocalDate arrivalDate;
    private LocalDate departureDate;

    @Column(nullable = false)
    private Integer position;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @OneToMany(mappedBy = "tripStop", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<StopActivity> stopActivities = new ArrayList<>();

    @OneToMany(mappedBy = "tripStop", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<TripNote> tripNotes = new ArrayList<>();
}
