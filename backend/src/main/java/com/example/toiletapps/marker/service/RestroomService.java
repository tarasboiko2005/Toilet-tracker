package com.example.toiletapps.marker.service;

import com.example.toiletapps.marker.model.entity.Restroom;
import com.example.toiletapps.marker.repository.RestroomRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RestroomService {
    private final RestroomRepository restroomRepository;

    public RestroomService(RestroomRepository restroomRepository) {
        this.restroomRepository = restroomRepository;
    }

    @Transactional
    public void createRestroom(Restroom restroom) {
        restroomRepository.save(restroom);
    }

    @Transactional
    public List<Restroom> getRestrooms() {
        return restroomRepository.findAll();
    }

    @Transactional
    public Optional<Restroom> findOptionalById(Long id) {
        return restroomRepository.findById(id);
    }
}
