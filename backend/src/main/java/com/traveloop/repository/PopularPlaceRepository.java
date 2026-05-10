package com.traveloop.repository;

import com.traveloop.entity.PopularPlace;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PopularPlaceRepository extends JpaRepository<PopularPlace, Long> {
    List<PopularPlace> findByStateNameIgnoreCase(String stateName);
    List<PopularPlace> findByCityNameIgnoreCase(String cityName);
    List<PopularPlace> findByCityNameIgnoreCaseAndCategoryIgnoreCase(String cityName, String category);
}
