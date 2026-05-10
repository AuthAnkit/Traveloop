package com.traveloop.service;

import com.traveloop.dto.request.AddStopActivityRequest;
import com.traveloop.dto.request.CreateTripStopRequest;
import com.traveloop.dto.request.ReorderStopsRequest;
import com.traveloop.dto.response.StopActivityResponse;
import com.traveloop.dto.response.TripStopResponse;
import com.traveloop.entity.*;
import com.traveloop.exception.ResourceNotFoundException;
import com.traveloop.repository.StopActivityRepository;
import com.traveloop.repository.TripStopRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TripStopService {

    private final TripStopRepository stopRepository;
    private final StopActivityRepository stopActivityRepository;
    private final TripService tripService;
    private final CityService cityService;
    private final ActivityService activityService;

    public List<TripStopResponse> getStopsForTrip(Long tripId) {
        return stopRepository.findByTripIdOrderByPositionAsc(tripId)
                .stream().map(this::mapToResponse).toList();
    }

    @Transactional
    public TripStopResponse addStop(Long tripId, CreateTripStopRequest req, String email) {
        Trip trip = tripService.findAndVerifyOwner(tripId, email);
        City city = cityService.getEntityById(req.getCityId());
        int maxPos = stopRepository.findMaxPositionByTripId(tripId);

        TripStop stop = TripStop.builder()
                .trip(trip).city(city)
                .arrivalDate(req.getArrivalDate())
                .departureDate(req.getDepartureDate())
                .position(maxPos + 1)
                .notes(req.getNotes())
                .build();
        return mapToResponse(stopRepository.save(stop));
    }

    @Transactional
    public TripStopResponse updateStop(Long stopId, CreateTripStopRequest req, String email) {
        TripStop stop = getEntityById(stopId);
        tripService.findAndVerifyOwner(stop.getTrip().getId(), email);
        if (req.getCityId() != null) stop.setCity(cityService.getEntityById(req.getCityId()));
        if (req.getArrivalDate() != null) stop.setArrivalDate(req.getArrivalDate());
        if (req.getDepartureDate() != null) stop.setDepartureDate(req.getDepartureDate());
        if (req.getNotes() != null) stop.setNotes(req.getNotes());
        return mapToResponse(stopRepository.save(stop));
    }

    @Transactional
    public void deleteStop(Long stopId, String email) {
        TripStop stop = getEntityById(stopId);
        tripService.findAndVerifyOwner(stop.getTrip().getId(), email);
        stopRepository.delete(stop);
    }

    @Transactional
    public void reorderStops(Long tripId, ReorderStopsRequest req, String email) {
        tripService.findAndVerifyOwner(tripId, email);
        List<Long> ids = req.getStopIds();
        for (int i = 0; i < ids.size(); i++) {
            stopRepository.updatePosition(ids.get(i), i + 1);
        }
    }

    @Transactional
    public StopActivityResponse addActivity(Long stopId, AddStopActivityRequest req, String email) {
        TripStop stop = getEntityById(stopId);
        tripService.findAndVerifyOwner(stop.getTrip().getId(), email);
        Activity activity = activityService.getEntityById(req.getActivityId());

        StopActivity sa = StopActivity.builder()
                .tripStop(stop).activity(activity)
                .scheduledTime(req.getScheduledTime())
                .notes(req.getNotes())
                .build();
        StopActivity saved = stopActivityRepository.save(sa);
        return StopActivityResponse.builder()
                .id(saved.getId())
                .activity(activityService.mapToResponse(activity))
                .scheduledTime(saved.getScheduledTime())
                .notes(saved.getNotes())
                .build();
    }

    @Transactional
    public void removeActivity(Long stopActivityId, String email) {
        StopActivity sa = stopActivityRepository.findById(stopActivityId)
                .orElseThrow(() -> new ResourceNotFoundException("StopActivity", stopActivityId));
        tripService.findAndVerifyOwner(sa.getTripStop().getTrip().getId(), email);
        stopActivityRepository.delete(sa);
    }

    public TripStop getEntityById(Long id) {
        return stopRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("TripStop", id));
    }

    private TripStopResponse mapToResponse(TripStop stop) {
        List<StopActivityResponse> activities = stop.getStopActivities().stream()
                .map(sa -> StopActivityResponse.builder()
                        .id(sa.getId())
                        .activity(activityService.mapToResponse(sa.getActivity()))
                        .scheduledTime(sa.getScheduledTime())
                        .notes(sa.getNotes())
                        .build())
                .toList();

        return TripStopResponse.builder()
                .id(stop.getId())
                .city(cityService.mapToResponse(stop.getCity()))
                .arrivalDate(stop.getArrivalDate())
                .departureDate(stop.getDepartureDate())
                .position(stop.getPosition())
                .notes(stop.getNotes())
                .activities(activities)
                .build();
    }
}
