package com.traveloop.repository;

import com.traveloop.entity.StopActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface StopActivityRepository extends JpaRepository<StopActivity, Long> {
    List<StopActivity> findByTripStopId(Long tripStopId);
    void deleteByTripStopId(Long tripStopId);
}
