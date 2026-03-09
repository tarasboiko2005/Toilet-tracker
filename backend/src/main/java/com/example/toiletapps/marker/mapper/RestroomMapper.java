package com.example.toiletapps.marker.mapper;

import com.example.toiletapps.marker.model.dto.RestroomCreateRequest;
import com.example.toiletapps.marker.model.dto.RestroomResponse;
import com.example.toiletapps.marker.model.entity.Rating;
import com.example.toiletapps.marker.model.entity.Restroom;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Mapper(componentModel = "spring")
public abstract class RestroomMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "version", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    public abstract Restroom toEntity(RestroomCreateRequest request);

    @Mapping(target = "averageRating", source = "ratings", qualifiedByName = "toRating")
    @Mapping(target = "coordinates", source = "restroom", qualifiedByName = "toCoordinates")
    @Mapping(target = "tags", source = "restroom", qualifiedByName = "toDefaultTags")
    public abstract RestroomResponse toResponse(Restroom restroom);

    @Named("toCoordinates")
    public com.example.toiletapps.marker.model.dto.Coordinates toCoordinates(Restroom restroom) {
        return new com.example.toiletapps.marker.model.dto.Coordinates(restroom.getLatitude(), restroom.getLongitude());
    }

    @Named("toDefaultTags")
    public List<com.example.toiletapps.marker.model.dto.TagResponse> toDefaultTags(Restroom restroom) {
        return Collections.singletonList(new com.example.toiletapps.marker.model.dto.TagResponse("Toilet"));
    }

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
