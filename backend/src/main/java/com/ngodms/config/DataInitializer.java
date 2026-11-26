package com.ngodms.config;

import com.ngodms.user.model.Role;
import com.ngodms.user.model.User;
import com.ngodms.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Seeds default accounts on first startup (empty database).
 * Password for all seeded accounts: Admin@1234
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.count() > 0) {
            log.info("Users already present — skipping seed.");
            return;
        }

        String raw = "Admin@1234";
        String hash = passwordEncoder.encode(raw);

        List<User> seeds = List.of(
            User.builder().firstName("System").lastName("Admin")
                .email("admin@ngodms.com").password(hash).role(Role.ADMIN).build(),
            User.builder().firstName("Jane").lastName("Manager")
                .email("manager@ngodms.com").password(hash).role(Role.MANAGER).build(),
            User.builder().firstName("John").lastName("Teacher")
                .email("teacher@ngodms.com").password(hash).role(Role.TEACHER).build(),
            User.builder().firstName("Field").lastName("Worker")
                .email("fieldworker@ngodms.com").password(hash).role(Role.FIELD_WORKER).build(),
            User.builder().firstName("Regular").lastName("User")
                .email("user@ngodms.com").password(hash).role(Role.REGULAR_USER).build(),
            User.builder().firstName("Fund").lastName("Donor")
                .email("funder@ngodms.com").password(hash).role(Role.FUNDER).build()
        );

        userRepository.saveAll(seeds);
        log.info("Seeded {} users. Login: admin@ngodms.com / {}", seeds.size(), raw);
    }
}
