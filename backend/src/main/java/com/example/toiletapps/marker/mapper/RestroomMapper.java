package com.example.toiletapps.marker.mapper;

import com.example.toiletapps.marker.model.dto.RestroomCreateRequest;
import com.example.toiletapps.marker.model.dto.RestroomResponse;
import com.example.toiletapps.marker.model.entity.Rating;
import com.example.toiletapps.marker.model.entity.Restroom;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring")
public abstract class RestroomMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "version", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    public abstract Restroom toEntity(RestroomCreateRequest request);

    @Mapping(target = "rating", source = "ratings", qualifiedByName = "toRating")
    public abstract RestroomResponse toResponse(Restroom restroom);

    @Named("toRating")
    public Double toRating(List<Rating> ratings) {
        if (ratings == null || ratings.isEmpty()) {
            return 0.0;
        }

        double sum = 0.0;
        for (Rating rating : ratings) {
            sum += rating.getValue();
        }

        double average = sum / ratings.size();

        return Math.round(average * 100.0) / 100.0;
    }
}
