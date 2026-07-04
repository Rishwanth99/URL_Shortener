# Architecture Overview

## Goal

The architecture is intentionally straightforward: a Spring Boot REST API, a relational database, and a small React demo client. The engineer selected this shape because the assignment rewards clarity, testability, reliability, and defensible decisions over novelty.

## Components

- React/Tailwind frontend: demo UI for creating URLs and viewing analytics.
- Spring REST controllers: HTTP boundary and request/response mapping.
- Service layer: business rules for creation, redirect eligibility, deactivation, and analytics.
- Repository layer: Spring Data JPA persistence abstraction.
- PostgreSQL: local/demo persistence.
- H2: test persistence.
- Flyway: repeatable schema migrations.
- Swagger UI: reviewable API contract.
- Docker Compose: production-like local runtime with backend, frontend, and PostgreSQL.

## Control Flow

### Create URL

1. Client sends `POST /api/v1/urls`.
2. Controller validates request using Jakarta Bean Validation.
3. Service checks alias uniqueness or generates a short code.
4. Repository persists the URL mapping.
5. API returns short URL metadata.

### Redirect

1. Browser calls `GET /{shortCode}`.
2. Redirect controller resolves the mapping.
3. Service verifies the URL is active and not expired.
4. Analytics service records a click event and increments count.
5. API returns `302 Found` with the destination URL.

### Analytics

1. Client calls `GET /api/v1/urls/{shortCode}/analytics`.
2. Analytics service loads URL mapping and click events.
3. API returns total clicks, last-24-hour clicks, and recent click timestamps.

## Module Boundaries

- `url`: URL mapping domain, creation, lookup, redirect eligibility.
- `analytics`: click event tracking and analytics summaries.
- `common`: error model, exception handling, rate limiting.
- `config`: application properties and cross-origin configuration.
- `redirect`: public redirect endpoint.

## Key Engineering Decisions

- The engineer chose layered architecture because it keeps the prototype reviewable and testable.
- The engineer chose Flyway because schema history is part of production-grade maintainability.
- The engineer chose PostgreSQL for runtime because it is closer to production behavior than an embedded database.
- The engineer chose H2 for tests because fast feedback matters for assignment validation.
- The engineer chose a simple in-memory rate limiter because distributed rate limiting is outside prototype scope and documented as a limitation.

## Security and Privacy Notes

- Only HTTPS destination URLs are accepted.
- IP addresses are hashed before storage for analytics.
- Validation errors are explicit, but internal exception details are not exposed.
- CORS is restricted through configuration.
- Rate limiting reduces accidental or scripted abuse during demo.
