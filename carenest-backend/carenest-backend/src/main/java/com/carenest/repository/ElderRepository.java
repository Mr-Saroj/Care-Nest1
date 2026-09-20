package com.carenest.repository;

import com.carenest.model.Elder;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;

public interface ElderRepository extends MongoRepository<Elder, String> {

    List<Elder> findByCaregiverEmail(String caregiverEmail);


    boolean existsByMobile(String mobile);
    Optional<Elder> findByMobile(String mobile);
}