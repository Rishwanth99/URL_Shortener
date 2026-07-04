package com.assignment.urlshortener.analytics;

import com.assignment.urlshortener.url.UrlMapping;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "click_events")
public class ClickEvent {
    @Id
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "url_mapping_id", nullable = false)
    private UrlMapping urlMapping;

    @Column(name = "clicked_at", nullable = false)
    private Instant clickedAt;

    @Column(length = 2048)
    private String referrer;

    @Column(name = "user_agent", length = 512)
    private String userAgent;

    @Column(name = "ip_address_hash", length = 64)
    private String ipAddressHash;

    protected ClickEvent() {
    }

    public ClickEvent(UUID id, UrlMapping urlMapping, Instant clickedAt, String referrer, String userAgent, String ipAddressHash) {
        this.id = id;
        this.urlMapping = urlMapping;
        this.clickedAt = clickedAt;
        this.referrer = referrer;
        this.userAgent = userAgent;
        this.ipAddressHash = ipAddressHash;
    }

    public Instant getClickedAt() {
        return clickedAt;
    }
}

