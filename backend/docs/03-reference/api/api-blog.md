# Blog API

Base path: `/api/v1/blog`

Router source: [src/routes/blog.ts](../src/routes/blog.ts)

## Auth model

All routes in this router are protected by a router-level middleware:

- Requires `Authorization: Bearer <jwt>`
- Verifies JWT with `JWT_SECRET`
- Sets `authorId` in Hono context for handlers

Common auth failures:

- `403` `{ "message": "Authorization header missing" }`
- `403` `{ "message": "Invalid token" }`

## Endpoints

### GET `/bulk`

Returns all blogs including `author` and `location`.

Response:

- `200` `{ blogs: Blog[] }`

### GET `/paginated_bulk`

Returns blogs paginated.

Query params:

- `page` (default `1`)
- `limit` (default `6`)

Response:

- `200` `{ blogs, total, page, limit, totalPages }`

### GET `/search/author?name=...`

Search blogs by author name (case-insensitive contains).

- `400` missing `name`

### GET `/search/title?title=...`

Search blogs by blog title (case-insensitive contains).

### GET `/search/location?city=...&country=...`

Search by location (validated by `locationQuerySchema`).

- `400` invalid query

### GET `/stats`

Aggregate stats for the authenticated author.

Response:

- `200` `{ totalLikes: number, blogCount: number }`

### GET `/:id`

Fetch a single blog by id.

- `404` blog not found

### POST `/`

Create a blog post.

Request body is validated by `createBlogSchema`. It includes blog content and location fields.

Response:

- `200` `{ id: string }`

Notes:

- The handler upserts `Location` by `(city, country)`.
- The handler checks that the `authorId` exists in the database.

### PUT `/:id`

Update a blog.

- Validated by `updateBlogSchema`
- Enforces ownership (`existingBlog.authorId === authorId`)

### DELETE `/:id`

Delete a blog.

- Enforces ownership

### POST `/like`

Registers a like in an in-memory buffer.

Body:

- `{ blogId: string }`

Behavior:

- Buffers likes and flushes to DB every `BUFFER_LIMIT` (currently `10`).
