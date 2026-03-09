package com.example.toiletapps.security.mapper;

import com.example.toiletapps.security.model.dto.UserCreateRequest;
import com.example.toiletapps.security.model.dto.UserResponse;
import com.example.toiletapps.security.model.entity.User;
import com.example.toiletapps.security.model.entity.Role;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "version", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    User toEntity(UserCreateRequest request);

    @Mapping(target = "name", source = "name")
    @Mapping(target = "roles", source = "roles", qualifiedByName = "mapRoles")
    UserResponse toResponse(User user);

    @org.mapstruct.Named("mapRoles")
    default java.util.List<String> mapRoles(java.util.List<Role> roles) {
        if (roles == null) return java.util.Collections.emptyList();
        return roles.stream().map(Role::getName).toList();
    }
}
