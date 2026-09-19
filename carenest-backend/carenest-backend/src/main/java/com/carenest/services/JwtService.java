package com.carenest.services;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.carenest.model.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private long jwtExpiration;


    // ==============================
    // SECRET KEY
    // ==============================

    private SecretKey getKey() {

        return Keys.hmacShaKeyFor(
                jwtSecret.getBytes(StandardCharsets.UTF_8)
        );
    }


    // ==============================
    // GENERATE JWT
    // ==============================

    public String generateToken(User user) {

        return Jwts.builder()

                // Subject
                .subject(user.getEmail())

                // Custom claims
                .claim("email", user.getEmail())
                .claim("role", user.getRole().name())

                // Token timing
                .issuedAt(new Date())

                .expiration(
                        new Date(
                                System.currentTimeMillis()
                                        + jwtExpiration
                        )
                )

                // Sign token
                .signWith(getKey())

                .compact();
    }
}