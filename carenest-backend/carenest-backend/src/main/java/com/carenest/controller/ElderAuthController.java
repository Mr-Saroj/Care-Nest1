package com.carenest.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.carenest.dto.ApiResponse;
import com.carenest.dto.ElderOtpLoginRequest;
import com.carenest.dto.ElderVerifyNumberRequest;
import com.carenest.dto.LoginResponse;
import com.carenest.services.ElderAuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/elder-auth")
public class ElderAuthController {

    private final ElderAuthService elderAuthService;

    public ElderAuthController(
            ElderAuthService elderAuthService) {

        this.elderAuthService = elderAuthService;
    }

    // ==========================================
    // VERIFY MOBILE + SEND OTP
    // ==========================================

    @PostMapping("/verify-number")
    public ResponseEntity<ApiResponse> verifyNumber(
            @Valid @RequestBody
            ElderVerifyNumberRequest request) {

        String message =
                elderAuthService.verifyNumber(
                        request.getMobile()
                );

        return ResponseEntity.ok(
                new ApiResponse(message)
        );
    }


    // ==========================================
    // LOGIN USING OTP
    // ==========================================

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody
            ElderOtpLoginRequest request) {

        LoginResponse response =
                elderAuthService.login(request);

        return ResponseEntity.ok(response);
    }
}