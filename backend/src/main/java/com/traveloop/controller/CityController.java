package com.traveloop.controller;

import com.traveloop.dto.response.ActivityResponse;
import com.traveloop.dto.response.CityResponse;
import com.traveloop.service.ActivityService;
import com.traveloop.service.CityService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cities")
@RequiredArgsConstructor
@Tag(name = "Cities & Activities")
public class CityController {

    private final CityService cityService;
    private final ActivityService activityService;

    @GetMapping
    @Operation(summary = "Get all cities or search by query")
    public ResponseEntity<List<CityResponse>> getCities(
            @RequestParam(required = false) String q) {
        if (q != null && !q.isBlank()) return ResponseEntity.ok(cityService.searchCities(q));
        return ResponseEntity.ok(cityService.getAllCities());
    }

    @GetMapping("/popular")
    @Operation(summary = "Get top 10 popular cities")
    public ResponseEntity<List<CityResponse>> getPopular() {
        return ResponseEntity.ok(cityService.getPopularCities());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get city by ID")
    public ResponseEntity<CityResponse> getCity(@PathVariable Long id) {
        return ResponseEntity.ok(cityService.getById(id));
    }

    @GetMapping("/{cityId}/activities")
    @Operation(summary = "Get activities for a city")
    public ResponseEntity<List<ActivityResponse>> getActivities(
            @PathVariable Long cityId,
            @RequestParam(required = false) String category) {
        if (category != null)
            return ResponseEntity.ok(activityService.getByCityAndCategory(cityId, category));
        return ResponseEntity.ok(activityService.getByCityId(cityId));
    }

    @GetMapping("/activities/search")
    @Operation(summary = "Search activities by title")
    public ResponseEntity<List<ActivityResponse>> searchActivities(@RequestParam String q) {
        return ResponseEntity.ok(activityService.searchActivities(q));
    }
}
