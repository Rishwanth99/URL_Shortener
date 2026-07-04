package com.assignment.urlshortener.analytics.dto;

import java.time.Instant;
import java.util.List;

public record AnalyticsResponse(
        String shortCode,
        String originalUrl,
        long totalClicks,
        long clicksLast24Hours,
        List<ClickSummary> recentClicks
) {
    public record ClickSummary(Instant clickedAt) {
    }
}

