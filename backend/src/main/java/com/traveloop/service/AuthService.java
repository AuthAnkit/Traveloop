package com.traveloop.service;

import com.traveloop.dto.request.AuthRequest;
import com.traveloop.dto.request.RegisterRequest;
import com.traveloop.dto.response.AuthResponse;
import com.traveloop.entity.User;
import com.traveloop.exception.BadRequestException;
import com.traveloop.repository.UserRepository;
import com.traveloop.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new BadRequestException("Email already registered");
        }
        User user = User.builder()
                .name(req.getName())
                .email(req.getEmail())
                .password(passwordEncoder.encode(req.getPassword()))
                .bio(req.getBio())
                .build();
        userRepository.save(user);
        String token = jwtTokenProvider.generateTokenFromEmail(user.getEmail());
        return buildAuthResponse(token, user);
    }

    public AuthResponse login(AuthRequest req) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword()));
        String token = jwtTokenProvider.generateToken(auth);
        User user = userRepository.findByEmail(req.getEmail()).orElseThrow();
        return buildAuthResponse(token, user);
    }

    private AuthResponse buildAuthResponse(String token, User user) {
        return AuthResponse.builder()
                .token(token)
                .type("Bearer")
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .profilePhoto(user.getProfilePhoto())
                .build();
    }
}
