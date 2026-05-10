package com.traveloop.dto.response;

import com.traveloop.entity.enums.PackingCategory;
import lombok.Builder;
import lombok.Data;

@Data @Builder
public class PackingItemResponse {
    private Long id;
    private String itemName;
    private PackingCategory category;
    private Boolean isPacked;
}
