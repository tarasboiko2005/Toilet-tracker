package com.example.toiletapps.marker.controller;

import com.example.toiletapps.marker.model.dto.RatingCreateRequest;
import com.example.toiletapps.marker.usecase.RatingCreateUseCase;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/ratings")
public class RatingController {
    private final RatingCreateUseCase ratingCreateUseCase;

    public RatingController(RatingCreateUseCase ratingCreateUseCase) {
        this.ratingCreateUseCase = ratingCreateUseCase;
    }

    @PostMapping("/rating")
    public void createRating(@RequestBody RatingCreateRequest request) {
        ratingCreateUseCase.createRating(request);
    }
}
