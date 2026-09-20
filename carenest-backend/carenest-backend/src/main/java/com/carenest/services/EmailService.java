package com.carenest.services;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendElderLoginOtp(
            String caregiverEmail,
            String otp) {

        SimpleMailMessage message =
                new SimpleMailMessage();

        message.setTo(caregiverEmail);

        message.setSubject(
                "CareNest Elder Login OTP"
        );

        message.setText(
                "Your CareNest elder login OTP is: "
                        + otp
                        + "\n\n"
                        + "This OTP is valid for 5 minutes."
        );

        mailSender.send(message);
    }
}