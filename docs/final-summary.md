# Final Engineering Summary

## Summary

A URL shortener prototype was built with a Spring Boot backend, PostgreSQL persistence, Flyway migrations, Swagger API documentation, automated tests, Docker Compose runtime, and a React/Tailwind demo frontend.

This deliverable is intentionally scoped as a reviewable prototype rather than a full production platform, with clear boundaries around authentication, multi-instance scaling, and operational hardening. The work demonstrates engineering judgment through deliberate trade-offs, disciplined scope control, and a strong focus on reliability, validation, and clear documentation over unnecessary complexity.

The implementation prioritizes correctness and observability in the core flow: creating a short URL, validating input, enforcing safe redirects, tracking analytics, and preventing invalid or inactive links from being served. The overall design keeps the system easy to understand and test while still reflecting production-minded choices such as database migrations, structured error handling, and a simple rate-limiting layer.

The repository also includes engineering documentation required by the assignment: requirements analysis, architecture, execution plan, decision log, scenarios, AI-assisted execution trace, testing approach, risk register, and final summary.

## Artifacts

- Backend REST API.
- React frontend demo.
- PostgreSQL database schema migration.
- Docker Compose setup.
- Automated backend tests.
- Frontend smoke tests and Vitest setup.
- GitHub Actions CI workflow.
- Swagger API documentation.
- Assignment evidence docs.

## Key Decisions

- Java/Spring Boot was selected because the engineer is a Java developer and can own the implementation confidently.
- PostgreSQL was selected for runtime realism.
- H2 was selected for fast tests.
- Flyway was selected for reviewable schema management.
- A small frontend was included for demo value and is now organized with a feature-oriented React structure for maintainability.
- Authentication was excluded to preserve assignment focus.

## Validation

- Integration tests cover create, redirect, analytics, duplicate alias, validation, and deactivation behavior.
- Unit test covers short code generation format.
- A frontend smoke test now validates the app shell and is exercised in both local and CI workflows.
- Swagger provides API reviewability.
- Docker Compose provides an end-to-end run path.
- The frontend now exposes a fuller demo workflow: create, inspect, analytics, deactivate, and live refresh behavior.
- Backend tests passed locally through Maven Wrapper: 7 tests, 0 failures.
- Frontend build passed locally with Tailwind enabled.
- CI runs backend tests and frontend verification automatically on push and pull request.

## Risks and Trade-Offs

The implementation made several deliberate trade-offs to stay focused on the assignment while preserving reliability and reviewability:

- In-memory rate limiting was chosen for the prototype because it is simple, predictable, and sufficient for local/demo use, but it is not suitable for a multi-instance production environment.
- Authentication and per-user ownership were intentionally excluded to keep the scope aligned with the assignment’s core URL-shortening and reliability goals rather than turning the prototype into a full user-management system.
- H2-based tests were selected for fast feedback and repeatability, while PostgreSQL remains the runtime choice for a more production-like experience.
- Analytics were kept intentionally lightweight so the assignment could demonstrate measurement and traceability without introducing unnecessary operational or architectural overhead.
- The frontend was kept small and focused on the essential demo experience rather than expanding into a broad product UI.

## Assumptions

- The assignment values engineering process evidence as much as the working prototype.
- The reviewer can run the project locally using Docker or installed Maven.
- Java/Spring Boot is acceptable because the PDF does not mandate a language.

## Limitations

- No login/user management.
- No distributed cache.
- No asynchronous analytics pipeline.
- No production deployment pipeline.

## Ownership Statement

AI was used to assist with requirement analysis, scaffolding, documentation drafts, and validation thinking. The final decisions, review, and acceptance of trade-offs remained with the engineer.
