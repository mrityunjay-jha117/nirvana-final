# Authentication Routes

## Table of Contents

- [POST /api/auth/signup](#post-apiauthsignup)
- [POST /api/auth/login](#post-apiauthlogin)
- [POST /api/auth/logout](#post-apiauthlogout)
- [GET /api/auth/check](#get-apiauthcheck)
- [PUT /api/auth/tomodachi](#put-apiauthtomodachi)
- [PUT /api/auth/remove-tomodachi](#put-apiauthremove-tomodachi)

---

### POST /api/auth/signup

Creates a new user account and returns user information with a JWT token.

**Authentication Required:** No

**Request Body:**

```json
{
  "name": "string (required)",
  "email": "string (required)",
  "password": "string (required, min 8 characters)"
}
```

**Sample Request:**

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

**Success Response (201 Created):**

```json
{
  "_id": "6584a3b2c9d8f12e4a5b6789",
  "name": "John Doe",
  "email": "john.doe@example.com"
}
```

**Note:** JWT token is set in HTTP-only cookie automatically.

**Error Responses:**

**400 Bad Request - Missing Fields:**

```json
{
  "message": "All fields are required"
}
```

**400 Bad Request - Short Password:**

```json
{
  "message": "Password must be at least 8 characters"
}
```

**400 Bad Request - Email Exists:**

```json
{
  "message": "Email already exists"
}
```

**500 Internal Server Error:**

```json
{
  "message": "Internal Server Error"
}
```

**Testing with cURL:**

```bash
curl -X POST http://localhost:5001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "securePassword123"
  }' \
  -c cookies.txt
```

**Testing with JavaScript (Fetch):**

```javascript
fetch("http://localhost:5001/api/auth/signup", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include", // Important for cookies
  body: JSON.stringify({
    name: "John Doe",
    email: "john.doe@example.com",
    password: "securePassword123",
  }),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```

---

### POST /api/auth/login

Authenticates an existing user and returns user information with a JWT token.

**Authentication Required:** No

**Request Body:**

```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Sample Request:**

```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

**Success Response (200 OK):**

```json
{
  "_id": "6584a3b2c9d8f12e4a5b6789",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "friends": ["jane.smith@example.com", "bob.wilson@example.com"]
}
```

**Note:** JWT token is set in HTTP-only cookie automatically.

**Error Responses:**

**400 Bad Request - Invalid Credentials:**

```json
{
  "message": "Invalid credentials"
}
```

**500 Internal Server Error:**

```json
{
  "message": "Internal Server Error"
}
```

**Testing with cURL:**

```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "securePassword123"
  }' \
  -c cookies.txt
```

**Testing with JavaScript (Fetch):**

```javascript
fetch("http://localhost:5001/api/auth/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
  body: JSON.stringify({
    email: "john.doe@example.com",
    password: "securePassword123",
  }),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```

---

### POST /api/auth/logout

Logs out the current user by clearing the JWT token cookie.

**Authentication Required:** No (but typically called when authenticated)

**Request Body:** None

**Success Response (200 OK):**

```json
{
  "message": "Logged out successfully"
}
```

**Error Responses:**

**500 Internal Server Error:**

```json
{
  "message": "Internal Server Error"
}
```

**Testing with cURL:**

```bash
curl -X POST http://localhost:5001/api/auth/logout \
  -b cookies.txt \
  -c cookies.txt
```

**Testing with JavaScript (Fetch):**

```javascript
fetch("http://localhost:5001/api/auth/logout", {
  method: "POST",
  credentials: "include",
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```

---

### GET /api/auth/check

Verifies if the current user is authenticated and returns user information.

**Authentication Required:** Yes (Protected by `protectRoute` middleware)

**Request Body:** None

**URL Parameters:** None

**Success Response (200 OK):**

```json
{
  "_id": "6584a3b2c9d8f12e4a5b6789",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "friends": ["jane.smith@example.com", "bob.wilson@example.com"]
}
```

**Error Responses:**

**401 Unauthorized - No Token:**

```json
{
  "message": "Unauthorized - No Token Provided"
}
```

**401 Unauthorized - Invalid Token:**

```json
{
  "message": "Unauthorized - Invalid Token"
}
```

**404 Not Found - User Not Found:**

```json
{
  "message": "User not found"
}
```

**500 Internal Server Error:**

```json
{
  "message": "Internal Server Error"
}
```

**Testing with cURL:**

```bash
curl -X GET http://localhost:5001/api/auth/check \
  -b cookies.txt
```

**Testing with JavaScript (Fetch):**

```javascript
fetch("http://localhost:5001/api/auth/check", {
  method: "GET",
  credentials: "include",
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```

---

### PUT /api/auth/tomodachi

Adds a friend to the authenticated user's friend list. This creates a mutual friendship between both users.

**Authentication Required:** Yes (Protected by `protectRoute` middleware)

**Request Body:**

```json
{
  "friendId": "string (required, email of the friend to add)"
}
```

**Sample Request:**

```json
{
  "friendId": "jane.smith@example.com"
}
```

**Success Response (200 OK):**

```json
{
  "message": "Tomodachi added successfully",
  "friends": ["jane.smith@example.com", "bob.wilson@example.com"]
}
```

**Error Responses:**

**400 Bad Request - Adding Self:**

```json
{
  "message": "You cannot add yourself as a friend"
}
```

**400 Bad Request - Already Friends:**

```json
{
  "message": "User is already your tomodachi"
}
```

**404 Not Found - User Not Found:**

```json
{
  "message": "User not found"
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
  "message": "Internal Server Error"
}
```

**Testing with cURL:**

```bash
curl -X PUT http://localhost:5001/api/auth/tomodachi \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "friendId": "jane.smith@example.com"
  }'
```

**Testing with JavaScript (Fetch):**

```javascript
fetch("http://localhost:5001/api/auth/tomodachi", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
  body: JSON.stringify({
    friendId: "jane.smith@example.com",
  }),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```

---

### PUT /api/auth/remove-tomodachi

Removes a friend from the authenticated user's friend list. This removes the friendship from both users.

**Authentication Required:** Yes (Protected by `protectRoute` middleware)

**Request Body:**

```json
{
  "friendId": "string (required, email of the friend to remove)"
}
```

**Sample Request:**

```json
{
  "friendId": "jane.smith@example.com"
}
```

**Success Response (200 OK):**

```json
{
  "message": "Friend removed successfully",
  "friends": ["bob.wilson@example.com"]
}
```

**Error Responses:**

**400 Bad Request - Not Friends:**

```json
{
  "message": "User is not your friend"
}
```

**404 Not Found - User Not Found:**

```json
{
  "message": "User not found"
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
  "message": "Internal Server Error"
}
```

**Testing with cURL:**

```bash
curl -X PUT http://localhost:5001/api/auth/remove-tomodachi \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "friendId": "jane.smith@example.com"
  }'
```

**Testing with JavaScript (Fetch):**

```javascript
fetch("http://localhost:5001/api/auth/remove-tomodachi", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
  body: JSON.stringify({
    friendId: "jane.smith@example.com",
  }),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```
