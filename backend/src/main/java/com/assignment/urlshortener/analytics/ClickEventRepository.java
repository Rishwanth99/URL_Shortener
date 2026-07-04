package com.assignment.urlshortener.analytics;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.assignment.urlshortener.url.UrlMapping;

public interface ClickEventRepository extends JpaRepository<ClickEvent, UUID> {
    long countByUrlMapping(UrlMapping urlMapping);

    List<ClickEvent> findTop10ByUrlMappingOrderByClickedAtDesc(UrlMapping urlMapping);

    long countByUrlMappingAndClickedAtAfter(UrlMapping urlMapping, Instant clickedAt);

    long countDistinctIpAddressHashByUrlMapping(UrlMapping urlMapping);
}

