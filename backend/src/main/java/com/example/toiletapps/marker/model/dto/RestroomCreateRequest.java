package com.example.toiletapps.marker.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RestroomCreateRequest {
    private String name;
    private String address;
    private Double latitude;
    private Double longitude;
    private String status;
}
