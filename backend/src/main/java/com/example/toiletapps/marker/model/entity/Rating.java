package com.example.toiletapps.marker.model.entity;

import com.example.toiletapps.global.model.BaseEntity;
import com.example.toiletapps.security.model.entity.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Entity
@Table(name = "ratings")
public class Rating extends BaseEntity {
    @Column(name = "value", nullable = false)
    private Double value;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "restroom_id")
    @ToString.Exclude
    private Restroom restroom;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @ToString.Exclude
    private User user;
}
