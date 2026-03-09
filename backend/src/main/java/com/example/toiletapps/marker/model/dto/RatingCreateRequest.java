package com.example.toiletapps.marker.model.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RatingCreateRequest {
    @Min(1)
    @Max(5)
    private Double value;
    private Long restroomId;
}
