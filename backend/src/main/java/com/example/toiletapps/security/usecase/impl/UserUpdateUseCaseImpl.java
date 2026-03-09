package com.example.toiletapps.security.usecase.impl;

import com.example.toiletapps.security.model.dto.UserUpdateRequest;
import com.example.toiletapps.security.model.entity.User;
import com.example.toiletapps.security.service.UserService;
import com.example.toiletapps.security.usecase.UserUpdateUseCase;
import org.springframework.stereotype.Component;

@Component
public class UserUpdateUseCaseImpl implements UserUpdateUseCase {
    private final UserService userService;
    public UserUpdateUseCaseImpl(UserService userService) {
        this.userService = userService;
    }

    @Override
    public void updateUser(UserUpdateRequest request) {
        User targetUser = userService.findByJwt();
        userService.updateUser(targetUser.getId(), request);
    }
}
