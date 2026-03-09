package com.example.toiletapps.marker.mapper;

import com.example.toiletapps.marker.model.dto.RatingCreateRequest;
import com.example.toiletapps.marker.model.entity.Rating;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-11-08T11:32:41+0200",
    comments = "version: 1.6.3, compiler: javac, environment: Java 21.0.7 (Oracle Corporation)"
)
@Component
public class RatingMapperImpl implements RatingMapper {

    @Override
    public Rating toEntity(RatingCreateRequest request) {
        if ( request == null ) {
            return null;
        }

        Rating rating = new Rating();

        rating.setValue( request.getValue() );

        return rating;
    }
}
