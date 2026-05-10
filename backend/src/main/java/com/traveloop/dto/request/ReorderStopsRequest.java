package com.traveloop.dto.request;

import lombok.Data;
import java.util.List;

@Data
public class ReorderStopsRequest {
    private List<Long> stopIds; // ordered list of stop IDs
}
