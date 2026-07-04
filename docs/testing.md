# Testing Approach

## Automated Tests

Backend tests use JUnit 5, Spring Boot Test, and MockMvc.
Frontend tests use Vitest with React Testing Library for a smoke test of the app shell.

Covered paths:

- Spring context startup.
- Short code format generation.
- URL creation with custom alias.
- Redirect behavior.
- Analytics count after redirect.
- Generated short code when alias is absent.
- Duplicate alias conflict.
- Invalid URL validation.
- Deactivation prevents redirect.

## Manual Validation

After starting the application:

```bash
curl -X POST http://localhost:8080/api/v1/urls \
  -H "Content-Type: application/json" \
  -d "{\"originalUrl\":\"https://example.com/articles\",\"customAlias\":\"articles\"}"
```

```bash
curl -i http://localhost:8080/articles
```

```bash
curl http://localhost:8080/api/v1/urls/articles/analytics
```

## Quality Gates

- `mvn test`
- `npm run test -- --run`
- `npm run build`
- Backend starts successfully.
- Swagger UI opens at `/swagger-ui.html`.
- Frontend can create and inspect a short URL.
- Docker Compose starts backend, frontend, and PostgreSQL.
- GitHub Actions CI runs backend tests and frontend checks on pushes and pull requests.

## Current Environment Note

Verified locally on July 4, 2026:

- Backend `mvnw.cmd test`: 7 tests run, 0 failures, 0 errors.
- Frontend `npm run build`: passed.
- Frontend smoke test: wired into the local and CI workflow.
- Frontend npm audit: 0 vulnerabilities.

The backend includes Maven Wrapper files, so global Maven is not required. On Windows, `JAVA_HOME` must be set before running the wrapper.
