package com.example.toiletapps;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class ToiletAppsApplication {

    public static void main(String[] args) {
        SpringApplication.run(ToiletAppsApplication.class, args);
    }

}
