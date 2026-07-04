# Final Engineering Summary

## Summary

The engineer built a URL shortener prototype with a Spring Boot backend, PostgreSQL persistence, Flyway migrations, Swagger API documentation, automated tests, Docker Compose runtime, and a React/Tailwind demo frontend.

The repository also includes engineering documentation required by the assignment: requirements analysis, architecture, execution plan, decision log, scenarios, AI-assisted execution trace, testing approach, risk register, and final summary.

## Artifacts

- Backend REST API.
- React frontend demo.
- PostgreSQL database schema migration.
- Docker Compose setup.
- Automated backend tests.
- Swagger API documentation.
- Assignment evidence docs.

## Key Decisions

- Java/Spring Boot was selected because the engineer is a Java developer and can own the implementation confidently.
- PostgreSQL was selected for runtime realism.
- H2 was selected for fast tests.
- Flyway was selected for reviewable schema management.
- A small frontend was included for demo value but kept intentionally limited.
- Authentication was excluded to preserve assignment focus.

## Validation

- Integration tests cover create, redirect, analytics, duplicate alias, validation, and deactivation behavior.
- Unit test covers short code generation format.
- Swagger provides API reviewability.
- Docker Compose provides an end-to-end run path.
- Backend tests passed locally through Maven Wrapper: 7 tests, 0 failures.
- Frontend build passed locally with Tailwind enabled.

## Risks and Trade-Offs

- In-memory rate limiting is not production-ready for multiple instances.
- No authentication means no per-user URL ownership.
- H2 tests are fast but not a full substitute for PostgreSQL integration tests.
- Analytics are intentionally basic.

## Assumptions

- The assignment values engineering process evidence as much as the working prototype.
- The reviewer can run the project locally using Docker or installed Maven.
- Java/Spring Boot is acceptable because the PDF does not mandate a language.

## Limitations

- No login/user management.
- No distributed cache.
- No asynchronous analytics pipeline.
- No production deployment pipeline.

## Engineer Ownership Statement

AI was used to assist with requirement analysis, scaffolding, documentation drafts, and validation thinking. The engineer made the final decisions, reviewed outputs, accepted trade-offs, and owns the correctness and readiness of the submitted work.
