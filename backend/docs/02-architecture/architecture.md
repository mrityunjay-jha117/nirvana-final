# Architecture

## Entry point and routers

The Worker entrypoint is [src/index.ts](../src/index.ts). It:

1. Creates a Hono app with typed `Bindings`.
2. Applies CORS middleware to `/api/*`.
3. Mounts routers under `/api/v1/*`.

## Request flow

1. Client calls a route under `/api/v1/...`.
2. For protected routes, the route module extracts the `Authorization` header.
3. JWT is verified with `JWT_SECRET`.
4. The decoded author id is stored in Hono context (`c.set("authorId", ...)`).
5. Route handler uses Prisma Client (edge) with `DATABASE_URL`.

## Authentication model

- Auth uses JWT (Hono `sign`/`verify`).
- Token is generally returned as `{ jwt: "..." }`.
- Protected routes expect `Authorization: Bearer <token>`.

Notable differences by module:

- [src/routes/author.ts](../src/routes/author.ts) verifies tokens only for `/me`.
- [src/routes/blog.ts](../src/routes/blog.ts) applies a router-level middleware (`use("/*")`) to protect all routes in the module.
- [src/routes/message.ts](../src/routes/message.ts) similarly protects all routes in the module.

## Database access

- Uses `PrismaClient` from `@prisma/client/edge`.
- Each handler constructs a Prisma client using `datasourceUrl: c.env.DATABASE_URL`.
- Most handlers extend with Accelerate: `.$extends(withAccelerate())`.

## Error handling

Most routes follow this pattern:

- Validate input (often via Zod schemas from `@mrityunjay__jha117/reload_common`).
- Return `400` for validation issues.
- Return `403` for missing/invalid auth.
- Return `404` when a record is not found.
- Return `500` for unexpected failures.

## Performance note: buffered likes

The blog router includes an in-memory `likeBuffer` to batch DB updates. This is best-effort:

- Cloudflare Workers can spin down and lose in-memory state.
- Under concurrency, counts may be approximate.

If strict correctness is required, move to a durable counter (KV/Durable Object/DB transaction).
