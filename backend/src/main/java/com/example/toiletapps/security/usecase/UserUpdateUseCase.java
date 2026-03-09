package com.example.toiletapps.security.usecase;

import com.example.toiletapps.security.model.dto.UserUpdateRequest;

public interface UserUpdateUseCase {
    void updateUser(UserUpdateRequest request);
}
