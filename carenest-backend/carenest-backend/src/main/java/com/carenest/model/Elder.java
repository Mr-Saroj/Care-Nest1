package com.carenest.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.carenest.model.enums.Language;
import com.carenest.model.enums.Role;

@Document(collection = "elders")
public class Elder {

    @Id
    private String id;

    // Caregiver who added this elder
    private String caregiverEmail;

    private String fullName;

    private String mobile;

    private int age;

    private String relationship;

    private Language preferredLanguage;

    private Role role;

    public Elder() {
    }

    public Elder(
            String caregiverEmail,
            String fullName,
            String mobile,
            int age,
            String relationship,
            Language preferredLanguage,
            Role role) {

        this.caregiverEmail = caregiverEmail;
        this.fullName = fullName;
        this.mobile = mobile;
        this.age = age;
        this.relationship = relationship;
        this.preferredLanguage = preferredLanguage;
        this.role = role;
    }

    public String getId() {
        return id;
    }

    public String getCaregiverEmail() {
        return caregiverEmail;
    }

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

    public Role getRole() {
        return role;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setCaregiverEmail(String caregiverEmail) {
        this.caregiverEmail = caregiverEmail;
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

    public void setRole(Role role) {
        this.role = role;
    }
}