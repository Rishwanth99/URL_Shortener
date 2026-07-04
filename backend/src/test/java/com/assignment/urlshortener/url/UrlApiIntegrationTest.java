package com.assignment.urlshortener.url;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.matchesPattern;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class UrlApiIntegrationTest {
    @Autowired
    private MockMvc mockMvc;

    @Test
    void createRedirectAndReadAnalytics() throws Exception {
        mockMvc.perform(post("/api/v1/urls")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "originalUrl": "https://example.com/articles/engineering",
                                  "customAlias": "eng-docs"
                                }
                                """))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.shortCode", equalTo("eng-docs")))
                .andExpect(jsonPath("$.shortUrl", equalTo("http://localhost:8080/eng-docs")))
                .andExpect(jsonPath("$.clickCount", equalTo(0)));

        mockMvc.perform(get("/eng-docs"))
                .andExpect(status().isFound())
                .andExpect(header().string("Location", "https://example.com/articles/engineering"));

        mockMvc.perform(get("/api/v1/urls/eng-docs/analytics"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.shortCode", equalTo("eng-docs")))
                .andExpect(jsonPath("$.totalClicks", equalTo(1)))
                .andExpect(jsonPath("$.clicksLast24Hours", equalTo(1)))
                .andExpect(jsonPath("$.clicksLastHour", equalTo(1)))
                .andExpect(jsonPath("$.clicksToday", equalTo(1)))
                .andExpect(jsonPath("$.uniqueVisitors", equalTo(1)));
    }

    @Test
    void generatedCodeIsReturnedWhenAliasIsAbsent() throws Exception {
        mockMvc.perform(post("/api/v1/urls")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "originalUrl": "https://example.com/products"
                                }
                                """))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.shortCode", matchesPattern("^[A-Za-z0-9]{7}$")))
                .andExpect(jsonPath("$.customAlias", equalTo(false)));
    }

    @Test
    void duplicateAliasReturnsConflict() throws Exception {
        String payload = """
                {
                  "originalUrl": "https://example.com/first",
                  "customAlias": "dupe-code"
                }
                """;

        mockMvc.perform(post("/api/v1/urls").contentType(MediaType.APPLICATION_JSON).content(payload))
                .andExpect(status().isCreated());

        mockMvc.perform(post("/api/v1/urls").contentType(MediaType.APPLICATION_JSON).content(payload))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.message", equalTo("Short code or alias already exists: dupe-code")));
    }

    @Test
    void invalidUrlReturnsValidationError() throws Exception {
        mockMvc.perform(post("/api/v1/urls")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "originalUrl": "http://insecure.example.com"
                                }
                                """))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message", equalTo("Request validation failed")));
    }

    @Test
    void deactivatedUrlNoLongerRedirects() throws Exception {
        mockMvc.perform(post("/api/v1/urls")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "originalUrl": "https://example.com/archive",
                                  "customAlias": "archive1"
                                }
                                """))
                .andExpect(status().isCreated());

        mockMvc.perform(delete("/api/v1/urls/archive1"))
                .andExpect(status().isNoContent());

        mockMvc.perform(get("/archive1"))
                .andExpect(status().isNotFound());
    }
}

