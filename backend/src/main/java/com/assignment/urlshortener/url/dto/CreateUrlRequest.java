package com.assignment.urlshortener.url.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.URL;

import java.time.Instant;

@Schema(description = "Payload used to create a new short URL")
public record CreateUrlRequest(
        @Schema(description = "The original HTTPS URL to shorten", example = "https://example.com/products/123", requiredMode = Schema.RequiredMode.REQUIRED)
        @NotBlank(message = "originalUrl is required")
        @URL(protocol = "https", message = "originalUrl must be a valid HTTPS URL")
        @Size(max = 2048, message = "originalUrl must be 2048 characters or fewer")
        String originalUrl,

        @Schema(description = "Optional custom alias for the short URL", example = "shop123")
        @Pattern(regexp = "^[A-Za-z0-9_-]{4,32}$", message = "customAlias must be 4-32 URL-safe characters")
        String customAlias,

        @Schema(description = "Optional expiration timestamp for the shortened URL", example = "2026-12-31T23:59:59Z")
        @Future(message = "expiresAt must be in the future")
        Instant expiresAt
) {
}
