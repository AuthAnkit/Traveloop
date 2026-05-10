package com.traveloop.entity;

import com.traveloop.entity.enums.PackingCategory;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "packing_items")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class PackingItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_id", nullable = false)
    private Trip trip;

    @Column(nullable = false)
    private String itemName;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private PackingCategory category = PackingCategory.OTHER;

    @Builder.Default
    private Boolean isPacked = false;
}
