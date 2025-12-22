# System Architecture

Nirvana follows a microservices architecture pattern with a clear separation of concerns across multiple backend services. The platform is designed to handle different workloads efficiently by distributing them across specialized services, each optimized for its specific purpose.

![Architecture Diagram](architecture.png)

## Architecture Components

### 1. Frontend Application

The client-side application is built with React and TypeScript, running on Vite as the development and build tool. The frontend communicates with two distinct backend services depending on the operation type.

**Key Responsibilities:**

- Rendering the user interface
- Managing client-side state with Zustand for the chat backend
- Handling user interactions and routing
- Making HTTP requests to backend APIs
- Managing WebSocket connections for real-time features

**Technology Stack:**

- React 18.3 with TypeScript
- Vite for fast development and optimized builds
- Tailwind CSS for styling
- Axios for HTTP communication
- Socket.IO client for real-time messaging

### 2. Cloudflare Workers Backend (Primary API)

This serverless backend service runs on Cloudflare's edge network, providing low-latency API responses from locations close to users worldwide. It handles the core blogging functionality and content management.

**Key Responsibilities:**

- User authentication and authorization via JWT
- Blog CRUD operations (Create, Read, Update, Delete)
- Image upload coordination with Cloudinary
- Blog search and filtering
- Database queries through Prisma ORM

**Technology Stack:**

- Hono framework for routing
- Prisma Client with Accelerate extension
- PostgreSQL database
- JWT for authentication
- Cloudinary SDK for image management

### 3. Express Backend (Real-time Service)

A traditional Node.js server running Express, dedicated to handling real-time communication features. This service maintains persistent WebSocket connections and manages user presence.

**Key Responsibilities:**

- Real-time message delivery via Socket.IO
- User authentication for chat features
- Message persistence in MongoDB
- Online user tracking
- Profile management and updates

**Technology Stack:**

- Express.js framework
- MongoDB with Mongoose ODM
- Socket.IO for WebSocket connections
- JWT and bcrypt for authentication

### 4. Database Layer

The platform uses two different database systems, each chosen for its specific strengths:

**PostgreSQL (via Prisma):**

- Stores structured blog data
- Manages user profiles and authentication
- Handles location data with unique constraints
- Provides ACID compliance for critical operations

**MongoDB (via Mongoose):**

- Stores chat messages and conversation history
- Handles flexible document schemas
- Provides fast write operations for real-time messages
- Efficient querying for message threads

