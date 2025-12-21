# Message Routes

## Table of Contents

- [GET /api/messages/users](#get-apimessagesusers)
- [GET /api/messages/:id](#get-apimessagesid)
- [POST /api/messages/send/:id](#post-apimessagessendid)

---

### GET /api/messages/users

Retrieves all friends of the authenticated user (users available for chat in the sidebar).

**Authentication Required:** Yes (Protected by `protectRoute` middleware)

**Request Body:** None

**URL Parameters:** None

**Query Parameters:** None

**Success Response (200 OK):**

```json
[
  {
    "_id": "6584a3b2c9d8f12e4a5b6790",
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    "friends": ["john.doe@example.com", "alice.wonder@example.com"]
  },
  {
    "_id": "6584a3b2c9d8f12e4a5b6791",
    "name": "Bob Wilson",
    "email": "bob.wilson@example.com",
    "friends": ["john.doe@example.com", "charlie.brown@example.com"]
  }
]
```

**Note:** Password field is excluded from the response.

**Error Responses:**

**401 Unauthorized:**

```json
{
  "message": "Unauthorized - No Token Provided"
}
```

**500 Internal Server Error:**

```json
{
  "error": "Internal server error"
}
```

**Testing with cURL:**

```bash
curl -X GET http://localhost:5001/api/messages/users \
  -b cookies.txt
```

**Testing with JavaScript (Fetch):**

```javascript
fetch("http://localhost:5001/api/messages/users", {
  method: "GET",
  credentials: "include",
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```

---

### GET /api/messages/:id

Retrieves all messages exchanged between the authenticated user and another user.

**Authentication Required:** Yes (Protected by `protectRoute` middleware)

**Request Body:** None

**URL Parameters:**

- `id` (required): Email of the user to get messages with

**Query Parameters:** None

**Sample Request:**

```
GET /api/messages/jane.smith@example.com
```

**Success Response (200 OK):**

```json
[
  {
    "_id": "6584a3b2c9d8f12e4a5b6792",
    "senderId": "john.doe@example.com",
    "receiverId": "jane.smith@example.com",
    "text": "Hey! How are you?",
    "image": null,
    "createdAt": "2024-12-18T10:30:00.000Z",
    "updatedAt": "2024-12-18T10:30:00.000Z"
  },
  {
    "_id": "6584a3b2c9d8f12e4a5b6793",
    "senderId": "jane.smith@example.com",
    "receiverId": "john.doe@example.com",
    "text": "I'm doing great! Thanks for asking.",
    "image": null,
    "createdAt": "2024-12-18T10:32:00.000Z",
    "updatedAt": "2024-12-18T10:32:00.000Z"
  },
  {
    "_id": "6584a3b2c9d8f12e4a5b6794",
    "senderId": "john.doe@example.com",
    "receiverId": "jane.smith@example.com",
    "text": "Check out this photo!",
    "image": "https://res.cloudinary.com/demo/image/upload/v1234567890/sample.jpg",
    "createdAt": "2024-12-18T10:35:00.000Z",
    "updatedAt": "2024-12-18T10:35:00.000Z"
  }
]
```

**Error Responses:**

**403 Forbidden - Not Friends:**

```json
{
  "message": "You can only chat with friends"
}
```

**401 Unauthorized:**

```json
{
  "message": "Unauthorized - No Token Provided"
}
```

**500 Internal Server Error:**

```json
{
  "error": "Internal server error"
}
```

**Testing with cURL:**

```bash
curl -X GET http://localhost:5001/api/messages/jane.smith@example.com \
  -b cookies.txt
```

**Testing with JavaScript (Fetch):**

```javascript
fetch("http://localhost:5001/api/messages/jane.smith@example.com", {
  method: "GET",
  credentials: "include",
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```

---

### POST /api/messages/send/:id

Sends a message (text and/or image) to another user. Real-time notification via WebSocket if the receiver is online.

**Authentication Required:** Yes (Protected by `protectRoute` middleware)

**Request Body:**

```json
{
  "text": "string (optional if image is provided)",
  "image": "string (optional, base64 encoded image)"
}
```

**URL Parameters:**

- `id` (required): Email of the user to send message to

**Sample Request 1 - Text Only:**

```
POST /api/messages/send/jane.smith@example.com
```

```json
{
  "text": "Hello! How's your day going?"
}
```

**Sample Request 2 - Text with Image:**

```
POST /api/messages/send/jane.smith@example.com
```

```json
{
  "text": "Check out this picture!",
  "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
}
```

**Sample Request 3 - Image Only:**

```
POST /api/messages/send/jane.smith@example.com
```

```json
{
  "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
}
```

**Success Response (201 Created):**

```json
{
  "_id": "6584a3b2c9d8f12e4a5b6795",
  "senderId": "john.doe@example.com",
  "receiverId": "jane.smith@example.com",
  "text": "Hello! How's your day going?",
  "image": null,
  "createdAt": "2024-12-18T10:40:00.000Z",
  "updatedAt": "2024-12-18T10:40:00.000Z"
}
```

**Success Response with Image:**

```json
{
  "_id": "6584a3b2c9d8f12e4a5b6796",
  "senderId": "john.doe@example.com",
  "receiverId": "jane.smith@example.com",
  "text": "Check out this picture!",
  "image": "https://res.cloudinary.com/demo/image/upload/v1234567890/sample.jpg",
  "createdAt": "2024-12-18T10:42:00.000Z",
  "updatedAt": "2024-12-18T10:42:00.000Z"
}
```

**Error Responses:**

**403 Forbidden - Not Friends:**

```json
{
  "message": "You can only message friends"
}
```

**401 Unauthorized:**

```json
{
  "message": "Unauthorized - No Token Provided"
}
```

**500 Internal Server Error:**

```json
{
  "error": "Internal server error"
}
```

**Testing with cURL - Text Only:**

```bash
curl -X POST http://localhost:5001/api/messages/send/jane.smith@example.com \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "text": "Hello! How'\''s your day going?"
  }'
```

**Testing with cURL - Text with Image:**

```bash
curl -X POST http://localhost:5001/api/messages/send/jane.smith@example.com \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "text": "Check out this picture!",
    "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
  }'
```

**Testing with JavaScript (Fetch):**

```javascript
// Text message
fetch("http://localhost:5001/api/messages/send/jane.smith@example.com", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
  body: JSON.stringify({
    text: "Hello! How's your day going?",
  }),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));

// Image message
const fileInput = document.querySelector('input[type="file"]');
const file = fileInput.files[0];
const reader = new FileReader();

reader.onloadend = () => {
  fetch("http://localhost:5001/api/messages/send/jane.smith@example.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      text: "Check out this picture!",
      image: reader.result, // base64 encoded image
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
};

reader.readAsDataURL(file);
```
