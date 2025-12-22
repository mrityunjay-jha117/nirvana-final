# Service Overview

## What this service is

The `backend/` folder is a Cloudflare Workers service built with:

- **Hono** for routing and request/response handling
- **Prisma Client (edge)** + **Prisma Accelerate extension** for PostgreSQL access
- **JWT** for API authentication (via `Authorization: Bearer <token>`)
- **Cloudinary** for image upload (signed upload)
- **Google Gemini** API for text generation

The entrypoint is [src/index.ts](../src/index.ts).

## High-level capabilities

- Author registration and sign-in, returning a JWT
- Blog CRUD + search + stats + buffered likes
- Cloudinary-backed image upload
- Chat message persistence (per-author)
- Gemini text generation proxy endpoint

## Base URL and routing

Routes are mounted under `/api/v1/*`:

- `/api/v1/user` → [src/routes/author.ts](../src/routes/author.ts)
- `/api/v1/blog` → [src/routes/blog.ts](../src/routes/blog.ts)
- `/api/v1/image` → [src/routes/image.ts](../src/routes/image.ts)
- `/api/v1/message` → [src/routes/message.ts](../src/routes/message.ts)
- `/api/v1/gemini` → [src/routes/gemini.ts](../src/routes/gemini.ts)

## CORS

CORS is applied for `/api/*` in [src/index.ts](../src/index.ts) using Hono’s CORS middleware. The current configuration is permissive (`origin: "*"`).
