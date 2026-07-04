# AI-Assisted URL Shortener

This repository contains a production-minded URL shortener prototype built for the AI-Proficient Software Engineer assignment.

The project demonstrates engineer-led execution assisted by AI: requirement interpretation, task decomposition, implementation, validation, scenario handling, documentation, risk management, and final review preparation. All technical decisions are documented as human engineering decisions; AI is used as an accelerator for drafting, implementation support, test ideation, and review.

## Tech Stack

- Backend: Java 21, Spring Boot 3, Spring Web, Spring Data JPA
- Database: PostgreSQL for local/demo runtime, H2 for tests
- Migration: Flyway
- Validation: Jakarta Bean Validation
- API Docs: springdoc-openapi / Swagger UI
- Tests: JUnit 5, Spring Boot Test, MockMvc, Vitest, React Testing Library
- Frontend: React, TypeScript, Vite
- Runtime: Docker Compose

## Prerequisites

- JDK 21 or newer
- Node.js 20+
- Docker Desktop

Maven does not need to be installed globally. The backend includes Maven Wrapper files.

On Windows, ensure `JAVA_HOME` points to your JDK. Example:

```powershell
$env:JAVA_HOME='C:\Program Files\Java\jdk-25'
```

## Run With Docker Compose

```bash
docker compose up --build
```

Services:

- Backend API: `http://localhost:8080`
- Swagger UI: `http://localhost:8080/swagger-ui.html`
- Frontend: `http://localhost:5173`
- PostgreSQL: `localhost:5432`

## Run Backend Locally

```bash
cd backend
mvnw.cmd spring-boot:run
```

The default local profile expects PostgreSQL. For tests, H2 is used automatically.

## Run Frontend Locally

```bash
cd frontend
npm install
npm run dev
```

## Run Tests

```bash
cd backend
mvnw.cmd test
```

```bash
cd frontend
npm install
npm run test -- --run
npm run build
```

## Continuous Integration

A GitHub Actions workflow is included at `.github/workflows/ci.yml`. It runs the backend test suite and the frontend test/build pipeline on pushes and pull requests.

Verified locally on July 4, 2026:

- Backend: `mvnw.cmd test` passed, 7 tests, 0 failures.
- Frontend: `npm run build` passed.
- Frontend smoke test: added and wired into the local and CI test flow.
- Frontend dependency audit: 0 vulnerabilities.

## API Summary

- `POST /api/v1/urls` - create a short URL
- `GET /{shortCode}` - redirect to the original URL
- `GET /api/v1/urls/{shortCode}` - fetch URL metadata
- `GET /api/v1/urls/{shortCode}/analytics` - fetch analytics summary
- `DELETE /api/v1/urls/{shortCode}` - deactivate a short URL

## Frontend Architecture

The React client now uses a feature-oriented structure under `frontend/src/features/shortener` with:

- `ShortenerApp.tsx` as the page-level composition layer
- a dedicated hook for URL-shortening state and lifecycle logic
- focused components for form entry, lookup actions, and analytics cards
- centralized API and validation helpers for maintainability

The UI supports:

- creating short URLs with optional aliases and expiration dates
- viewing short-link details
- loading analytics summaries
- deactivating links
- refreshing analytics with a live-update mode

## Assignment Evidence

The assignment asks for a reviewable engineering outcome, not only working code. Supporting evidence is included in:

- [Requirements](docs/requirements.md)
- [Architecture](docs/architecture.md)
- [Execution Plan](docs/execution-plan.md)
- [Decision Log](docs/decision-log.md)
- [Scenarios](docs/scenarios.md)
- [AI-Assisted Execution](docs/ai-assisted-execution.md)
- [Testing](docs/testing.md)
- [Risk Register](docs/risk-register.md)
- [Final Summary](docs/final-summary.md)
