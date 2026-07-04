package com.assignment.urlshortener.url.dto;

import java.time.Instant;

public record UrlResponse(
        String originalUrl,
        String shortCode,
        String shortUrl,
        boolean customAlias,
        boolean active,
        long clickCount,
        Instant createdAt,
        Instant expiresAt
) {
}

