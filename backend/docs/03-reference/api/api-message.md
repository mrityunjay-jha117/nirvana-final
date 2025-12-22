# Message (Chat History) API

Base path: `/api/v1/message`

Router source: [src/routes/message.ts](../src/routes/message.ts)

## Auth model

All routes require:

- `Authorization: Bearer <jwt>`

The router verifies JWT and sets `authorId` in context.

## Endpoints

### POST `/chat/add`

Persists a chat message for the authenticated author.

Request body:

- `message: string` (non-empty)
- `isBot: boolean`

Responses:

- `201` `{ success: true, chat: Chat }`
- `400` invalid input
- `403` auth missing/invalid
- `500` save failure

### GET `/chat/all`

Fetches all chats for the authenticated author.

Response:

- `200` `{ success: true, chats: Chat[] }`

Chats are ordered ascending by `createdAt`.
