package com.traveloop.dto.request;

import com.traveloop.entity.enums.PackingCategory;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreatePackingItemRequest {
    @NotBlank
    private String itemName;
    private PackingCategory category = PackingCategory.OTHER;
}
