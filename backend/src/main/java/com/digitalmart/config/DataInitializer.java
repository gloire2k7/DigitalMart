package com.digitalmart.config;

import com.digitalmart.model.ERole;
import com.digitalmart.model.Role;
import com.digitalmart.repository.RoleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    @Autowired
    RoleRepository roleRepository;

    @Override
    public void run(String... args) throws Exception {
        try {
            // Initialize roles if they don't exist
            for (ERole role : ERole.values()) {
                try {
                    if (!roleRepository.existsByName(role)) {
                        Role newRole = new Role();
                        newRole.setName(role);
                        roleRepository.save(newRole);
                        logger.info("Created role: {}", role);
                    }
                } catch (Exception e) {
                    logger.error("Error creating role {}: {}", role, e.getMessage());
                }
            }
            logger.info("Role initialization completed");
        } catch (Exception e) {
            logger.error("Error during role initialization: {}", e.getMessage());
        }
    }
} 