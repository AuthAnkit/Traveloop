package com.traveloop.controller;

import com.traveloop.dto.response.DashboardResponse;
import com.traveloop.dto.response.UserResponse;
import com.traveloop.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Tag(name = "Users")
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    @Operation(summary = "Get current user profile")
    public ResponseEntity<UserResponse> getProfile(@AuthenticationPrincipal UserDetails user) {
        return ResponseEntity.ok(userService.getProfile(user.getUsername()));
    }

    @PutMapping("/me")
    @Operation(summary = "Update current user profile")
    public ResponseEntity<UserResponse> updateProfile(
            @AuthenticationPrincipal UserDetails user,
            @RequestBody Map<String, String> updates) {
        return ResponseEntity.ok(userService.updateProfile(
                user.getUsername(),
                updates.get("name"),
                updates.get("bio"),
                updates.get("profilePhoto")
        ));
    }

    @GetMapping("/dashboard")
    @Operation(summary = "Get dashboard data")
    public ResponseEntity<DashboardResponse> getDashboard(@AuthenticationPrincipal UserDetails user) {
        return ResponseEntity.ok(userService.getDashboard(user.getUsername()));
    }
}
