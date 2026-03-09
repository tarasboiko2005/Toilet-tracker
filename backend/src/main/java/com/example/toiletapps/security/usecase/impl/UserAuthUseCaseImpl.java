package com.example.toiletapps.security.usecase.impl;

import com.example.toiletapps.security.model.dto.JwtResponse;
import com.example.toiletapps.security.model.dto.UserAuthRequest;
import com.example.toiletapps.security.service.UserService;
import com.example.toiletapps.security.usecase.UserAuthUseCase;
import com.example.toiletapps.security.utils.JwtTokenUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
public class UserAuthUseCaseImpl implements UserAuthUseCase {
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtTokenUtils jwtTokenUtils;

    public UserAuthUseCaseImpl(AuthenticationManager authenticationManager,
                               UserService userService,
                               JwtTokenUtils jwtTokenUtils) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.jwtTokenUtils = jwtTokenUtils;
    }

    @Override
    public JwtResponse auth(UserAuthRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
        ));

        UserDetails userDetails = userService.loadUserByUsername(request.getEmail());
        String token = jwtTokenUtils.generateToken(userDetails);
        return new JwtResponse(token);
    }
}
