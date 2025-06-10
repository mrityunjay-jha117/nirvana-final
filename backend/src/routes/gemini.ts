import { Hono } from "hono";

export const geminiRouter = new Hono<{
  Bindings: {
    GEMINI_API: string;
  };
}>();

geminiRouter.post("/generate", async (c) => {
  const { prompt } = await c.req.json();

  if (!prompt) {
    return c.json(
      { error: "Prompt is required", details: "Missing 'prompt' in body" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${c.env.GEMINI_API}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      return c.json(
        { error: "Gemini API error", details: errorText },
        { status: res.status as 400 | 401 | 403 | 404 | 500 }
      );
    }

    const data: any = await res.json(); // use `any` or define Gemini response type
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    return c.json({ success: true, response: text });
  } catch (e) {
    return c.json(
      { error: "Request failed", details: String(e) },
      { status: 500 }
    );
  }
});

export default geminiRouter;
