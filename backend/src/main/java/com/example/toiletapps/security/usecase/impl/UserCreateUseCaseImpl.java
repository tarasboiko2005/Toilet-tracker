package com.example.toiletapps.security.usecase.impl;

import com.example.toiletapps.security.mapper.UserMapper;
import com.example.toiletapps.security.model.dto.UserCreateRequest;
import com.example.toiletapps.security.model.entity.User;
import com.example.toiletapps.security.service.UserService;
import com.example.toiletapps.security.usecase.UserCreateUseCase;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class UserCreateUseCaseImpl implements UserCreateUseCase {
    private final UserService userService;
    private final UserMapper userMapper;

    public UserCreateUseCaseImpl(UserService userService,
                                 UserMapper userMapper) {
        this.userService = userService;
        this.userMapper = userMapper;
    }

    @Override
    public void register(UserCreateRequest request) {
        User mappedUser = userMapper.toEntity(request);
        userService.createUser(mappedUser);
    }
}
