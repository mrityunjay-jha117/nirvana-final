import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign, verify } from "hono/jwt";
import { signupSchema, signinSchema } from "@mrityunjay__jha117/reload_common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    // Validate using Zod
    const parsed = signupSchema.safeParse(body);
    if (!parsed.success) {
      return c.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        400
      );
    }

    const author = await prisma.author.create({
      data: parsed.data,
    });

    const token = await sign({ id: author.id }, c.env.JWT_SECRET);
    return c.json({ jwt: token });
  } catch (err) {
    console.error("Signup error:", err);
    return c.json({ error: "Signup failed", detail: String(err) }, 500);
  }
});

userRouter.post("/signin", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    // Validate using Zod
    const parsed = signinSchema.safeParse(body);
    if (!parsed.success) {
      return c.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        400
      );
    }

    const { email, password } = parsed.data;

    const author = await prisma.author.findUnique({
      where: { email },
    });

    if (!author || author.password !== password) {
      return c.json({ error: "Invalid email or password" }, 403);
    }

    const jwt = await sign({ id: author.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
  } catch (err) {
    console.error("Signin error:", err);
    return c.json({ error: "Internal server error" }, 500);
  }
});
// GET /me route to get the authenticated author details
userRouter.get("/me", async (c) => {
  // Retrieve the Authorization header from the request.
  const authHeader = c.req.header("Authorization");
  if (!authHeader) {
    return c.json({ error: "Authorization header missing" }, 403);
  }

  // Extract the token by removing the "Bearer " prefix if present.
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

  try {
    // Verify the JWT token using the secret from the environment variables.
    const payload = await verify(token, c.env.JWT_SECRET);
    if (!payload || typeof payload.id !== "string") {
      return c.json({ error: "Invalid token payload" }, 403);
    }

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    // Find the author using the id stored in the token.
    const author = await prisma.author.findUnique({
      where: { id: payload.id },
    });

    if (!author) {
      return c.json({ error: "Author not found" }, 404);
    }

    // Return the author details. Adjust or add fields as needed.
    return c.json({
      name: author.name,
      email: author.email,
      image: author.image,
      about: author.about,
      id: author.id,
    });
  } catch (err) {
    console.error("Token verification error:", err);
    return c.json(
      { error: "Invalid or expired token", detail: String(err) },
      403
    );
  }
});
userRouter.get("/author/:id", async (c) => {
  const { id } = c.req.param(); // author ID

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  // Get pagination parameters from query, with defaults
  const page = Number(c.req.query("page") || 1);
  const limit = Number(c.req.query("limit") || 6);
  const skip = (page - 1) * limit;

  try {
    // Fetch paginated blogs for this author
    const blogs = await prisma.blog.findMany({
      where: {
        authorId: id,
      },
      skip,
      take: limit,
      include: {
        location: true,
        author: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    // Get total count of blogs for this author
    const total = await prisma.blog.count({
      where: {
        authorId: id,
      },
    });

    if (total === 0) {
      c.status(404);
      return c.json({ message: "No blogs found for this author." });
    }

    return c.json({
      blogs,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    c.status(500);
    return c.json({
      message: "Internal Server Error",
      error: (error as Error).message,
    });
  }
});


export default userRouter;
