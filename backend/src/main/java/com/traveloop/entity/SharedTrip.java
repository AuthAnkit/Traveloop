package com.traveloop.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "shared_trips")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class SharedTrip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_id", nullable = false, unique = true)
    private Trip trip;

    @Column(nullable = false, unique = true)
    @Builder.Default
    private String publicSlug = UUID.randomUUID().toString();

    @Builder.Default
    private Long views = 0L;

    @Builder.Default
    private Long copiedCount = 0L;
}
