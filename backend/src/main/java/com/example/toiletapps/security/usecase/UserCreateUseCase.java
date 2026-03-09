package com.example.toiletapps.security.usecase;

import com.example.toiletapps.security.model.dto.UserCreateRequest;

public interface UserCreateUseCase {
    void register(UserCreateRequest request);
}
