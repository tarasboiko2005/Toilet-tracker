package com.example.toiletapps.marker.usecase;

import com.example.toiletapps.marker.model.dto.RestroomResponse;

import java.util.List;

public interface RestroomGetUseCase {
    List<RestroomResponse> getRestrooms();
    List<RestroomResponse> getUnverifiedRestrooms();
}
