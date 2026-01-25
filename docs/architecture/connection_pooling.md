# Connection Pooling

## What connection pooling is

Opening a database connection is relatively expensive (handshake, authentication, TLS setup when applicable). Connection pooling is the practice of keeping a **bounded** set of database connections open and **reusing** them across requests instead of creating a new connection for every request.

Connection pooling improves:

- Performance (fewer connection setups)
- Stability (predictable number of concurrent DB connections)
- Database safety (avoids exhausting database connection limits)

---

## Traditional connection pooling (stateful servers)

This is how pooling typically works in long-running server processes such as Express, Spring, Django, etc.

### How it works (step-by-step)

1. The application server starts.
2. It creates a database connection pool (for example, 10 open connections to PostgreSQL).
3. For each incoming request:
   - Borrow a connection from the pool
   - Execute the query
   - Return the connection to the pool
4. Connections stay open and are reused for many requests.

### Why it works

- The server process is long-running.
- Memory stays alive.
- TCP connections can remain open and be reused.

### Block diagram

```text
                              (long-running process)
Client
     |
     v
App Server (Express / Django / Spring)
     |
     |  (in-process pool)
     +--> DB Conn #1  ----+
     +--> DB Conn #2  ----+--> PostgreSQL
     +--> DB Conn #3  ----+
     ...
     +--> DB Conn #10 ----+
```

---

## Why this breaks in serverless environments (Cloudflare Workers)

Cloudflare Workers are serverless/edge functions with constraints that make traditional in-process pooling unreliable.

### Key serverless constraints

- No guaranteed long-lived process per instance
- No guaranteed memory reuse across requests
- No reliable long-lived TCP connection lifecycle
- Instances can scale up/down rapidly under load

### What happens without special handling

If each request (or each new Worker instance) attempts to open its own direct database connection, you can get a rapid increase in concurrent connections.

```text
Request #1 --> Worker instance A --> opens DB connection --> PostgreSQL
Request #2 --> Worker instance B --> opens DB connection --> PostgreSQL
Request #3 --> Worker instance C --> opens DB connection --> PostgreSQL
...
```

### Failure mode: connection explosion

Under traffic spikes, the system can attempt to open too many concurrent database connections.

```text
Many Clients
     |
     v
Many Worker instances (autoscaled)
     |
     +--> direct DB connection per instance  ---> PostgreSQL

Result: DB connection limit pressure / exhaustion
```

This pattern is commonly referred to as **connection explosion**.

---

## How Prisma Accelerate changes pooling for serverless

In this project, the Cloudflare Workers backend uses **Prisma Client (edge)** with **Prisma Accelerate**. The key idea is that connection pooling is moved out of the Worker runtime and handled by a shared layer.

### High-level architecture

```text
Cloudflare Workers (stateless)
     |
     |  (queries)
     v
Prisma Accelerate (shared/global connection management)
     |
     |  (bounded DB connections)
     v
PostgreSQL
```

### How it works (step-by-step)

1. A Worker receives an API request.
2. The Worker executes a Prisma query.
3. Prisma routes the query through Prisma Accelerate.
4. Prisma Accelerate maintains a shared pool of database connections and reuses them.
5. PostgreSQL sees a controlled number of connections even during traffic spikes.

### Block diagram (many Workers, bounded DB connections)

```text
Many Clients
     |
     v
Many Worker instances
     |
     |  (no direct TCP pool in Workers)
     v
Prisma Accelerate
     |
     +--> DB Conn #1  ----+
     +--> DB Conn #2  ----+--> PostgreSQL
     +--> DB Conn #3  ----+
     ...
     +--> DB Conn #10 ----+
```

### Summary

- Traditional servers: pooling is typically **in-process**.
- Serverless/edge: in-process pooling is unreliable; direct DB connections can lead to **connection explosion**.
- With Prisma Accelerate: pooling is **externalized**, allowing serverless Workers to query PostgreSQL safely and predictably.
