import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { z } from "zod";

export const messageRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    authorId: string;
  };
}>();

// Zod schema for validation
const chatSchema = z.object({
  message: z.string().min(1),
  isBot: z.boolean()
});

// Middleware for auth and setting authorId
messageRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader) {
    return c.json({ error: "Authorization header missing" }, 403);
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

  try {
    const payload = await verify(token, c.env.JWT_SECRET);
    if (!payload || typeof payload.id !== "string") {
      return c.json({ error: "Invalid token structure" }, 403);
    }
    c.set("authorId", payload.id);
    await next();
  } catch (err) {
    return c.json({ error: "Invalid token" }, 403);
  }
});

// Route to save chat message
messageRouter.post("/chat/add", async (c) => {
  const body = await c.req.json();
  const parsed = chatSchema.safeParse(body);

  if (!parsed.success) {
    return c.json({ error: "Invalid input", details: parsed.error.format() }, 400);
  }

  const { message, isBot } = parsed.data;
  const authorId = c.get("authorId");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const saved = await prisma.chat.create({
      data: {
        message,
        isBot,
        authorId,
      },
    });

    return c.json({ success: true, chat: saved }, 201);
  } catch (e) {
    return c.json({ error: "Failed to save chat", details: String(e) }, 500);
  }
});
// Route to get all chats for the logged-in author
messageRouter.get("/chat/all", async (c) => {
  const authorId = c.get("authorId");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const chats = await prisma.chat.findMany({
      where: { authorId },
      orderBy: { createdAt: "asc" }, // assuming you added createdAt field
    });

    return c.json({ success: true, chats });
  } catch (e) {
    return c.json({ error: "Failed to fetch chats", details: String(e) }, 500);
  }
});

export default messageRouter;
