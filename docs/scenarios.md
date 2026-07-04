# Required Scenarios

## Scenario 1: Greenfield

Problem: Build a URL shortener from scratch.

Engineer decomposition:

- Define API contract.
- Define data model.
- Implement create URL flow.
- Implement redirect flow.
- Add validation and persistence.
- Add tests.

Execution:

- Created Spring Boot backend structure.
- Added `UrlMapping` entity and repository.
- Added `POST /api/v1/urls`.
- Added `GET /{shortCode}` redirect.
- Added generated code and custom alias support.

Validation:

- Integration test creates a URL and verifies redirect.
- Unit test verifies short code format.
- API exposed through Swagger.

## Scenario 2: Brownfield

Problem: Improve the initial implementation as if it were an existing codebase.

Engineer decomposition:

- Identify affected modules: URL service, persistence model, redirect flow, error handling, tests.
- Add reliability features without breaking existing API behavior.
- Preserve clean module boundaries.

Execution:

- Added expiration support.
- Added deactivation endpoint.
- Added analytics tracking.
- Added consistent exception handling.
- Added rate limiting.

Validation:

- Duplicate alias test returns conflict.
- Invalid URL test returns validation error.
- Deactivated URL test verifies redirect stops.
- Analytics test verifies redirect count.

## Scenario 3: Ambiguous Requirement

Ambiguous statement: "Short URLs should be reliable, safe, and measurable."

Engineer interpretation:

- Reliable means predictable redirects, active/inactive status, expiration behavior, and database-backed persistence.
- Safe means HTTPS-only destination validation, alias validation, rate limiting, and non-leaky error responses.
- Measurable means click count and recent click event analytics.

Execution:

- Enforced HTTPS URL validation.
- Enforced URL-safe custom aliases.
- Added click event table.
- Hashed client IP address before storage.
- Added analytics endpoint.

Validation:

- Automated tests cover core reliable/safe/measurable paths.
- Risk register documents remaining limitations.

