package com.traveloop.service;

import com.traveloop.dto.response.PopularPlaceResponse;
import com.traveloop.entity.PopularPlace;
import com.traveloop.repository.PopularPlaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PopularPlaceService {

    private final PopularPlaceRepository popularPlaceRepository;

    public List<PopularPlaceResponse> getPlacesByState(String stateName) {
        return popularPlaceRepository.findByStateNameIgnoreCase(stateName)
                .stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    public List<PopularPlaceResponse> getPlacesByCity(String cityName) {
        return popularPlaceRepository.findByCityNameIgnoreCase(cityName)
                .stream().map(this::mapToResponse).collect(Collectors.toList());
    }
    
    public List<PopularPlaceResponse> getRecommendedPlaces(String cityName) {
        // Here we could implement more complex logic (e.g. based on user preferences)
        // For now, returning top places in the city (all of them or limit to top 10)
        return popularPlaceRepository.findByCityNameIgnoreCase(cityName)
                .stream().limit(10).map(this::mapToResponse).collect(Collectors.toList());
    }

    private PopularPlaceResponse mapToResponse(PopularPlace place) {
        return PopularPlaceResponse.builder()
                .id(place.getId())
                .stateName(place.getStateName())
                .cityName(place.getCityName())
                .placeName(place.getPlaceName())
                .category(place.getCategory())
                .description(place.getDescription())
                .imageUrl(place.getImageUrl())
                .build();
    }
}
