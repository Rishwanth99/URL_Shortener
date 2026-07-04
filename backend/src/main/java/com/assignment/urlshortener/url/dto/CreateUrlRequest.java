package com.assignment.urlshortener.url.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.URL;

import java.time.Instant;

public record CreateUrlRequest(
        @NotBlank(message = "originalUrl is required")
        @URL(protocol = "https", message = "originalUrl must be a valid HTTPS URL")
        @Size(max = 2048, message = "originalUrl must be 2048 characters or fewer")
        String originalUrl,

        @Pattern(regexp = "^[A-Za-z0-9_-]{4,32}$", message = "customAlias must be 4-32 URL-safe characters")
        String customAlias,

        @Future(message = "expiresAt must be in the future")
        Instant expiresAt
) {
}
