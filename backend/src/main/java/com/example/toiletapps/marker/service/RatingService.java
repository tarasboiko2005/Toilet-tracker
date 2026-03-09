package com.example.toiletapps.marker.service;

import com.example.toiletapps.marker.model.entity.Rating;
import com.example.toiletapps.marker.repository.RatingRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RatingService {
    private final RatingRepository ratingRepository;

    public RatingService(RatingRepository ratingRepository) {
        this.ratingRepository = ratingRepository;
    }

    @Transactional
    public void createRating(Rating rating) {
        ratingRepository.save(rating);
    }

    @Transactional
    public List<Rating> getAllRatings() {
        return ratingRepository.findAll();
    }
}
