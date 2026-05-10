package com.traveloop.service;

import com.traveloop.dto.request.UpdateBudgetRequest;
import com.traveloop.dto.response.BudgetResponse;
import com.traveloop.entity.Trip;
import com.traveloop.entity.TripBudget;
import com.traveloop.exception.ResourceNotFoundException;
import com.traveloop.repository.TripBudgetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class BudgetService {

    private final TripBudgetRepository budgetRepository;
    private final TripService tripService;

    public BudgetResponse getBudget(Long tripId, String email) {
        tripService.findAndVerifyOwner(tripId, email);
        TripBudget budget = budgetRepository.findByTripId(tripId)
                .orElseThrow(() -> new ResourceNotFoundException("Budget for trip", tripId));
        return mapToResponse(budget);
    }

    @Transactional
    public BudgetResponse updateBudget(Long tripId, UpdateBudgetRequest req, String email) {
        Trip trip = tripService.findAndVerifyOwner(tripId, email);
        TripBudget budget = budgetRepository.findByTripId(tripId)
                .orElseGet(() -> TripBudget.builder().trip(trip).build());

        if (req.getHotelCost() != null) budget.setHotelCost(req.getHotelCost());
        if (req.getTransportCost() != null) budget.setTransportCost(req.getTransportCost());
        if (req.getFoodCost() != null) budget.setFoodCost(req.getFoodCost());
        if (req.getActivityCost() != null) budget.setActivityCost(req.getActivityCost());
        if (req.getMiscCost() != null) budget.setMiscCost(req.getMiscCost());
        budget.recalculate();

        return mapToResponse(budgetRepository.save(budget));
    }

    private BudgetResponse mapToResponse(TripBudget b) {
        return BudgetResponse.builder()
                .id(b.getId()).tripId(b.getTrip().getId())
                .hotelCost(b.getHotelCost()).transportCost(b.getTransportCost())
                .foodCost(b.getFoodCost()).activityCost(b.getActivityCost())
                .miscCost(b.getMiscCost()).totalCost(b.getTotalCost())
                .dailyAverage(b.getDailyAverage())
                .build();
    }
}
