package com.traveloop.controller;

import com.traveloop.dto.request.CreateTripRequest;
import com.traveloop.dto.response.TripResponse;
import com.traveloop.entity.enums.TripStatus;
import com.traveloop.service.TripService;
import com.traveloop.service.UserService;
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
import java.util.Map;

@RestController
@RequestMapping("/api/trips")
@RequiredArgsConstructor
@Tag(name = "Trips")
public class TripController {

    private final TripService tripService;
    private final UserService userService;

    @GetMapping
    @Operation(summary = "Get all trips for current user")
    public ResponseEntity<List<TripResponse>> getMyTrips(@AuthenticationPrincipal UserDetails user) {
        Long userId = userService.getByEmail(user.getUsername()).getId();
        return ResponseEntity.ok(tripService.getUserTrips(userId));
    }

    @GetMapping("/public")
    @Operation(summary = "Get all public trips")
    public ResponseEntity<List<TripResponse>> getPublicTrips() {
        return ResponseEntity.ok(tripService.getPublicTrips());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a trip by ID")
    public ResponseEntity<TripResponse> getTrip(@PathVariable Long id,
                                                 @AuthenticationPrincipal UserDetails user) {
        return ResponseEntity.ok(tripService.getTripById(id, user.getUsername()));
    }

    @PostMapping
    @Operation(summary = "Create a new trip")
    public ResponseEntity<TripResponse> createTrip(@Valid @RequestBody CreateTripRequest req,
                                                    @AuthenticationPrincipal UserDetails user) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(tripService.createTrip(req, user.getUsername()));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a trip")
    public ResponseEntity<TripResponse> updateTrip(@PathVariable Long id,
                                                    @Valid @RequestBody CreateTripRequest req,
                                                    @AuthenticationPrincipal UserDetails user) {
        return ResponseEntity.ok(tripService.updateTrip(id, req, user.getUsername()));
    }

    @PatchMapping("/{id}/status")
    @Operation(summary = "Update trip status")
    public ResponseEntity<TripResponse> updateStatus(@PathVariable Long id,
                                                      @RequestBody Map<String, String> body,
                                                      @AuthenticationPrincipal UserDetails user) {
        TripStatus status = TripStatus.valueOf(body.get("status").toUpperCase());
        return ResponseEntity.ok(tripService.updateStatus(id, status, user.getUsername()));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a trip")
    public ResponseEntity<Void> deleteTrip(@PathVariable Long id,
                                            @AuthenticationPrincipal UserDetails user) {
        tripService.deleteTrip(id, user.getUsername());
        return ResponseEntity.noContent().build();
    }
}
