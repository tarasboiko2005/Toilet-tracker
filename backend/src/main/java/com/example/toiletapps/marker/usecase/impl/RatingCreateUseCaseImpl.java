package com.example.toiletapps.marker.usecase.impl;

import com.example.toiletapps.marker.mapper.RatingMapper;
import com.example.toiletapps.marker.model.dto.RatingCreateRequest;
import com.example.toiletapps.marker.model.entity.Rating;
import com.example.toiletapps.marker.model.entity.Restroom;
import com.example.toiletapps.marker.service.RatingService;
import com.example.toiletapps.marker.service.RestroomService;
import com.example.toiletapps.marker.usecase.RatingCreateUseCase;
import com.example.toiletapps.security.model.entity.User;
import com.example.toiletapps.security.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class RatingCreateUseCaseImpl implements RatingCreateUseCase {
    private final RatingService ratingService;
    private final RatingMapper ratingMapper;
    private final RestroomService restroomService;
    private final UserService userService;

    public RatingCreateUseCaseImpl(RatingService ratingService,
                                   RatingMapper ratingMapper,
                                   RestroomService restroomService,
                                   UserService userService) {
        this.ratingService = ratingService;
        this.ratingMapper = ratingMapper;
        this.restroomService = restroomService;
        this.userService = userService;
    }

    @Override
    public void createRating(RatingCreateRequest request) {
        Rating ratingToCreate = ratingMapper.toEntity(request);
        Restroom restroom = restroomService.findOptionalById(request.getRestroomId())
                        .orElseThrow(() -> new EntityNotFoundException("Restroom not found"));
        User targetUser = userService.findByJwt();

        ratingToCreate.setRestroom(restroom);
        ratingToCreate.setUser(targetUser);

        ratingService.createRating(ratingToCreate);
    }
}
