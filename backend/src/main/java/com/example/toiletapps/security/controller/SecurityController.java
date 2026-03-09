package com.example.toiletapps.security.controller;

import com.example.toiletapps.security.model.dto.*;
import com.example.toiletapps.security.usecase.UserAuthUseCase;
import com.example.toiletapps.security.usecase.UserCreateUseCase;
import com.example.toiletapps.security.usecase.UserGetUseCase;
import com.example.toiletapps.security.usecase.UserUpdateUseCase;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
public class SecurityController {
    private final UserAuthUseCase userAuthUseCase;
    private final UserCreateUseCase userCreateUseCase;
    private final UserGetUseCase userGetUseCase;
    private final UserUpdateUseCase userUpdateUseCase;

    public SecurityController(UserAuthUseCase userAuthUseCase,
                              UserCreateUseCase userCreateUseCase,
                              UserGetUseCase userGetUseCase,
                              UserUpdateUseCase userUpdateUseCase) {
        this.userAuthUseCase = userAuthUseCase;
        this.userCreateUseCase = userCreateUseCase;
        this.userGetUseCase = userGetUseCase;
        this.userUpdateUseCase = userUpdateUseCase;
    }

    @PostMapping("/auth")
    public JwtResponse auth(@RequestBody UserAuthRequest request){
        return userAuthUseCase.auth(request);
    }

    @PostMapping("/signup")
    public void register(@RequestBody UserCreateRequest request){
        userCreateUseCase.register(request);
    }

    @GetMapping("/user")
    public UserResponse getUser(){
        return userGetUseCase.getUser();
    }

    @PatchMapping("/user")
    public void updateUser(@RequestBody UserUpdateRequest request){
        userUpdateUseCase.updateUser(request);
    }
}
