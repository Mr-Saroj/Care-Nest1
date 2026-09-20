package com.carenest.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.carenest.model.ElderOtp;

public interface ElderOtpRepository
        extends MongoRepository<ElderOtp, String> {

    Optional<ElderOtp> findByMobile(String mobile);

    void deleteByMobile(String mobile);
}