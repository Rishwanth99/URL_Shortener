# Requirements Interpretation

## Source

The source requirement is the interview assignment PDF: "Build an AI-Assisted Software Engineering System - URL Shortener."

## Interpretation

The assignment was interpreted as requiring two connected outcomes:

1. A working URL shortener prototype that can be run and reviewed end to end.
2. Clear evidence of disciplined engineering execution and decision-making.

The second outcome is intentionally treated as first-class. The assignment evaluates requirement understanding, decomposition, execution, validation, risk control, oversight, and final summary. Code alone would not satisfy the PDF.

## Normalized Product Requirements

- Create short URLs for valid HTTPS destination URLs.
- Support generated short codes.
- Support optional custom aliases.
- Reject duplicate aliases.
- Support optional expiration timestamps.
- Redirect active and unexpired short URLs.
- Track redirect analytics.
- Expose analytics through an API.
- Allow deactivation of a short URL.
- Provide consistent validation and error responses.
- Apply basic rate limiting to protect the prototype.
- Provide API documentation through Swagger.
- Provide a small frontend for demonstration.
- Keep the frontend maintainable through a feature-oriented structure rather than a single monolithic component.
- Expose richer management actions to the demo UI, including lookup, analytics, deactivation, and live-refresh analytics.

## Normalized Engineering Requirements

- Use modular, testable code.
- Separate controller, service, repository, and domain concerns.
- Use database migrations rather than implicit schema creation.
- Use automated tests for core behavior.
- Document assumptions, limitations, risks, and trade-offs.
- Document three scenarios: greenfield, brownfield, and ambiguous.
- Maintain explicit human ownership of correctness and final decisions.
- Record AI assistance as support activity, not autonomous execution.

## Ambiguities Identified

- The PDF does not specify frontend requirements.
- The PDF does not specify authentication or user ownership.
- The PDF does not define traffic scale.
- The PDF does not prescribe a programming language.
- The PDF asks for brownfield reasoning even though the product is greenfield.

## Engineer Decisions From Ambiguities

- A small React frontend is included only as a demo client; the backend remains the primary engineering artifact.
- Authentication is excluded from the prototype to keep the scope focused on URL shortening, analytics, reliability, and AI-assisted engineering evidence.
- PostgreSQL is used for production-like local runtime, while H2 is used for fast automated tests.
- Brownfield reasoning is demonstrated by implementing enhancements after the initial URL creation and redirect flow.
- Java and Spring Boot are used because the engineer is strongest in Java and can defend the design decisions clearly.

