package com.traveloop.repository;

import com.traveloop.entity.PackingItem;
import com.traveloop.entity.enums.PackingCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PackingItemRepository extends JpaRepository<PackingItem, Long> {
    List<PackingItem> findByTripId(Long tripId);
    List<PackingItem> findByTripIdAndCategory(Long tripId, PackingCategory category);
    void deleteByTripId(Long tripId);
}
