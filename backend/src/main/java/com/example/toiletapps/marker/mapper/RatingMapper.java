package com.example.toiletapps.marker.mapper;

import com.example.toiletapps.marker.model.dto.RatingCreateRequest;
import com.example.toiletapps.marker.model.entity.Rating;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RatingMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "version", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    Rating toEntity(RatingCreateRequest request);
}
