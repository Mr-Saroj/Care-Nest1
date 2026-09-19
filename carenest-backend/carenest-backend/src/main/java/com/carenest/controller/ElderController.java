package com.carenest.controller;

import com.carenest.dto.AddElderRequest;
import com.carenest.model.Elder;
import com.carenest.services.ElderService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/elders")
public class ElderController {

    private final ElderService elderService;

    public ElderController(ElderService elderService) {
        this.elderService = elderService;
    }

    @PostMapping("/add")
    public ResponseEntity<Elder> addElder(
            @Valid @RequestBody AddElderRequest request,
            Authentication authentication) {

        String caregiverEmail = authentication.getName();

        Elder elder = elderService.addElder(
                caregiverEmail,
                request);

        return ResponseEntity.ok(elder);
    }

    @GetMapping("/my-elders")
    public ResponseEntity<List<Elder>> getMyElders(
            Authentication authentication) {

        String caregiverEmail = authentication.getName();

        List<Elder> elders =
                elderService.getEldersByCaregiver(
                        caregiverEmail);

        return ResponseEntity.ok(elders);
    }
}