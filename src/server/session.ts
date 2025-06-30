import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import prisma from "@/lib/prisma";

const app = new Hono();

// Get the session data
app.get("/", clerkMiddleware(), async (c) => {
  const auth = getAuth(c);
  if (auth && !auth.userId || !auth) {
    return c.text("Unauthorized", 401);
  }

  // Fetch the session data from database
  try {
    const session = await prisma.session.findUnique({
      where: { userId: auth.userId },
    });

    return c.json(session);
  } catch (error) {
    console.error("Error fetching session:", error);
    return c.text("Internal Server Error", 500);
  }
})

export default app;
