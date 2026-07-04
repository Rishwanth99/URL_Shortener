# Decision Log

This log records engineer-owned decisions. AI assistance was used to accelerate drafting, compare options, and identify validation gaps, but final decisions and trade-offs were made by the engineer.

## D-001: Use Java and Spring Boot

Decision: Use Java 21 and Spring Boot 3.

Rationale: The engineer is a Java developer and can explain the implementation, testing, and trade-offs confidently. Spring Boot also supports modular REST APIs, validation, persistence, testing, and documentation in a production-aligned way.

Trade-off: Spring Boot has more setup than a minimal Node service, but it better matches the engineer's strengths and enterprise expectations.

PDF alignment: production-grade engineering, modular/testable/reliable code, engineer ownership.

## D-002: Include a Small Frontend

Decision: Include a React/Vite/Tailwind frontend as a demo client.

Rationale: The PDF does not require a frontend, but a small UI makes the prototype easier to demonstrate end to end.

Trade-off: Frontend scope is intentionally limited so engineering evidence and backend quality remain the priority.

PDF alignment: working prototype, output generation, setup instructions.

## D-008: Use Tailwind for Frontend Styling

Decision: Use Tailwind CSS for the frontend UI.

Rationale: Tailwind keeps styling consistent and reviewable without building a large custom design system. The engineer selected it after confirming the assignment benefits from a polished demo client while still keeping backend engineering and validation as the main focus.

Trade-off: Tailwind adds frontend build dependencies, but the improved UI consistency is worth it for a reviewable prototype.

PDF alignment: working prototype, engineering output generation, clarity of final deliverable.

## D-009: Include Maven Wrapper

Decision: Include Maven Wrapper for the Spring Boot backend.

Rationale: The engineer selected Maven as the standard Java build tool and added the wrapper so reviewers can run builds consistently without preinstalling Maven globally.

Trade-off: The wrapper adds a few small files to the repository, but it improves reproducibility and reviewability.

PDF alignment: setup instructions, validation, production-grade engineering discipline.

## D-003: PostgreSQL Runtime and H2 Tests

Decision: Use PostgreSQL for runtime and H2 for automated tests.

Rationale: PostgreSQL gives realistic relational behavior for the prototype. H2 keeps tests fast and simple.

Trade-off: H2 is not a perfect PostgreSQL substitute, so Flyway migrations and integration paths need attention.

PDF alignment: validation, reliability, production readiness.

## D-004: Flyway Migrations

Decision: Use Flyway instead of Hibernate schema generation.

Rationale: Schema migration history is reviewable and production-minded.

Trade-off: Slightly more initial setup.

PDF alignment: architecture quality, maintainability, safe change management.

## D-005: No Authentication in Prototype

Decision: Exclude user accounts/authentication.

Rationale: The assignment scenario focuses on URL shortening, analytics, reliability, and AI-assisted engineering execution. Authentication would expand scope without being necessary for the stated requirements.

Trade-off: No per-user ownership or private link management.

PDF alignment: scope control, trade-off clarity, defensible reasoning.

## D-006: In-Memory Rate Limiting

Decision: Implement simple in-memory per-client rate limiting.

Rationale: It demonstrates reliability protection without adding distributed infrastructure.

Trade-off: It is not sufficient for multi-instance production deployment.

PDF alignment: reliability features, risk control, limitations.

## D-007: HTTPS Destination URLs Only

Decision: Accept only HTTPS destination URLs.

Rationale: This reduces unsafe redirects and supports secure-by-default behavior.

Trade-off: HTTP-only legacy sites are rejected.

PDF alignment: secure engineering, validation, risk control.
