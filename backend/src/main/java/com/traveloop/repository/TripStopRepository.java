package com.traveloop.repository;

import com.traveloop.entity.TripStop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TripStopRepository extends JpaRepository<TripStop, Long> {
    List<TripStop> findByTripIdOrderByPositionAsc(Long tripId);

    @Query("SELECT COALESCE(MAX(ts.position), 0) FROM TripStop ts WHERE ts.trip.id = :tripId")
    int findMaxPositionByTripId(Long tripId);

    @Modifying
    @Query("UPDATE TripStop ts SET ts.position = :position WHERE ts.id = :id")
    void updatePosition(Long id, int position);
}
