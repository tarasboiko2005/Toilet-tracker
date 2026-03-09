package com.example.toiletapps.marker.controller;

import com.example.toiletapps.marker.model.dto.RestroomCreateRequest;
import com.example.toiletapps.marker.model.dto.RestroomResponse;
import com.example.toiletapps.marker.usecase.RestroomCreateUseCase;
import com.example.toiletapps.marker.usecase.RestroomGetUseCase;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/restrooms")
public class RestroomController {
    private final RestroomCreateUseCase restroomCreateUseCase;
    private final RestroomGetUseCase restroomGetUseCase;

    public RestroomController(RestroomCreateUseCase restroomCreateUseCase,
                              RestroomGetUseCase restroomGetUseCase) {
        this.restroomCreateUseCase = restroomCreateUseCase;
        this.restroomGetUseCase = restroomGetUseCase;
    }

    @PostMapping("/restroom")
    public void createRestroom(@RequestBody RestroomCreateRequest request) {
        restroomCreateUseCase.createRestroom(request);
    }

    @GetMapping("/")
    public List<RestroomResponse> getRestrooms() {
        return restroomGetUseCase.getRestrooms();
    }
}