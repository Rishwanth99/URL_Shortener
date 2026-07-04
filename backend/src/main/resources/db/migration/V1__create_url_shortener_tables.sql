CREATE TABLE url_mappings (
    id UUID PRIMARY KEY,
    original_url VARCHAR(2048) NOT NULL,
    short_code VARCHAR(32) NOT NULL UNIQUE,
    custom_alias BOOLEAN NOT NULL,
    active BOOLEAN NOT NULL,
    click_count BIGINT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NULL
);

CREATE INDEX idx_url_mappings_short_code ON url_mappings(short_code);
CREATE INDEX idx_url_mappings_active_expires_at ON url_mappings(active, expires_at);

CREATE TABLE click_events (
    id UUID PRIMARY KEY,
    url_mapping_id UUID NOT NULL,
    clicked_at TIMESTAMP WITH TIME ZONE NOT NULL,
    referrer VARCHAR(2048),
    user_agent VARCHAR(512),
    ip_address_hash VARCHAR(64),
    CONSTRAINT fk_click_events_url_mapping
        FOREIGN KEY (url_mapping_id)
        REFERENCES url_mappings(id)
);

CREATE INDEX idx_click_events_url_mapping_id ON click_events(url_mapping_id);
CREATE INDEX idx_click_events_clicked_at ON click_events(clicked_at);

