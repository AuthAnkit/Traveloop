package com.traveloop.repository;

import com.traveloop.entity.Trip;
import com.traveloop.entity.enums.TripVisibility;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TripRepository extends JpaRepository<Trip, Long> {
    List<Trip> findByUserIdOrderByCreatedAtDesc(Long userId);
    List<Trip> findByVisibility(TripVisibility visibility);

    @Query("SELECT t FROM Trip t WHERE t.user.id = :userId ORDER BY t.createdAt DESC LIMIT 5")
    List<Trip> findTop5ByUserId(Long userId);
}
