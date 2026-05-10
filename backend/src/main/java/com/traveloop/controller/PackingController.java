package com.traveloop.controller;

import com.traveloop.dto.request.CreatePackingItemRequest;
import com.traveloop.dto.response.PackingItemResponse;
import com.traveloop.service.PackingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trips/{tripId}/packing")
@RequiredArgsConstructor
@Tag(name = "Packing")
public class PackingController {

    private final PackingService packingService;

    @GetMapping
    @Operation(summary = "Get packing list for a trip")
    public ResponseEntity<List<PackingItemResponse>> getItems(@PathVariable Long tripId,
                                                               @AuthenticationPrincipal UserDetails user) {
        return ResponseEntity.ok(packingService.getItems(tripId, user.getUsername()));
    }

    @PostMapping
    @Operation(summary = "Add a packing item")
    public ResponseEntity<PackingItemResponse> addItem(@PathVariable Long tripId,
                                                        @Valid @RequestBody CreatePackingItemRequest req,
                                                        @AuthenticationPrincipal UserDetails user) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(packingService.addItem(tripId, req, user.getUsername()));
    }

    @PatchMapping("/items/{itemId}/toggle")
    @Operation(summary = "Toggle packed status")
    public ResponseEntity<PackingItemResponse> togglePacked(@PathVariable Long tripId,
                                                             @PathVariable Long itemId,
                                                             @AuthenticationPrincipal UserDetails user) {
        return ResponseEntity.ok(packingService.togglePacked(itemId, user.getUsername()));
    }

    @DeleteMapping("/items/{itemId}")
    @Operation(summary = "Delete a packing item")
    public ResponseEntity<Void> deleteItem(@PathVariable Long tripId,
                                            @PathVariable Long itemId,
                                            @AuthenticationPrincipal UserDetails user) {
        packingService.deleteItem(itemId, user.getUsername());
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/reset")
    @Operation(summary = "Reset all packed statuses")
    public ResponseEntity<Void> resetChecklist(@PathVariable Long tripId,
                                                @AuthenticationPrincipal UserDetails user) {
        packingService.resetChecklist(tripId, user.getUsername());
        return ResponseEntity.ok().build();
    }
}
