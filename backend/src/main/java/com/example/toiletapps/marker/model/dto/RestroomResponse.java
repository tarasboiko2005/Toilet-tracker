package com.example.toiletapps.marker.model.dto;

import com.example.toiletapps.marker.model.entity.RestroomStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RestroomResponse {
    private Long id;
    private String name;
    private Double averageRating;
    private RestroomStatus status;
    private Coordinates coordinates;
    private java.util.List<TagResponse> tags;
}
