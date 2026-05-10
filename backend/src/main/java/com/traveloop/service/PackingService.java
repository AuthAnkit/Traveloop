package com.traveloop.service;

import com.traveloop.dto.request.CreatePackingItemRequest;
import com.traveloop.dto.response.PackingItemResponse;
import com.traveloop.entity.PackingItem;
import com.traveloop.entity.Trip;
import com.traveloop.exception.ResourceNotFoundException;
import com.traveloop.exception.UnauthorizedException;
import com.traveloop.repository.PackingItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PackingService {

    private final PackingItemRepository packingRepository;
    private final TripService tripService;

    public List<PackingItemResponse> getItems(Long tripId, String email) {
        tripService.findAndVerifyOwner(tripId, email);
        return packingRepository.findByTripId(tripId).stream().map(this::mapToResponse).toList();
    }

    @Transactional
    public PackingItemResponse addItem(Long tripId, CreatePackingItemRequest req, String email) {
        Trip trip = tripService.findAndVerifyOwner(tripId, email);
        PackingItem item = PackingItem.builder()
                .trip(trip).itemName(req.getItemName()).category(req.getCategory())
                .isPacked(false).build();
        return mapToResponse(packingRepository.save(item));
    }

    @Transactional
    public PackingItemResponse togglePacked(Long itemId, String email) {
        PackingItem item = getEntityById(itemId);
        verifyOwner(item, email);
        item.setIsPacked(!item.getIsPacked());
        return mapToResponse(packingRepository.save(item));
    }

    @Transactional
    public void deleteItem(Long itemId, String email) {
        PackingItem item = getEntityById(itemId);
        verifyOwner(item, email);
        packingRepository.delete(item);
    }

    @Transactional
    public void resetChecklist(Long tripId, String email) {
        tripService.findAndVerifyOwner(tripId, email);
        List<PackingItem> items = packingRepository.findByTripId(tripId);
        items.forEach(i -> i.setIsPacked(false));
        packingRepository.saveAll(items);
    }

    private void verifyOwner(PackingItem item, String email) {
        if (!item.getTrip().getUser().getEmail().equals(email)) {
            throw new UnauthorizedException("Not your packing item");
        }
    }

    private PackingItem getEntityById(Long id) {
        return packingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("PackingItem", id));
    }

    private PackingItemResponse mapToResponse(PackingItem item) {
        return PackingItemResponse.builder()
                .id(item.getId()).itemName(item.getItemName())
                .category(item.getCategory()).isPacked(item.getIsPacked())
                .build();
    }
}
