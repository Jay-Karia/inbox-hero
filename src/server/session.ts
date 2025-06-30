import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import prisma from "@/lib/prisma";
import { UpdateSessionSchema } from "@/schemas/session";

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

// Add a new session
app.post("/", clerkMiddleware(), async (c) => {
  const auth = getAuth(c);
  if (!auth?.userId) {
    return c.text("Unauthorized", 401);
  }

  try {
    const body = await c.req.json();
    body.startTime = new Date();
    body.endTime = new Date();
    const parsedBody = UpdateSessionSchema.safeParse(body);

    // Validate the request body
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

    // Create the session in the database
    const newSession = await prisma.session.create({
      data: {
        startTime: parsedData.startTime,
        endTime: parsedData.endTime,
        duration: parsedData.duration,
        emailsProcessed: parsedData.emailsProcessed,
        archived: parsedData.archived,
        skipped: parsedData.skipped,
        deleted: parsedData.deleted,
        userId: parsedData.userId,
      },
    });

    return c.json(newSession, 201);
  } catch (error) {
    console.error("Error creating session:", error);
    return c.text("Internal Server Error", 500);
  }
});

export default app;
