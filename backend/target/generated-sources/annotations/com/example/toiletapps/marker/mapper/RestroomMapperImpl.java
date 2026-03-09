package com.example.toiletapps.marker.mapper;

import com.example.toiletapps.marker.model.dto.RestroomCreateRequest;
import com.example.toiletapps.marker.model.dto.RestroomResponse;
import com.example.toiletapps.marker.model.entity.Restroom;
import com.example.toiletapps.marker.model.entity.RestroomStatus;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-11-08T11:37:11+0200",
    comments = "version: 1.6.3, compiler: javac, environment: Java 21.0.7 (Oracle Corporation)"
)
@Component
public class RestroomMapperImpl extends RestroomMapper {

    @Override
    public Restroom toEntity(RestroomCreateRequest request) {
        if ( request == null ) {
            return null;
        }

        Restroom restroom = new Restroom();

        restroom.setName( request.getName() );
        if ( request.getStatus() != null ) {
            restroom.setStatus( Enum.valueOf( RestroomStatus.class, request.getStatus() ) );
        }
        restroom.setAddress( request.getAddress() );
        restroom.setLatitude( request.getLatitude() );
        restroom.setLongitude( request.getLongitude() );

        return restroom;
    }

    @Override
    public RestroomResponse toResponse(Restroom restroom) {
        if ( restroom == null ) {
            return null;
        }

        RestroomResponse restroomResponse = new RestroomResponse();

        restroomResponse.setRating( toRating( restroom.getRatings() ) );
        restroomResponse.setId( restroom.getId() );
        restroomResponse.setName( restroom.getName() );
        restroomResponse.setStatus( restroom.getStatus() );
        restroomResponse.setLatitude( restroom.getLatitude() );
        restroomResponse.setLongitude( restroom.getLongitude() );

        return restroomResponse;
    }
}
