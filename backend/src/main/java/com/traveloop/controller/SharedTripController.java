package com.traveloop.controller;

import com.traveloop.dto.response.SharedTripResponse;
import com.traveloop.dto.response.TripResponse;
import com.traveloop.service.SharedTripService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Tag(name = "Shared Trips")
public class SharedTripController {

    private final SharedTripService sharedTripService;

    @PostMapping("/api/trips/{tripId}/share")
    @Operation(summary = "Generate a public share link for a trip")
    public ResponseEntity<SharedTripResponse> shareTrip(@PathVariable Long tripId,
                                                         @AuthenticationPrincipal UserDetails user) {
        return ResponseEntity.ok(sharedTripService.shareTrip(tripId, user.getUsername()));
    }

    @DeleteMapping("/api/trips/{tripId}/share")
    @Operation(summary = "Remove the public share link")
    public ResponseEntity<Void> unshareTrip(@PathVariable Long tripId,
                                             @AuthenticationPrincipal UserDetails user) {
        sharedTripService.unshareTrip(tripId, user.getUsername());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/api/shared/{slug}")
    @Operation(summary = "View a publicly shared trip (read-only)")
    public ResponseEntity<TripResponse> getSharedTrip(@PathVariable String slug) {
        return ResponseEntity.ok(sharedTripService.getSharedTrip(slug));
    }
}
