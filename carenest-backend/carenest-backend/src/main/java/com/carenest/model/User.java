package com.carenest.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.carenest.model.enums.Role;

@Document(collection = "users")
public class User {

    @Id
    private String id;

    private String name;

    private String email;

    private String mobile;

    private Role role;

    private String password;

    public User() {
    }

    public User(String name, String email, String mobile, Role role, String password) {
        this.name = name;
        this.email = email;
        this.mobile = mobile;
        this.role = role;
        this.password = password;
    }

   

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getMobile() {
        return mobile;
    }

    public Role getRole() {
        return role;
    }

    public String getPassword() {
        return password;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
