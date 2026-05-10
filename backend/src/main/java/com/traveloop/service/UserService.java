package com.traveloop.service;

import com.traveloop.dto.response.DashboardResponse;
import com.traveloop.dto.response.TripResponse;
import com.traveloop.dto.response.UserResponse;
import com.traveloop.entity.User;
import com.traveloop.exception.ResourceNotFoundException;
import com.traveloop.repository.TripRepository;
import com.traveloop.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final TripRepository tripRepository;
    private final TripService tripService;
    private final CityService cityService;

    public User getByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", null));
    }

    public UserResponse getProfile(String email) {
        User user = getByEmail(email);
        int total = tripRepository.findByUserIdOrderByCreatedAtDesc(user.getId()).size();
        return UserResponse.builder()
                .id(user.getId()).name(user.getName()).email(user.getEmail())
                .profilePhoto(user.getProfilePhoto()).bio(user.getBio())
                .createdAt(user.getCreatedAt()).totalTrips(total)
                .build();
    }

    public UserResponse updateProfile(String email, String name, String bio, String profilePhoto) {
        User user = getByEmail(email);
        if (name != null) user.setName(name);
        if (bio != null) user.setBio(bio);
        if (profilePhoto != null) user.setProfilePhoto(profilePhoto);
        userRepository.save(user);
        return getProfile(email);
    }

    public DashboardResponse getDashboard(String email) {
        User user = getByEmail(email);
        List<TripResponse> all = tripService.getUserTrips(user.getId());
        List<TripResponse> recent = tripRepository.findTop5ByUserId(user.getId())
                .stream().map(tripService::mapToResponse).toList();

        long planned = all.stream().filter(t -> "PLANNED".equals(t.getStatus().name())).count();
        long completed = all.stream().filter(t -> "COMPLETED".equals(t.getStatus().name())).count();
        double spent = all.stream()
                .filter(t -> t.getBudget() != null)
                .mapToDouble(t -> t.getBudget().getTotalCost()).sum();

        return DashboardResponse.builder()
                .totalTrips(all.size())
                .plannedTrips((int) planned)
                .completedTrips((int) completed)
                .totalBudgetSpent(spent)
                .recentTrips(recent)
                .popularCities(cityService.getPopularCities())
                .build();
    }
}
