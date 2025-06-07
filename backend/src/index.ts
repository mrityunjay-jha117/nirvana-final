// src/index.ts

import { Hono } from "hono";
import userRouter from "./routes/author";
import blogRouter from "./routes/blog";
import imageRouter from "./routes/image";
import { cors } from "hono/cors";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
  };
}>();

app.use(
  "/api/*",
  cors({
    origin: "*",
  })
);

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);
app.route("/api/v1/image", imageRouter);
app.get("/", (c) => {
  return c.html(`
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: black;
            
          }
          p {
 
  color: white;
  font-size: 0.9rem; 
}

          a {
          color:white
            text-decoration: underline;
          }
          
        </style>
      </head>
      <body>
        <p>
          Hello, this is my backend for the Nirvana project.<br/>
          Here you can get more info on 
          <a href="https://github.com/mrityunjay-jha117" target="_blank">GitHub</a>.
        </p>
      </body>
    </html>
  `);
});

export default app;
