# Serverless Backends

## Definition

A **serverless backend** is an application backend that runs on a platform where:

- You deploy code (functions/handlers) rather than managing servers.
- The platform automatically provisions, runs, and scales execution.
- You are typically billed based on usage (requests, execution time) rather than fixed server capacity.

In practice, “serverless” does not mean “no servers”. It means the **servers are abstracted away** and managed by the provider.

---

## Why serverless backends are used

Serverless backends are commonly used to:

- Reduce operational overhead (no VM patching, no manual scaling).
- Scale quickly for bursty traffic (marketing launches, spiky usage).
- Improve latency (especially with edge platforms that execute close to users).
- Ship features faster by focusing on application code instead of infrastructure.

---

## Common serverless execution model

Most serverless platforms execute code in short-lived or elastic compute environments.

### High-level request path

```text
Client
	|
	v
Provider Edge / Load Balancer
	|
	v
Serverless Runtime (function/worker instance)
	|
	v
Managed services (DB, cache, object storage, queues)
```

### Key properties

- **Stateless by default**: each invocation should be able to run independently.
- **Elastic scaling**: the platform can create more instances when traffic increases.
- **Cold starts (platform-dependent)**: new instances may add startup latency.
- **Short execution limits (platform-dependent)**: functions may have time limits.

---

## Advantages

### Operational advantages

- **No server management**: patching, scaling, and availability are handled by the provider.
- **Autoscaling**: capacity adapts to demand with minimal manual intervention.
- **Cost alignment**: pay primarily for actual usage (varies by provider and traffic shape).

### Architectural advantages

- **Strong fault isolation** (when designed correctly): failures tend to be isolated to one function or route.
- **Easy horizontal scaling**: stateless handlers scale out naturally.
- **Edge execution (for edge serverless)**: requests can be served close to users.

---

## Trade-offs and constraints

Serverless backends introduce constraints that affect architecture decisions.

### State and connection management

- **No reliable in-memory state** across requests.
- **Long-lived TCP connections are often not supported or not reliable**, depending on the platform.
- **Database connection pooling may break** when every invocation tries to open its own connection.

This is why serverless systems often require:

- Externalized connection management (for example Prisma Accelerate for PostgreSQL)
- Caches (CDN, edge cache, Redis) for frequently accessed data
- Queues/background workers for non-interactive processing

### Observability and debugging

- Logs and tracing are distributed across many ephemeral instances.
- Debugging often depends on structured logging and correlation IDs.

### Platform limits

- Execution time limits
- Memory/CPU limits
- Request/response size limits
- Differences in runtime APIs compared to traditional Node.js servers

---

## Serverless vs traditional backend (block diagram comparison)

### Traditional stateful service

```text
Client
	|
	v
Load Balancer
	|
	v
Long-running App Servers (fixed instances)
	|    |    |
	v    v    v
DB / Cache
```

### Serverless service

```text
Client
	|
	v
Provider Edge / Router
	|
	v
Ephemeral / Elastic Function Instances (scale to 0..N)
	|
	v
DB / Cache / External services
```

---

## How this project uses a serverless backend

In this repository, the **Edge API Service** is implemented as a **Cloudflare Workers** deployment using the **Hono** framework.

### Why Cloudflare Workers is a good fit here

- Low-latency API responses due to global edge execution.
- Easy horizontal scaling for read-heavy API routes (for example blog feed fetching).
- Reduced operational burden compared to managing server fleets.


---

## When serverless is the wrong tool

Serverless is not always the best choice. Typical cases where a traditional server is preferable include:

- **Long-lived WebSocket connections** (stateful real-time systems)
- Workloads requiring **stable local state**
- Very high sustained throughput where reserved capacity may be cheaper
- Scenarios requiring low-level networking control or custom runtime constraints

This is why this project uses a separate **Express + Socket.IO** service for real-time chat.

---

