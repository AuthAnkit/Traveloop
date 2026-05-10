package com.traveloop.service;

import com.traveloop.dto.response.ActivityResponse;
import com.traveloop.entity.Activity;
import com.traveloop.exception.ResourceNotFoundException;
import com.traveloop.repository.ActivityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ActivityService {

    private final ActivityRepository activityRepository;

    public List<ActivityResponse> getByCityId(Long cityId) {
        return activityRepository.findByCityId(cityId)
                .stream().map(this::mapToResponse).toList();
    }

    public List<ActivityResponse> getByCityAndCategory(Long cityId, String category) {
        return activityRepository.findByCityIdAndCategory(cityId, category)
                .stream().map(this::mapToResponse).toList();
    }

    public List<ActivityResponse> searchActivities(String title) {
        return activityRepository.findByTitleContainingIgnoreCase(title)
                .stream().map(this::mapToResponse).toList();
    }

    public Activity getEntityById(Long id) {
        return activityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Activity", id));
    }

    public ActivityResponse mapToResponse(Activity a) {
        return ActivityResponse.builder()
                .id(a.getId())
                .cityId(a.getCity() != null ? a.getCity().getId() : null)
                .cityName(a.getCity() != null ? a.getCity().getName() : null)
                .title(a.getTitle()).description(a.getDescription())
                .category(a.getCategory()).estimatedCost(a.getEstimatedCost())
                .durationHours(a.getDurationHours()).rating(a.getRating())
                .imageUrl(a.getImageUrl())
                .build();
    }
}
