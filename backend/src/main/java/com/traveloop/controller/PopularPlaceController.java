package com.traveloop.controller;

import com.traveloop.dto.response.PopularPlaceResponse;
import com.traveloop.service.PopularPlaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/places")
@RequiredArgsConstructor
public class PopularPlaceController {

    private final PopularPlaceService popularPlaceService;

    @GetMapping("/state/{state}")
    public ResponseEntity<List<PopularPlaceResponse>> getPlacesByState(@PathVariable String state) {
        return ResponseEntity.ok(popularPlaceService.getPlacesByState(state));
    }

    @GetMapping("/city/{city}")
    public ResponseEntity<List<PopularPlaceResponse>> getPlacesByCity(@PathVariable String city) {
        return ResponseEntity.ok(popularPlaceService.getPlacesByCity(city));
    }

    @GetMapping("/recommended/{city}")
    public ResponseEntity<List<PopularPlaceResponse>> getRecommendedPlaces(@PathVariable String city) {
        return ResponseEntity.ok(popularPlaceService.getRecommendedPlaces(city));
    }
}
