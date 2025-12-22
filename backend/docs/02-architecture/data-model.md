# Data Model (Prisma)

The Prisma schema is in [prisma/schema.prisma](../prisma/schema.prisma).

## Entities

### Author

Represents an authenticated user.

Key fields:

- `id` (UUID string)
- `email` (unique)
- `password` (stored as plain string in current schema)
- `name`, `image`, `about` (optional/profile)

Relations:

- `blogs: Blog[]`
- `chats: Chat[]`

### Blog

A blog post authored by an Author.

Key fields:

- `blogHead`, `title`, `description1`, `description2`
- `images: String[]`
- `likes: Int`
- `footerImage: String?`

Relations:

- `authorId` → `Author`
- `locationId` → `Location`

### Location

A reusable location object referenced by blogs.

- Unique constraint on `(city, country)`.

### Chat

Stored chat history rows.

- `message: String`
- `isBot: Boolean`
- `createdAt: DateTime`
- `authorId` → `Author`

## Security note

Passwords appear to be stored in plaintext in the current model and route logic. For production, typically you would hash passwords and compare hashes.
