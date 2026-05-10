package com.traveloop.repository;

import com.traveloop.entity.SharedTrip;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface SharedTripRepository extends JpaRepository<SharedTrip, Long> {
    Optional<SharedTrip> findByTripId(Long tripId);
    Optional<SharedTrip> findByPublicSlug(String slug);
}
