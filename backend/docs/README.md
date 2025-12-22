# Backend Documentation (Cloudflare Workers)

This folder documents the `backend/` service (Cloudflare Workers + Hono + Prisma).

## Start here

- Overview: ./00-overview/overview.md
- Setup (local + deploy): ./01-setup/setup.md
- Configuration & environment variables: ./01-setup/configuration.md
- Architecture (request flow, auth, database, error handling): ./02-architecture/architecture.md

## API Reference

All API routes are mounted under `/api/v1` in [src/index.ts](../src/index.ts).

- User/Author API: ./03-reference/api/api-user.md
- Blog API: ./03-reference/api/api-blog.md
- Image API: ./03-reference/api/api-image.md
- Message (chat history) API: ./03-reference/api/api-message.md
- Gemini (text generation) API: ./03-reference/api/api-gemini.md

## Data model

- Prisma schema: ../prisma/schema.prisma
- Data model notes: ./02-architecture/data-model.md
