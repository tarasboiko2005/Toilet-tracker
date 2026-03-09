package com.example.toiletapps.security.mapper;

import com.example.toiletapps.security.model.dto.UserCreateRequest;
import com.example.toiletapps.security.model.dto.UserResponse;
import com.example.toiletapps.security.model.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "version", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    User toEntity(UserCreateRequest request);

    @Mapping(target = "name", source = "name")
    UserResponse toResponse(User user);
}
