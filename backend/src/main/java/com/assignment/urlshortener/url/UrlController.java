package com.assignment.urlshortener.url;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.assignment.urlshortener.url.dto.CreateUrlRequest;
import com.assignment.urlshortener.url.dto.UrlResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/urls")
@Tag(name = "URL Shortener", description = "Create, retrieve and deactivate short URLs")
public class UrlController {
    private final UrlService service;

    public UrlController(UrlService service) {
        this.service = service;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(
            summary = "Create a short URL",
            description = "Create a shortened URL from a valid HTTPS destination. You can optionally provide a custom alias and an expiration timestamp."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Short URL created successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = UrlResponse.class), examples = @ExampleObject(name = "created", value = "{\"originalUrl\":\"https://example.com/products/123\",\"shortCode\":\"shop123\",\"shortUrl\":\"http://localhost:8080/shop123\",\"customAlias\":true,\"active\":true,\"clickCount\":0,\"createdAt\":\"2026-07-04T12:47:19Z\",\"expiresAt\":\"2026-12-31T23:59:59Z\"}"))),
            @ApiResponse(responseCode = "400", description = "Validation failed", content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\"message\":\"originalUrl must be a valid HTTPS URL\"}"))),
            @ApiResponse(responseCode = "409", description = "Custom alias already exists", content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\"message\":\"customAlias already exists\"}")))
    })
    public UrlResponse create(@Valid @RequestBody CreateUrlRequest request) {
        return service.create(request);
    }

    @GetMapping("/{shortCode}")
    @Operation(summary = "Get a short URL by code", description = "Retrieve the stored metadata for an existing short URL.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Short URL metadata returned", content = @Content(mediaType = "application/json", schema = @Schema(implementation = UrlResponse.class), examples = @ExampleObject(name = "fetched", value = "{\"originalUrl\":\"https://example.com/products/123\",\"shortCode\":\"shop123\",\"shortUrl\":\"http://localhost:8080/shop123\",\"customAlias\":true,\"active\":true,\"clickCount\":12,\"createdAt\":\"2026-07-04T12:47:19Z\",\"expiresAt\":\"2026-12-31T23:59:59Z\"}"))),
            @ApiResponse(responseCode = "404", description = "Short URL not found", content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\"message\":\"Short URL not found\"}")))
    })
    public UrlResponse get(@Parameter(description = "Short code of the URL to retrieve", example = "shop123") @PathVariable String shortCode) {
        return service.getByShortCode(shortCode);
    }

    @DeleteMapping("/{shortCode}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Deactivate a short URL", description = "Deactivate an existing short URL so it can no longer be used for redirects.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Short URL deactivated successfully"),
            @ApiResponse(responseCode = "404", description = "Short URL not found", content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\"message\":\"Short URL not found\"}")))
    })
    public void deactivate(@Parameter(description = "Short code of the URL to deactivate", example = "shop123") @PathVariable String shortCode) {
        service.deactivate(shortCode);
    }
}

