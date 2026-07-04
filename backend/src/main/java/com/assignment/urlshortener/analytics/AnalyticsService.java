package com.assignment.urlshortener.analytics;

import com.assignment.urlshortener.analytics.dto.AnalyticsResponse;
import com.assignment.urlshortener.common.exception.ResourceNotFoundException;
import com.assignment.urlshortener.url.UrlMapping;
import com.assignment.urlshortener.url.UrlMappingRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.HexFormat;
import java.util.UUID;

@Service
public class AnalyticsService {
    private final ClickEventRepository clickEventRepository;
    private final UrlMappingRepository urlMappingRepository;

    public AnalyticsService(ClickEventRepository clickEventRepository, UrlMappingRepository urlMappingRepository) {
        this.clickEventRepository = clickEventRepository;
        this.urlMappingRepository = urlMappingRepository;
    }

    @Transactional
    public void recordClick(UrlMapping mapping, HttpServletRequest request) {
        UrlMapping managedMapping = urlMappingRepository.findById(mapping.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Short URL not found: " + mapping.getShortCode()));
        managedMapping.incrementClickCount();
        ClickEvent event = new ClickEvent(
                UUID.randomUUID(),
                managedMapping,
                Instant.now(),
                truncate(request.getHeader("Referer"), 2048),
                truncate(request.getHeader("User-Agent"), 512),
                hash(clientIp(request))
        );
        clickEventRepository.save(event);
    }

    @Transactional(readOnly = true)
    public AnalyticsResponse getAnalytics(String shortCode) {
        UrlMapping mapping = urlMappingRepository.findByShortCode(shortCode)
                .orElseThrow(() -> new ResourceNotFoundException("Short URL not found: " + shortCode));
        Instant last24Hours = Instant.now().minus(24, ChronoUnit.HOURS);
        Instant lastHour = Instant.now().minus(1, ChronoUnit.HOURS);
        Instant startOfToday = Instant.now().truncatedTo(ChronoUnit.DAYS);
        return new AnalyticsResponse(
                mapping.getShortCode(),
                mapping.getOriginalUrl(),
                clickEventRepository.countByUrlMapping(mapping),
                clickEventRepository.countByUrlMappingAndClickedAtAfter(mapping, last24Hours),
                clickEventRepository.countByUrlMappingAndClickedAtAfter(mapping, lastHour),
                clickEventRepository.countByUrlMappingAndClickedAtAfter(mapping, startOfToday),
                clickEventRepository.countDistinctIpAddressHashByUrlMapping(mapping),
                clickEventRepository.findTop10ByUrlMappingOrderByClickedAtDesc(mapping)
                        .stream()
                        .map(event -> new AnalyticsResponse.ClickSummary(event.getClickedAt()))
                        .toList()
        );
    }

    private String clientIp(HttpServletRequest request) {
        String forwardedFor = request.getHeader("X-Forwarded-For");
        if (forwardedFor != null && !forwardedFor.isBlank()) {
            return forwardedFor.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }

    private String hash(String value) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            return HexFormat.of().formatHex(digest.digest(value.getBytes(StandardCharsets.UTF_8)));
        } catch (NoSuchAlgorithmException exception) {
            throw new IllegalStateException("SHA-256 unavailable", exception);
        }
    }

    private String truncate(String value, int maxLength) {
        if (value == null) {
            return null;
        }
        return value.length() <= maxLength ? value : value.substring(0, maxLength);
    }
}
