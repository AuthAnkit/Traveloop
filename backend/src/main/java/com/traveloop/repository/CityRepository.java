package com.traveloop.repository;

import com.traveloop.entity.City;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CityRepository extends JpaRepository<City, Long> {
    List<City> findByNameContainingIgnoreCaseOrCountryContainingIgnoreCase(String name, String country);
    List<City> findTop10ByOrderByPopularityScoreDesc();
}
