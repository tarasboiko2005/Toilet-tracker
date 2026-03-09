package com.example.toiletapps.security.usecase.impl;

import com.example.toiletapps.security.mapper.UserMapper;
import com.example.toiletapps.security.model.dto.UserResponse;
import com.example.toiletapps.security.model.entity.User;
import com.example.toiletapps.security.service.UserService;
import com.example.toiletapps.security.usecase.UserGetUseCase;
import org.springframework.stereotype.Component;

@Component
public class UserGetUseCaseImpl implements UserGetUseCase {
    private final UserService userService;
    private final UserMapper userMapper;

    public UserGetUseCaseImpl(UserService userService,
                              UserMapper userMapper) {
        this.userService = userService;
        this.userMapper = userMapper;
    }

    @Override
    public UserResponse getUser() {
        User targetUser = userService.findByJwt();
        return userMapper.toResponse(targetUser);
    }
}
