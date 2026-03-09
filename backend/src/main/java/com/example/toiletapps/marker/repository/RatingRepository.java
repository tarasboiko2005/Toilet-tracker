package com.example.toiletapps.marker.repository;

import com.example.toiletapps.marker.model.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RatingRepository extends JpaRepository<Rating, Long> {
}
