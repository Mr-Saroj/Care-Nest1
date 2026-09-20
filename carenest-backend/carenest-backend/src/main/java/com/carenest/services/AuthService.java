package com.carenest.services;

import com.carenest.dto.LoginRequest;
import com.carenest.dto.LoginResponse;
import com.carenest.dto.RegisterRequest;
import com.carenest.exception.ApiException;
import com.carenest.model.User;
import com.carenest.repository.UserRepository;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    // Used for user database operations
    private final UserRepository userRepository;

    // Used for password encoding
    private final PasswordEncoder passwordEncoder;

    // Used for generating JWT tokens
    private final JwtService jwtService;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public String register(RegisterRequest request) {

        // Normalize email
        String email = request.getEmail()
                .trim()
                .toLowerCase();

        // Normalize mobile
        String mobile = request.getMobile()
                .trim();

        // Check if email already exists
        if (userRepository.existsByEmail(email)) {

            throw new ApiException(
                    "Email is already registered",
                    HttpStatus.CONFLICT
            );
        }

        // Check if mobile already exists
        if (userRepository.existsByMobile(mobile)) {

            throw new ApiException(
                    "Mobile number is already registered",
                    HttpStatus.CONFLICT
            );
        }

        // Create new user
        User user = new User();

        user.setName(request.getName().trim());
        user.setEmail(email);
        user.setMobile(mobile);
        user.setRole(request.getRole());

        // Encode password before saving
        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        userRepository.save(user);

        return "Registration successful";
    }

    public LoginResponse login(LoginRequest request) {

        // Normalize email
        String email = request.getEmail()
                .trim()
                .toLowerCase();

        // Find user
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ApiException(
                        "Email not found",
                        HttpStatus.UNAUTHORIZED
                ));

        // Compare raw password with BCrypt password
        boolean passwordMatches = passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        );

        // Wrong password
        if (!passwordMatches) {

            throw new ApiException(
                    "Password is incorrect",
                    HttpStatus.UNAUTHORIZED
            );
        }

        // Generate JWT
        String token = jwtService.generateToken(user);

        // Return JWT token
        return new LoginResponse(token);
    }
}