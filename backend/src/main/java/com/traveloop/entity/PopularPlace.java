package com.traveloop.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "popular_places")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PopularPlace {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "state_name", nullable = false)
    private String stateName;

    @Column(name = "city_name", nullable = false)
    private String cityName;

    @Column(name = "place_name", nullable = false)
    private String placeName;

    @Column(nullable = false)
    private String category;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "image_url")
    private String imageUrl;
}
