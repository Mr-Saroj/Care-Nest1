package com.carenest.dto;

import com.carenest.model.enums.Language;

import jakarta.validation.constraints.*;

public class AddElderRequest {

    @NotBlank(message = "Elder full name is required")
    private String fullName;

    @NotBlank(message = "Mobile number is required")
    private String mobile;

    @Min(value = 1, message = "Age must be greater than 0")
    @Max(value = 150, message = "Invalid age")
    private int age;

    @NotBlank(message = "Relationship is required")
    private String relationship;

    @NotNull(message = "Preferred language is required")
    private Language preferredLanguage;

    public String getFullName() {
        return fullName;
    }

    public String getMobile() {
        return mobile;
    }

    public int getAge() {
        return age;
    }

    public String getRelationship() {
        return relationship;
    }

    public Language getPreferredLanguage() {
        return preferredLanguage;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void setRelationship(String relationship) {
        this.relationship = relationship;
    }

    public void setPreferredLanguage(Language preferredLanguage) {
        this.preferredLanguage = preferredLanguage;
    }
}