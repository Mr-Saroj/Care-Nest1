package com.carenest.dto;

import jakarta.validation.constraints.NotBlank;

public class ElderVerifyNumberRequest {

    @NotBlank(message = "Mobile number is required")
    private String mobile;

    public ElderVerifyNumberRequest() {
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }
}