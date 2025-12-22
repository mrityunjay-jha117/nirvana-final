# System Architecture

Nirvana is built using a carefully designed microservices architecture that emphasizes separation of concerns, scalability, and performance, ensuring that each part of the system is optimized for its specific workload.

[System Architecture Diagram](./architecture.png)

---

## Client Layer

At the client layer, the frontend application is developed using React with TypeScript and powered by Vite, providing a fast development experience and highly optimized production builds.

This frontend is responsible for rendering the user interface, handling routing and user interactions, managing client-side state, and communicating with backend services through both HTTP and WebSocket connections.

Zustand is used specifically for managing real-time chat state, while Axios handles REST-based communication with backend APIs and the Socket.IO client maintains persistent connections for live messaging features.

Tailwind CSS is used to maintain a consistent, utility-first styling approach across the application, allowing rapid UI development while keeping the codebase clean and maintainable.

---

## Backend Architecture

On the backend, Nirvana is divided into two primary services, each serving a distinct purpose.

---

### Edge API Service

The first is a Cloudflare Workers–based backend that acts as the core API layer for the platform. This service is built using the Hono framework, chosen for its minimal overhead, fast execution, and strong compatibility with edge environments.

Running on Cloudflare’s global edge network, this backend ensures low-latency responses by executing close to the end user, making it ideal for read-heavy and latency-sensitive operations such as fetching blog posts, handling user authentication, and serving content feeds.

It manages user authentication and authorization using JWTs, performs full CRUD operations on blogs, coordinates image uploads through Cloudinary, supports blog search and filtering, and interacts with a PostgreSQL database using Prisma ORM.

A critical architectural decision here is the use of Prisma Accelerate for database access, which enables efficient connection pooling in a serverless environment.

Since Cloudflare Workers do not support long-lived TCP connections, traditional database connection pooling is not feasible.

Prisma Accelerate solves this by introducing a global, managed connection pool that sits between the Workers runtime and the PostgreSQL server, reusing a limited number of persistent connections across requests.

This prevents connection exhaustion, reduces cold-start latency, and ensures stable performance even under high concurrency, while also enabling edge-safe database access without violating serverless constraints.

---

### Real-Time Service

The second backend service is a traditional Node.js server built with Express, dedicated entirely to real-time communication and user presence features.

This service maintains persistent WebSocket connections using Socket.IO, making it suitable for features that require continuous, bidirectional communication such as live chat, typing indicators, and online status tracking.

Unlike the serverless backend, this service runs in a stateful environment, allowing it to efficiently manage socket connections and in-memory session data.

It handles authentication for chat interactions using JWTs, securely manages user credentials with bcrypt, persists chat messages and conversation history in MongoDB, tracks online users in real time, and supports profile updates that need immediate propagation to connected clients.

MongoDB is intentionally chosen here due to its flexible document schema and high write throughput, which align well with the unpredictable structure and frequency of real-time chat messages.

---

## Data Layer

At the data layer, Nirvana employs a polyglot persistence strategy by using both PostgreSQL and MongoDB, selecting each database based on the nature of the data it stores.

PostgreSQL, accessed via Prisma from the Hono backend, is used for structured, relational data such as users, blogs, locations, and authentication records.

It benefits from strong consistency guarantees, relational constraints, and ACID compliance for critical operations.

MongoDB, accessed via Mongoose from the Express backend, stores chat messages and conversation metadata.

It enables rapid inserts, flexible schema evolution, and efficient querying of message threads.

This dual-database approach allows the platform to scale each data store independently while ensuring that each subsystem uses the database technology best suited to its access patterns.

Ultimately, this results in a system that is robust, scalable, and optimized for both content delivery and real-time interaction.
