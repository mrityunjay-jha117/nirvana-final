# Setup & Deployment

## Prerequisites

- Node.js (a recent LTS)
- A Cloudflare account + Wrangler configured
- A PostgreSQL database reachable from Cloudflare Workers (typically via Prisma Accelerate)

## Install dependencies

From `backend/`:

- `npm install`

## Local development

From `backend/`:

- `npm run dev`

This runs `wrangler dev`.

## Deploy

From `backend/`:

- `npm run deploy`

This runs `wrangler deploy --minify`.

## Generate Cloudflare bindings types

From `backend/`:

- `npm run cf-typegen`

This runs `wrangler types --env-interface CloudflareBindings`.

## Prisma notes

This project uses Prisma Client for edge:

- `@prisma/client` and `@prisma/client/edge`
- `@prisma/extension-accelerate` via `.$extends(withAccelerate())`

Database connection uses `DATABASE_URL` from bindings.

## Common issues

### 401/403 from protected endpoints

Most endpoints require `Authorization: Bearer <jwt>`.

- Ensure you are passing the header.
- Ensure the token is signed with the same `JWT_SECRET` configured in Wrangler.

### Cloudinary upload fails

- Ensure `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` are set.
- Signature calculation includes `folder`, `timestamp`, and `transformation`.

### Gemini generate fails

- Ensure `GEMINI_API` is set.
- If Google returns non-2xx, the endpoint returns `{ error, details }` with the upstream status.
