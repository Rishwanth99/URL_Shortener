# Execution Plan

## Phase 1: Requirements and Scope

- Read assignment PDF.
- Normalize product requirements and engineering requirements.
- Identify ambiguous areas and record assumptions.
- Confirm Java/Spring Boot as the backend stack.

Acceptance criteria:

- Requirements document exists.
- Scope is explicitly tied to assignment evaluation criteria.
- Human decision ownership is stated.

## Phase 2: Backend Foundation

- Create Spring Boot project structure.
- Add Maven dependencies.
- Configure PostgreSQL, H2 tests, Flyway, validation, and Swagger.
- Add Dockerfile and Docker Compose.

Acceptance criteria:

- Backend can compile with Maven.
- Database schema is migration-managed.
- Swagger UI is available.

## Phase 3: Core URL Shortener

- Implement URL mapping entity.
- Implement create API.
- Implement short code generation.
- Implement custom alias uniqueness.
- Implement redirect endpoint.

Acceptance criteria:

- A valid HTTPS URL can be shortened.
- Generated and custom short codes work.
- Redirect returns `302 Found`.
- Duplicate alias returns `409 Conflict`.

## Phase 4: Brownfield Enhancement

- Add expiration support.
- Add deactivation.
- Add consistent error handling.
- Add rate limiting.

Acceptance criteria:

- Expired URLs do not redirect.
- Deactivated URLs do not redirect.
- Error responses are predictable.
- Rate limit returns `429 Too Many Requests`.

## Phase 5: Analytics

- Add click event entity.
- Record redirect click events.
- Expose analytics summary API.
- Hash IP address before storage.

Acceptance criteria:

- Redirect increments analytics.
- Analytics endpoint returns total clicks and last-24-hour clicks.

## Phase 6: Frontend Demo

- Build minimal React UI.
- Support create URL, copy/open URL, and analytics lookup.

Acceptance criteria:

- User can complete the demo flow through the browser.

## Phase 7: Validation and Documentation

- Add automated tests.
- Add architecture, scenario, testing, risk, decision, and final summary docs.
- Run quality gates.

Acceptance criteria:

- `mvn test` passes in an environment with Maven.
- Documentation covers all assignment deliverables.

