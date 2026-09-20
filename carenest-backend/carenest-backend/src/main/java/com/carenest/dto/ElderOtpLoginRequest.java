package com.carenest.dto;

import jakarta.validation.constraints.NotBlank;

public class ElderOtpLoginRequest {

    @NotBlank(message = "Mobile number is required")
    private String mobile;

    @NotBlank(message = "OTP is required")
    private String otp;

    public ElderOtpLoginRequest() {
    }

    public String getMobile() {
        return mobile;
    }

    public String getOtp() {
        return otp;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public void setOtp(String otp) {
        this.otp = otp;
    }
}