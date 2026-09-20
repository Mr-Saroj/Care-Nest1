package com.carenest.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "elder_otps")
public class ElderOtp {

    @Id
    private String id;

    private String mobile;

    private String otp;

    private LocalDateTime expiresAt;

    public ElderOtp() {
    }

    public ElderOtp(
            String mobile,
            String otp,
            LocalDateTime expiresAt) {

        this.mobile = mobile;
        this.otp = otp;
        this.expiresAt = expiresAt;
    }

    public String getId() {
        return id;
    }

    public String getMobile() {
        return mobile;
    }

    public String getOtp() {
        return otp;
    }

    public LocalDateTime getExpiresAt() {
        return expiresAt;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public void setOtp(String otp) {
        this.otp = otp;
    }

    public void setExpiresAt(LocalDateTime expiresAt) {
        this.expiresAt = expiresAt;
    }
}