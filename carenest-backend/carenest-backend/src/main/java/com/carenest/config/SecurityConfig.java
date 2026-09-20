package com.carenest.config;

import java.nio.charset.StandardCharsets;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;

import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;

import org.springframework.security.web.SecurityFilterChain;

import io.jsonwebtoken.security.Keys;

@Configuration
public class SecurityConfig {

        @Value("${jwt.secret}")
        private String jwtSecret;

        @Bean
        public SecurityFilterChain securityFilterChain(
                        HttpSecurity http) throws Exception {

                return http

                                // JWT REST API → CSRF disabled
                                .csrf(csrf -> csrf.disable())

                                // JWT → stateless
                                .sessionManagement(session -> session
                                                .sessionCreationPolicy(
                                                                SessionCreationPolicy.STATELESS))

                                .authorizeHttpRequests(auth -> auth

                                                // Public APIs
                                                .requestMatchers(
                                                                "/api/auth/register",
                                                                "/api/auth/login",
                                                                "/api/elder-auth/verify-number",
                                                                "/api/elder-auth/login")
                                                .permitAll()

                                                // Caregiver APIs
                                                .requestMatchers("/api/elders/**")
                                                .hasAuthority("CAREGIVER")

                                                // Elder APIs
                                                .requestMatchers("/api/elder/**")
                                                .hasAuthority("ELDER")

                                                // Everything else
                                                .anyRequest()
                                                .authenticated())

                                // Spring Security handles JWT verification
                                .oauth2ResourceServer(oauth2 -> oauth2.jwt(jwt -> jwt.jwtAuthenticationConverter(
                                                jwtAuthenticationConverter())))

                                .build();
        }

        // Same secret that JwtService uses to SIGN the JWT
        @Bean
        public SecretKey jwtSecretKey() {

                return Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
        }

        // Spring Security uses this to VERIFY the JWT
        @Bean
        public JwtDecoder jwtDecoder(SecretKey jwtSecretKey) {

                return NimbusJwtDecoder.withSecretKey(jwtSecretKey).macAlgorithm(MacAlgorithm.HS384).build();
        }

        // Convert JWT "role" claim into Spring Security authority
        @Bean
        public JwtAuthenticationConverter jwtAuthenticationConverter() {

                JwtGrantedAuthoritiesConverter authoritiesConverter = new JwtGrantedAuthoritiesConverter();
                authoritiesConverter.setAuthoritiesClaimName("role");
                authoritiesConverter.setAuthorityPrefix("");
                JwtAuthenticationConverter converter = new JwtAuthenticationConverter();
                converter.setJwtGrantedAuthoritiesConverter(authoritiesConverter);

                return converter;
        }
}