package com.assignment.urlshortener.url;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UrlMappingRepository extends JpaRepository<UrlMapping, UUID> {
    boolean existsByShortCode(String shortCode);

    Optional<UrlMapping> findByShortCode(String shortCode);
}

