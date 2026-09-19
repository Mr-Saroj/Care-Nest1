package com.carenest.services;

import com.carenest.dto.AddElderRequest;
import com.carenest.model.Elder;
import com.carenest.model.enums.Role;
import com.carenest.repository.ElderRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ElderService {

        private final ElderRepository elderRepository;

        public ElderService(ElderRepository elderRepository) {
                this.elderRepository = elderRepository;
        }

        public Elder addElder(String caregiverEmail,AddElderRequest request) {
                Elder elder = new Elder();
                elder.setCaregiverEmail(caregiverEmail.trim().toLowerCase());
                elder.setFullName(request.getFullName().trim());
                elder.setMobile(request.getMobile().trim());
                elder.setAge(request.getAge());
                elder.setRelationship(request.getRelationship().trim());
                elder.setPreferredLanguage(request.getPreferredLanguage());
                elder.setRole(Role.ELDER);

                return elderRepository.save(elder);
        }

        public List<Elder> getEldersByCaregiver(String caregiverEmail) {

                return elderRepository.findByCaregiverEmail(caregiverEmail.trim().toLowerCase());
        }
}