package com.traveloop.service;

import com.traveloop.dto.request.CreateTripRequest;
import com.traveloop.dto.response.*;
import com.traveloop.entity.*;
import com.traveloop.entity.enums.TripStatus;
import com.traveloop.entity.enums.TripVisibility;
import com.traveloop.exception.ResourceNotFoundException;
import com.traveloop.exception.UnauthorizedException;
import com.traveloop.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TripService {

    private final TripRepository tripRepository;
    private final UserRepository userRepository;
    private final TripBudgetRepository budgetRepository;
    private final SharedTripRepository sharedTripRepository;

    public List<TripResponse> getUserTrips(Long userId) {
        return tripRepository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream().map(this::mapToResponse).toList();
    }

    public TripResponse getTripById(Long tripId, String email) {
        Trip trip = findAndVerifyOwner(tripId, email);
        return mapToResponse(trip);
    }

    @Transactional
    public TripResponse createTrip(CreateTripRequest req, String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        Trip trip = Trip.builder()
                .user(user).title(req.getTitle()).description(req.getDescription())
                .startDate(req.getStartDate()).endDate(req.getEndDate())
                .coverImage(req.getCoverImage()).visibility(req.getVisibility())
                .status(TripStatus.PLANNED)
                .build();
        trip = tripRepository.save(trip);

        TripBudget budget = TripBudget.builder().trip(trip).build();
        budgetRepository.save(budget);
        trip.setBudget(budget);

        return mapToResponse(trip);
    }

    @Transactional
    public TripResponse updateTrip(Long tripId, CreateTripRequest req, String email) {
        Trip trip = findAndVerifyOwner(tripId, email);
        trip.setTitle(req.getTitle());
        if (req.getDescription() != null) trip.setDescription(req.getDescription());
        if (req.getStartDate() != null) trip.setStartDate(req.getStartDate());
        if (req.getEndDate() != null) trip.setEndDate(req.getEndDate());
        if (req.getCoverImage() != null) trip.setCoverImage(req.getCoverImage());
        if (req.getVisibility() != null) trip.setVisibility(req.getVisibility());
        return mapToResponse(tripRepository.save(trip));
    }

    @Transactional
    public TripResponse updateStatus(Long tripId, TripStatus status, String email) {
        Trip trip = findAndVerifyOwner(tripId, email);
        trip.setStatus(status);
        return mapToResponse(tripRepository.save(trip));
    }

    @Transactional
    public void deleteTrip(Long tripId, String email) {
        Trip trip = findAndVerifyOwner(tripId, email);
        tripRepository.delete(trip);
    }

    public List<TripResponse> getPublicTrips() {
        return tripRepository.findByVisibility(TripVisibility.PUBLIC)
                .stream().map(this::mapToResponse).toList();
    }

    public Trip findAndVerifyOwner(Long tripId, String email) {
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new ResourceNotFoundException("Trip", tripId));
        if (!trip.getUser().getEmail().equals(email)) {
            throw new UnauthorizedException("You don't own this trip");
        }
        return trip;
    }

    public Trip findById(Long tripId) {
        return tripRepository.findById(tripId)
                .orElseThrow(() -> new ResourceNotFoundException("Trip", tripId));
    }

    public TripResponse mapToResponse(Trip trip) {
        String slug = null;
        if (trip.getSharedTrip() != null) slug = trip.getSharedTrip().getPublicSlug();

        BudgetResponse budgetResp = null;
        if (trip.getBudget() != null) {
            TripBudget b = trip.getBudget();
            budgetResp = BudgetResponse.builder()
                    .id(b.getId()).tripId(trip.getId())
                    .hotelCost(b.getHotelCost()).transportCost(b.getTransportCost())
                    .foodCost(b.getFoodCost()).activityCost(b.getActivityCost())
                    .miscCost(b.getMiscCost()).totalCost(b.getTotalCost())
                    .dailyAverage(b.getDailyAverage())
                    .build();
        }

        List<TripStopResponse> stops = trip.getStops().stream()
                .map(this::mapStopToResponse).toList();

        return TripResponse.builder()
                .id(trip.getId()).userId(trip.getUser().getId())
                .userName(trip.getUser().getName())
                .title(trip.getTitle()).description(trip.getDescription())
                .startDate(trip.getStartDate()).endDate(trip.getEndDate())
                .coverImage(trip.getCoverImage()).visibility(trip.getVisibility())
                .status(trip.getStatus()).createdAt(trip.getCreatedAt())
                .stopCount(stops.size()).stops(stops)
                .budget(budgetResp).publicSlug(slug)
                .build();
    }

    private TripStopResponse mapStopToResponse(TripStop stop) {
        List<StopActivityResponse> activities = stop.getStopActivities().stream()
                .map(sa -> StopActivityResponse.builder()
                        .id(sa.getId())
                        .activity(ActivityResponse.builder()
                                .id(sa.getActivity().getId())
                                .title(sa.getActivity().getTitle())
                                .category(sa.getActivity().getCategory())
                                .estimatedCost(sa.getActivity().getEstimatedCost())
                                .durationHours(sa.getActivity().getDurationHours())
                                .rating(sa.getActivity().getRating())
                                .imageUrl(sa.getActivity().getImageUrl())
                                .build())
                        .scheduledTime(sa.getScheduledTime())
                        .notes(sa.getNotes())
                        .build())
                .toList();

        return TripStopResponse.builder()
                .id(stop.getId())
                .city(CityResponse.builder()
                        .id(stop.getCity().getId()).name(stop.getCity().getName())
                        .country(stop.getCity().getCountry())
                        .imageUrl(stop.getCity().getImageUrl())
                        .latitude(stop.getCity().getLatitude())
                        .longitude(stop.getCity().getLongitude())
                        .costIndex(stop.getCity().getCostIndex())
                        .build())
                .arrivalDate(stop.getArrivalDate())
                .departureDate(stop.getDepartureDate())
                .position(stop.getPosition())
                .notes(stop.getNotes())
                .activities(activities)
                .build();
    }
}
