package com.carenest.services;

import java.security.SecureRandom;
import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.carenest.dto.ElderOtpLoginRequest;
import com.carenest.dto.LoginResponse;
import com.carenest.exception.ApiException;
import com.carenest.model.Elder;
import com.carenest.model.ElderOtp;
import com.carenest.repository.ElderOtpRepository;
import com.carenest.repository.ElderRepository;

@Service
public class ElderAuthService {

    private final ElderRepository elderRepository;
    private final ElderOtpRepository elderOtpRepository;
    private final EmailService emailService;
    private final JwtService jwtService;

    private final SecureRandom secureRandom = new SecureRandom();

    public ElderAuthService(
            ElderRepository elderRepository,
            ElderOtpRepository elderOtpRepository,
            EmailService emailService,
            JwtService jwtService) {

        this.elderRepository = elderRepository;
        this.elderOtpRepository = elderOtpRepository;
        this.emailService = emailService;
        this.jwtService = jwtService;
    }

    // ==========================================
    // VERIFY MOBILE + SEND OTP
    // ==========================================

    public String verifyNumber(String mobile) {

        mobile = mobile.trim();

        // Find elder using mobile number
        Elder elder = elderRepository.findByMobile(mobile)
                .orElseThrow(() -> new ApiException(
                        "Elder with this mobile number is not registered",
                        HttpStatus.NOT_FOUND
                ));

        // Generate 6 digit OTP
        String otp = generateOtp();

        // Remove previous OTP
        elderOtpRepository.deleteByMobile(mobile);

        // Create new OTP
        ElderOtp elderOtp = new ElderOtp(
                mobile,
                otp,
                LocalDateTime.now().plusMinutes(5)
        );

        // Save OTP
        elderOtpRepository.save(elderOtp);

        // Send OTP to caregiver email
        emailService.sendElderLoginOtp(
                elder.getCaregiverEmail(),
                otp
        );

        return "Phone number verified. OTP sent to caregiver email.";
    }


    // ==========================================
    // ELDER LOGIN USING OTP
    // ==========================================

    public LoginResponse login(
            ElderOtpLoginRequest request) {

        String mobile = request.getMobile().trim();
        String enteredOtp = request.getOtp().trim();

        // Find elder
        Elder elder = elderRepository.findByMobile(mobile)
                .orElseThrow(() -> new ApiException(
                        "Elder not found",
                        HttpStatus.UNAUTHORIZED
                ));

        // Find OTP
        ElderOtp elderOtp =
                elderOtpRepository.findByMobile(mobile)
                        .orElseThrow(() -> new ApiException(
                                "OTP not found. Please request a new OTP.",
                                HttpStatus.UNAUTHORIZED
                        ));

        // Check expiration
        if (elderOtp.getExpiresAt()
                .isBefore(LocalDateTime.now())) {

            elderOtpRepository.deleteByMobile(mobile);

            throw new ApiException(
                    "OTP has expired. Please request a new OTP.",
                    HttpStatus.UNAUTHORIZED
            );
        }

        // Check OTP
        if (!elderOtp.getOtp().equals(enteredOtp)) {

            throw new ApiException(
                    "Invalid OTP",
                    HttpStatus.UNAUTHORIZED
            );
        }

        // OTP is correct
        elderOtpRepository.deleteByMobile(mobile);

        // Generate ELDER JWT
        String token =
                jwtService.generateElderToken(elder);

        return new LoginResponse(token);
    }


    // ==========================================
    // GENERATE 6 DIGIT OTP
    // ==========================================

    private String generateOtp() {

        int otp =
                100000 + secureRandom.nextInt(900000);

        return String.valueOf(otp);
    }
}