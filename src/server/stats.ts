import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import prisma from "@/lib/prisma";
import { UpdateStatsSchema } from "@/schemas/stats";

const app = new Hono();

// Get the user stats
app.get("/", clerkMiddleware(), async (c) => {
  const auth = getAuth(c);
  if ((auth && !auth.userId) || !auth) {
    return c.text("Unauthorized", 401);
  }

  // Fetch the stats from database
  try {
    const stats = await prisma.stats.findUnique({
      where: { userId: auth.userId },
    });

    return c.json(stats);
  } catch (error) {
    console.error("Error fetching stats:", error);
    return c.text("Internal Server Error", 500);
  }
});

// Update the user stats
app.patch("/", clerkMiddleware(), async (c) => {
  const auth = getAuth(c);
  if ((auth && !auth.userId) || !auth) {
    return c.text("Unauthorized", 401);
  }

  try {
    const body = await c.req.json();
    const parsedBody = UpdateStatsSchema.safeParse(body);

    if (!parsedBody.success) {
      return c.json(
        { error: "Invalid request body", details: parsedBody.error.errors },
        400
      );
    }

    const parsedData = parsedBody.data;

    // Check for user
    if (auth.userId !== parsedData.userId) {
      return c.text("User not found!", 401);
    }

    // Update the stats in the database
    const updatedStats = await prisma.stats.update({
      where: { userId: parsedData.userId },
      data: {
        totalProcessed: parsedData.totalProcessed,
        processedToday: parsedData.processedToday,
        averageTime: parsedData.averageTime,
        streak: parsedData.streak,
        unreadEmails: parsedData.unreadEmails,
        dailyGoal: parsedData.dailyGoal,
        achievedInboxZero: parsedData.achievedInboxZero,
      },
    });

    return c.json(updatedStats);
  } catch (error) {
    console.error("Error updating stats:", error);
    return c.text("Internal Server Error", 500);
  }
});

export default app;
