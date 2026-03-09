package com.example.toiletapps.security.usecase;

import com.example.toiletapps.security.model.dto.JwtResponse;
import com.example.toiletapps.security.model.dto.UserAuthRequest;

public interface UserAuthUseCase {
    JwtResponse auth(UserAuthRequest request);
}
