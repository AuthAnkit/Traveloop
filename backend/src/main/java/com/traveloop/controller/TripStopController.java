package com.traveloop.controller;

import com.traveloop.dto.request.AddStopActivityRequest;
import com.traveloop.dto.request.CreateTripStopRequest;
import com.traveloop.dto.request.ReorderStopsRequest;
import com.traveloop.dto.response.StopActivityResponse;
import com.traveloop.dto.response.TripStopResponse;
import com.traveloop.service.PopularPlaceService;
import com.traveloop.service.TripStopService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Tag(name = "Trip Stops & Activities")
public class TripStopController {

    private final TripStopService stopService;
    private final PopularPlaceService popularPlaceService;

    @GetMapping("/api/trips/{tripId}/stops")
    @Operation(summary = "Get all stops for a trip")
    public ResponseEntity<List<TripStopResponse>> getStops(@PathVariable Long tripId,
                                                            @AuthenticationPrincipal UserDetails user) {
        return ResponseEntity.ok(stopService.getStopsForTrip(tripId));
    }

    @PostMapping("/api/trips/{tripId}/stops")
    @Operation(summary = "Add a stop to a trip")
    public ResponseEntity<TripStopResponse> addStop(@PathVariable Long tripId,
                                                     @Valid @RequestBody CreateTripStopRequest req,
                                                     @AuthenticationPrincipal UserDetails user) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(stopService.addStop(tripId, req, user.getUsername()));
    }

    @PutMapping("/api/stops/{stopId}")
    @Operation(summary = "Update a stop")
    public ResponseEntity<TripStopResponse> updateStop(@PathVariable Long stopId,
                                                        @RequestBody CreateTripStopRequest req,
                                                        @AuthenticationPrincipal UserDetails user) {
        return ResponseEntity.ok(stopService.updateStop(stopId, req, user.getUsername()));
    }

    @DeleteMapping("/api/stops/{stopId}")
    @Operation(summary = "Delete a stop")
    public ResponseEntity<Void> deleteStop(@PathVariable Long stopId,
                                            @AuthenticationPrincipal UserDetails user) {
        stopService.deleteStop(stopId, user.getUsername());
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/api/trips/{tripId}/stops/reorder")
    @Operation(summary = "Reorder stops (drag-and-drop)")
    public ResponseEntity<Void> reorderStops(@PathVariable Long tripId,
                                              @RequestBody ReorderStopsRequest req,
                                              @AuthenticationPrincipal UserDetails user) {
        stopService.reorderStops(tripId, req, user.getUsername());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/api/stops/{stopId}/activities")
    @Operation(summary = "Add an activity to a stop")
    public ResponseEntity<StopActivityResponse> addActivity(@PathVariable Long stopId,
                                                             @Valid @RequestBody AddStopActivityRequest req,
                                                             @AuthenticationPrincipal UserDetails user) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(stopService.addActivity(stopId, req, user.getUsername()));
    }

    @DeleteMapping("/api/stop-activities/{id}")
    @Operation(summary = "Remove an activity from a stop")
    public ResponseEntity<Void> removeActivity(@PathVariable Long id,
                                                @AuthenticationPrincipal UserDetails user) {
        stopService.removeActivity(id, user.getUsername());
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/api/stops/{stopId}/activities/from-place/{placeId}")
    @Operation(summary = "Add an activity from a popular place")
    public ResponseEntity<StopActivityResponse> addActivityFromPlace(@PathVariable Long stopId,
                                                                     @PathVariable Long placeId,
                                                                     @AuthenticationPrincipal UserDetails user) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(stopService.addActivityFromPopularPlace(stopId, placeId, user.getUsername()));
    }
}
