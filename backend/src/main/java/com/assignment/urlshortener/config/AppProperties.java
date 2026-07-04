package com.assignment.urlshortener.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app")
public record AppProperties(
        String baseUrl,
        String allowedOrigins,
        RateLimit rateLimit
) {
    public record RateLimit(int requestsPerMinute) {
    }
}

