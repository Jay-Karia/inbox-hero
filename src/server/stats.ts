import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import prisma from "@/lib/prisma";

const app = new Hono();

// Get the user stats
app.get("/", clerkMiddleware(), async (c) => {
  const auth = getAuth(c);
  if (auth && !auth.userId || !auth) {
    return c.text("Unauthorized", 401);
  }

  // Fetch the stats from database
  try {
    const stats = await prisma.stats.findUnique({
      where: { userId: auth.userId },
    })

    return c.json(stats);
  } catch (error) {
    console.error("Error fetching stats:", error);
    return c.text("Internal Server Error", 500);
  }

});

export default app;
