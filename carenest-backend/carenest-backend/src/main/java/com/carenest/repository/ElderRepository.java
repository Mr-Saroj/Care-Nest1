package com.carenest.repository;

import com.carenest.model.Elder;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ElderRepository extends MongoRepository<Elder, String> {

    List<Elder> findByCaregiverEmail(String caregiverEmail);


    boolean existsByMobile(String mobile);
}