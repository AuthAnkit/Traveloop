package com.traveloop.repository;

import com.traveloop.entity.AnalyticsEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Map;

public interface AnalyticsEventRepository extends JpaRepository<AnalyticsEvent, Long> {
    List<AnalyticsEvent> findByUserId(Long userId);
    List<AnalyticsEvent> findByEventType(String eventType);
    long countByEventType(String eventType);

    @Query("SELECT a.eventType, COUNT(a) FROM AnalyticsEvent a GROUP BY a.eventType")
    List<Object[]> countByEventTypeGrouped();
}
