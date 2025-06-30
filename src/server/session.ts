import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import prisma from "@/lib/prisma";

const app = new Hono();

// Get the session data
app.get("/", clerkMiddleware(), async (c) => {
  const auth = getAuth(c);
  if (!auth?.userId) {
    return c.text("Unauthorized", 401);
  }

  try {
    const sessions = await prisma.session.findMany({
      where: { userId: auth.userId },
      orderBy: { startTime: "desc" },
      take: 20,
    });

    return c.json(sessions);
  } catch (error) {
    console.error("Error fetching sessions:", error);
    return c.text("Internal Server Error", 500);
  }
});

export default app;
