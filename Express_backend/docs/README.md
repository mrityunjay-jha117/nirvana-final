# Chat Application API Documentation

## Base URL : http://localhost:{PORT}

## Table of Contents

1. [Authentication Routes](./auth.md)
2. [Message Routes](./message.md)

---

## Authentication

This API uses **JWT (JSON Web Token)** authentication stored in HTTP-only cookies.

### Authentication Header

Protected routes require a valid JWT token in the cookies. The token is automatically set during login/signup and cleared during logout.

**Cookie Name:** `jwt`

---

## Data Models

### User Model

```javascript
{
  _id: ObjectId,
  email: String (unique, required),
  name: String (required),
  password: String (required, min 8 characters),
  friends: Array of Strings (email addresses)
}
```

### Message Model

```javascript
{
  _id: ObjectId,
  senderId: String (email, required),
  receiverId: String (email, required),
  text: String (optional),
  image: String (URL, optional),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

---

## WebSocket Events

The application uses Socket.IO for real-time messaging.

### Client to Server Events

**Connection:**

```javascript
socket.on("connection", (socket) => {
  // User connected
});
```

### Server to Client Events

**New Message Event:**

```javascript
socket.on("newMessage", (message) => {
  // Received when a friend sends you a message
  console.log("New message:", message);
});
```

**Sample Event Data:**

```json
{
  "_id": "6584a3b2c9d8f12e4a5b6796",
  "senderId": "jane.smith@example.com",
  "receiverId": "john.doe@example.com",
  "text": "Hey there!",
  "image": null,
  "createdAt": "2024-12-18T10:45:00.000Z",
  "updatedAt": "2024-12-18T10:45:00.000Z"
}
```

---

## Testing Workflows

### Complete User Flow Example

**1. Sign up two users:**

```bash
# User 1
curl -X POST http://localhost:5001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@test.com","password":"password123"}' \
  -c alice-cookies.txt

# User 2
curl -X POST http://localhost:5001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Bob","email":"bob@test.com","password":"password123"}' \
  -c bob-cookies.txt
```

**2. Alice adds Bob as a friend:**

```bash
curl -X PUT http://localhost:5001/api/auth/tomodachi \
  -H "Content-Type: application/json" \
  -b alice-cookies.txt \
  -d '{"friendId":"bob@test.com"}'
```

**3. Alice gets her friends list:**

```bash
curl -X GET http://localhost:5001/api/messages/users \
  -b alice-cookies.txt
```

**4. Alice sends a message to Bob:**

```bash
curl -X POST http://localhost:5001/api/messages/send/bob@test.com \
  -H "Content-Type: application/json" \
  -b alice-cookies.txt \
  -d '{"text":"Hi Bob! How are you?"}'
```

**5. Bob gets messages from Alice:**

```bash
curl -X GET http://localhost:5001/api/messages/alice@test.com \
  -b bob-cookies.txt
```

**6. Bob replies to Alice:**

```bash
curl -X POST http://localhost:5001/api/messages/send/alice@test.com \
  -H "Content-Type: application/json" \
  -b bob-cookies.txt \
  -d '{"text":"Hi Alice! I'\''m doing great, thanks!"}'
```

---

## Error Handling

All endpoints follow a consistent error handling pattern:

### Common HTTP Status Codes

- **200 OK**: Request successful
- **201 Created**: Resource created successfully
- **400 Bad Request**: Invalid request data
- **401 Unauthorized**: Authentication required or failed
- **403 Forbidden**: Authenticated but not authorized for this action
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server-side error

### Error Response Format

All errors return a JSON object with a message field:

```json
{
  "message": "Error description"
}
```

Or:

```json
{
  "error": "Error description"
}
```

---

## Important Notes

1. **Friend System (Tomodachi):**

   - Friendship is mutual - when you add someone as a friend, they automatically get you as a friend too
   - You can only send messages to users who are your friends
   - You can only view messages from users who are your friends

2. **Authentication:**

   - JWT tokens are stored in HTTP-only cookies for security
   - Tokens are automatically included in requests when using `credentials: 'include'`
   - Always include the `-b cookies.txt` flag in cURL for authenticated requests

3. **Image Upload:**

   - Images must be base64 encoded
   - Images are uploaded to Cloudinary
   - The response contains the Cloudinary URL

4. **Real-time Features:**

   - Messages are delivered in real-time via WebSocket if the receiver is online
   - Connect to Socket.IO at the same base URL as the API

5. **CORS:**
   - The API is configured to accept requests from `http://localhost:5173`
   - Credentials (cookies) are enabled for cross-origin requests

---

## Environment Variables

Required environment variables:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

