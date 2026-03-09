package com.example.toiletapps.marker.usecase.impl;

import com.example.toiletapps.marker.mapper.RestroomMapper;
import com.example.toiletapps.marker.model.dto.RestroomCreateRequest;
import com.example.toiletapps.marker.model.entity.Restroom;
import com.example.toiletapps.marker.service.RestroomService;
import com.example.toiletapps.marker.usecase.RestroomCreateUseCase;
import org.springframework.stereotype.Component;

@Component
public class RestroomCreateUseCaseImpl implements RestroomCreateUseCase {
    private final RestroomService restroomService;
    private final RestroomMapper restroomMapper;

    public RestroomCreateUseCaseImpl(RestroomService restroomService,
                                     RestroomMapper restroomMapper) {
        this.restroomService = restroomService;
        this.restroomMapper = restroomMapper;
    }

    @Override
    public void createRestroom(RestroomCreateRequest request) {
        Restroom restroomToCreate = restroomMapper.toEntity(request);
        restroomService.createRestroom(restroomToCreate);
    }
}
