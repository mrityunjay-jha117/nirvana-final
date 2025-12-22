# User / Author API

Base path: `/api/v1/user`

Router source: [src/routes/author.ts](../src/routes/author.ts)

## Auth model

- `POST /signup` and `POST /signin` return a JWT in the response.
- `GET /me` requires `Authorization: Bearer <jwt>`.
- `GET /author/:id` is public (no JWT required in current implementation).

## Endpoints

### POST `/signup`

Creates an `Author` record and returns a JWT.

Request body (validated by `signupSchema` from `@mrityunjay__jha117/reload_common`):

- Fields depend on the shared Zod schema; typically includes `email`, `password`, and optional profile fields.

Responses:

- `200` `{ "jwt": "..." }`
- `400` `{ "error": "Invalid input", "details": ... }`
- `500` `{ "error": "Signup failed", "detail": "..." }`

### POST `/signin`

Authenticates an existing author and returns a JWT.

Request body (validated by `signinSchema`):

- `email: string`
- `password: string`

Responses:

- `200` `{ "jwt": "..." }`
- `400` invalid input
- `403` invalid email or password
- `500` internal error

### GET `/me`

Returns the authenticated author profile.

Headers:

- `Authorization: Bearer <jwt>`

Responses:

- `200` `{ "name": string|null, "email": string, "image": string|null, "about": string|null, "id": string }`
- `403` missing/invalid/expired token
- `404` author not found

### GET `/author/:id`

Returns paginated blogs for a specific author id.

Path params:

- `id`: author id

Query params:

- `page` (default `1`)
- `limit` (default `6`)

Responses:

- `200` `{ blogs: Blog[], total: number, page: number, limit: number, totalPages: number }`
- `404` when no blogs exist for that author
- `500` internal error
