package com.example.toiletapps.marker.usecase.impl;

import com.example.toiletapps.marker.mapper.RestroomMapper;
import com.example.toiletapps.marker.model.dto.RestroomResponse;
import com.example.toiletapps.marker.model.entity.Restroom;
import com.example.toiletapps.marker.service.RestroomService;
import com.example.toiletapps.marker.usecase.RestroomGetUseCase;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class RestroomGetUseCaseImpl implements RestroomGetUseCase {
    private final RestroomService restroomService;
    private final RestroomMapper restroomMapper;

    public RestroomGetUseCaseImpl(RestroomService restroomService,
                                  RestroomMapper restroomMapper) {
        this.restroomService = restroomService;
        this.restroomMapper = restroomMapper;
    }

    @Override
    public List<RestroomResponse> getRestrooms() {
        List<Restroom> restrooms = restroomService.getRestrooms();

        return restrooms.stream()
                .map(restroomMapper::toResponse)
                .collect(Collectors.toList());
    }
}
