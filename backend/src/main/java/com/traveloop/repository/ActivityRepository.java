package com.traveloop.repository;

import com.traveloop.entity.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ActivityRepository extends JpaRepository<Activity, Long> {
    List<Activity> findByCityId(Long cityId);
    List<Activity> findByCityIdAndCategory(Long cityId, String category);
    List<Activity> findByTitleContainingIgnoreCase(String title);
}
