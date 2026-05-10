package com.traveloop.service;

import com.traveloop.dto.response.CityResponse;
import com.traveloop.entity.City;
import com.traveloop.exception.ResourceNotFoundException;
import com.traveloop.repository.CityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CityService {

    private final CityRepository cityRepository;

    public List<CityResponse> searchCities(String query) {
        return cityRepository
                .findByNameContainingIgnoreCaseOrCountryContainingIgnoreCase(query, query)
                .stream().map(this::mapToResponse).toList();
    }

    public List<CityResponse> getPopularCities() {
        return cityRepository.findTop10ByOrderByPopularityScoreDesc()
                .stream().map(this::mapToResponse).toList();
    }

    public List<CityResponse> getAllCities() {
        return cityRepository.findAll().stream().map(this::mapToResponse).toList();
    }

    public CityResponse getById(Long id) {
        return mapToResponse(cityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("City", id)));
    }

    public City getEntityById(Long id) {
        return cityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("City", id));
    }

    public CityResponse mapToResponse(City city) {
        return CityResponse.builder()
                .id(city.getId()).name(city.getName()).country(city.getCountry())
                .countryCode(city.getCountryCode()).latitude(city.getLatitude())
                .longitude(city.getLongitude()).costIndex(city.getCostIndex())
                .imageUrl(city.getImageUrl()).popularityScore(city.getPopularityScore())
                .build();
    }
}
