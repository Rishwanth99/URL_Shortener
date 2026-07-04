# Risk Register

| Risk | Impact | Mitigation | Remaining Limitation |
|---|---|---|---|
| Short code collision | Create request may fail | Retry generated code up to five attempts | Very high traffic would need stronger strategy |
| Open redirect abuse | Unsafe destination could be shortened | Require HTTPS URL validation | Does not verify destination reputation |
| Alias squatting | Users can reserve aliases | Unique constraint and conflict response | No ownership/authentication in prototype |
| Analytics privacy | IP address could be sensitive | Store SHA-256 hash instead of raw IP | Hashes may still be considered personal data in some policies |
| Rate limit bypass | Abuse from many IPs | Per-client in-memory rate limit | Not distributed across instances |
| H2/PostgreSQL differences | Tests may miss database-specific issues | Use Flyway and PostgreSQL in Docker Compose | Full confidence requires PostgreSQL integration tests |
| Frontend scope creep | Could distract from evaluation criteria | Keep UI focused on demo flow | UI is not a full product experience |
| Missing Maven locally | Tests cannot run from current shell | Document prerequisite and support Docker build | Local verification depends on Maven installation |

