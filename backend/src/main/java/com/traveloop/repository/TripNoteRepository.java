package com.traveloop.repository;

import com.traveloop.entity.TripNote;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TripNoteRepository extends JpaRepository<TripNote, Long> {
    List<TripNote> findByTripIdOrderByCreatedAtDesc(Long tripId);
    List<TripNote> findByTripStopId(Long tripStopId);
}
