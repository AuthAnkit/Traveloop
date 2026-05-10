package com.traveloop.controller;

import com.traveloop.dto.request.UpdateBudgetRequest;
import com.traveloop.dto.response.BudgetResponse;
import com.traveloop.service.BudgetService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/trips/{tripId}/budget")
@RequiredArgsConstructor
@Tag(name = "Budget")
public class BudgetController {

    private final BudgetService budgetService;

    @GetMapping
    @Operation(summary = "Get budget for a trip")
    public ResponseEntity<BudgetResponse> getBudget(@PathVariable Long tripId,
                                                     @AuthenticationPrincipal UserDetails user) {
        return ResponseEntity.ok(budgetService.getBudget(tripId, user.getUsername()));
    }

    @PutMapping
    @Operation(summary = "Update budget for a trip")
    public ResponseEntity<BudgetResponse> updateBudget(@PathVariable Long tripId,
                                                        @RequestBody UpdateBudgetRequest req,
                                                        @AuthenticationPrincipal UserDetails user) {
        return ResponseEntity.ok(budgetService.updateBudget(tripId, req, user.getUsername()));
    }
}
