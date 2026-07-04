package com.assignment.urlshortener.url;

import com.assignment.urlshortener.common.exception.AliasAlreadyExistsException;
import com.assignment.urlshortener.common.exception.ResourceNotFoundException;
import com.assignment.urlshortener.common.exception.UrlExpiredException;
import com.assignment.urlshortener.config.AppProperties;
import com.assignment.urlshortener.url.dto.CreateUrlRequest;
import com.assignment.urlshortener.url.dto.UrlResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.UUID;

@Service
public class UrlService {
    private static final int MAX_GENERATION_ATTEMPTS = 5;

    private final UrlMappingRepository repository;
    private final ShortCodeGenerator shortCodeGenerator;
    private final AppProperties properties;

    public UrlService(UrlMappingRepository repository, ShortCodeGenerator shortCodeGenerator, AppProperties properties) {
        this.repository = repository;
        this.shortCodeGenerator = shortCodeGenerator;
        this.properties = properties;
    }

    @Transactional
    public UrlResponse create(CreateUrlRequest request) {
        boolean customAlias = request.customAlias() != null && !request.customAlias().isBlank();
        String shortCode = customAlias ? request.customAlias() : generateUniqueCode();
        if (repository.existsByShortCode(shortCode)) {
            throw new AliasAlreadyExistsException(shortCode);
        }

        UrlMapping mapping = new UrlMapping(
                UUID.randomUUID(),
                request.originalUrl(),
                shortCode,
                customAlias,
                true,
                0,
                Instant.now(),
                request.expiresAt()
        );
        return toResponse(repository.save(mapping));
    }

    @Transactional(readOnly = true)
    public UrlResponse getByShortCode(String shortCode) {
        return repository.findByShortCode(shortCode)
                .map(this::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Short URL not found: " + shortCode));
    }

    @Transactional
    public UrlMapping getActiveForRedirect(String shortCode) {
        UrlMapping mapping = repository.findByShortCode(shortCode)
                .orElseThrow(() -> new ResourceNotFoundException("Short URL not found: " + shortCode));
        if (!mapping.isActive()) {
            throw new ResourceNotFoundException("Short URL is inactive: " + shortCode);
        }
        if (mapping.isExpired(Instant.now())) {
            throw new UrlExpiredException(shortCode);
        }
        return mapping;
    }

    @Transactional
    public void deactivate(String shortCode) {
        UrlMapping mapping = repository.findByShortCode(shortCode)
                .orElseThrow(() -> new ResourceNotFoundException("Short URL not found: " + shortCode));
        mapping.deactivate();
    }

    public UrlResponse toResponse(UrlMapping mapping) {
        String baseUrl = properties.baseUrl().replaceAll("/+$", "");
        return new UrlResponse(
                mapping.getOriginalUrl(),
                mapping.getShortCode(),
                baseUrl + "/" + mapping.getShortCode(),
                mapping.isCustomAlias(),
                mapping.isActive(),
                mapping.getClickCount(),
                mapping.getCreatedAt(),
                mapping.getExpiresAt()
        );
    }

    private String generateUniqueCode() {
        for (int attempt = 0; attempt < MAX_GENERATION_ATTEMPTS; attempt++) {
            String code = shortCodeGenerator.generate();
            if (!repository.existsByShortCode(code)) {
                return code;
            }
        }
        throw new IllegalStateException("Unable to generate unique short code");
    }
}

