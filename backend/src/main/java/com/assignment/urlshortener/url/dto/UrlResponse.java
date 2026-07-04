package com.assignment.urlshortener.url.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.Instant;

@Schema(description = "Representation of a shortened URL after creation or lookup")
public record UrlResponse(
        @Schema(description = "Original destination URL", example = "https://example.com/products/123")
        String originalUrl,

        @Schema(description = "Generated or custom short code", example = "shop123")
        String shortCode,

        @Schema(description = "Full short URL that can be used in the browser", example = "http://localhost:8080/shop123")
        String shortUrl,

        @Schema(description = "Whether the URL uses a user-provided custom alias", example = "true")
        boolean customAlias,

        @Schema(description = "Whether the short URL is currently active", example = "true")
        boolean active,

        @Schema(description = "Number of redirects that have been recorded", example = "12")
        long clickCount,

        @Schema(description = "Timestamp when the short URL was created", example = "2026-07-04T12:47:19Z")
        Instant createdAt,

        @Schema(description = "Expiration timestamp if one was provided", example = "2026-12-31T23:59:59Z")
        Instant expiresAt
) {
}

