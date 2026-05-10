package com.traveloop.service;

import com.traveloop.dto.response.SharedTripResponse;
import com.traveloop.dto.response.TripResponse;
import com.traveloop.entity.SharedTrip;
import com.traveloop.entity.Trip;
import com.traveloop.exception.ResourceNotFoundException;
import com.traveloop.repository.SharedTripRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SharedTripService {

    private final SharedTripRepository sharedTripRepository;
    private final TripService tripService;

    @Transactional
    public SharedTripResponse shareTrip(Long tripId, String email) {
        Trip trip = tripService.findAndVerifyOwner(tripId, email);
        SharedTrip shared = sharedTripRepository.findByTripId(tripId)
                .orElseGet(() -> SharedTrip.builder().trip(trip).build());
        shared = sharedTripRepository.save(shared);
        return mapToResponse(shared);
    }

    @Transactional
    public TripResponse getSharedTrip(String slug) {
        SharedTrip shared = sharedTripRepository.findByPublicSlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Shared trip not found: " + slug));
        shared.setViews(shared.getViews() + 1);
        sharedTripRepository.save(shared);
        return tripService.mapToResponse(shared.getTrip());
    }

    @Transactional
    public void unshareTrip(Long tripId, String email) {
        tripService.findAndVerifyOwner(tripId, email);
        sharedTripRepository.findByTripId(tripId).ifPresent(sharedTripRepository::delete);
    }

    private SharedTripResponse mapToResponse(SharedTrip s) {
        return SharedTripResponse.builder()
                .id(s.getId()).tripId(s.getTrip().getId())
                .publicSlug(s.getPublicSlug())
                .views(s.getViews()).copiedCount(s.getCopiedCount())
                .shareUrl("/trip/" + s.getPublicSlug())
                .build();
    }
}
