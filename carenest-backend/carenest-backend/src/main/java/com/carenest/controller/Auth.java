package com.carenest.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class Auth {
    @GetMapping("/test")
    public String testBackend() {
        return "CareNest Backend is working successfully!";
    }

}
