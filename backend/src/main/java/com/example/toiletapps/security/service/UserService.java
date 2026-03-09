package com.example.toiletapps.security.service;

import com.example.toiletapps.security.model.dto.UserUpdateRequest;
import com.example.toiletapps.security.model.entity.User;
import com.example.toiletapps.security.repository.RoleRepository;
import com.example.toiletapps.security.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    private static final String USER_ACCOUNT_ALREADY_EXIST = "This email: %s already exist.";

    public UserService(UserRepository userRepository,
                       RoleRepository roleRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        String normalizedUsername = Optional.ofNullable(username)
                .map(value -> value.trim().toLowerCase(Locale.ROOT))
                .orElseThrow(() -> new UsernameNotFoundException("Username must not be null"));

        User user = findOptionUserByEmail(normalizedUsername)
                .orElseThrow(() -> new UsernameNotFoundException("User with email %s not found".formatted(normalizedUsername)));

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                user.getRoles().stream().map(role -> new SimpleGrantedAuthority(role.getName())).toList()
        );
    }

    @Transactional
    public void createUser(User userAccount){
        String normalizedEmail = Optional.ofNullable(userAccount.getEmail())
                .map(email -> email.trim().toLowerCase(Locale.ROOT))
                .orElseThrow(() -> new IllegalArgumentException("Email must not be null"));

        if(userRepository.existsByEmail(normalizedEmail)){
            throw new RuntimeException(
                    String.format(USER_ACCOUNT_ALREADY_EXIST, normalizedEmail)
            );
        }
        String rawPassword = Optional.ofNullable(userAccount.getPassword())
                .map(String::trim)
                .filter(password -> !password.isEmpty())
                .orElseThrow(() -> new IllegalArgumentException("Password must not be empty"));

        userAccount.setEmail(normalizedEmail);
        userAccount.setPassword(passwordEncoder.encode(rawPassword));
        userAccount.setRoles(List.of(roleRepository.findByName("ROLE_USER")
                .orElseThrow(() -> new IllegalStateException("Role ROLE_USER not found"))));

        userRepository.save(userAccount);
    }

    @Transactional
    public void updateUser(Long id, UserUpdateRequest request){
        User targetUser = findOptionalById(id).orElseThrow(
                () -> new EntityNotFoundException("User not found")
        );

        if (request.getEmail() != null && !request.getEmail().isEmpty()){
            targetUser.setEmail(request.getEmail());
        }

        if (request.getName() != null && !request.getName().isEmpty()){
            targetUser.setName(request.getName());
        }

        userRepository.save(targetUser);
    }

    @Transactional
    public User findByJwt() {
        SecurityContext securityContext = SecurityContextHolder.getContext();

        return Optional
                .ofNullable(securityContext.getAuthentication())
                .map(Authentication::getName)
                .map(this::findOptionUserByEmail)
                .orElseThrow(() -> new EntityNotFoundException("Користувача не знайдено з переданим jwt."))
                .get();
    }

    @Transactional
    public Optional<User> findOptionalById(Long id) {
        return userRepository.findById(id);
    }

    @Transactional
    public Optional<User> findOptionUserByEmail(String email){
        return userRepository.findByEmail(email);
    }
}
