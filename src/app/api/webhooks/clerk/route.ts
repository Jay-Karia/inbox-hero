import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const secret = process.env.SIGNING_SECRET;
  if (!secret) return new Response("Missing secret", { status: 500 });

  const wh = new Webhook(secret);
  const body = await req.text();
  const headerPayload = await headers();

  const event = wh.verify(body, {
    "svix-id": headerPayload.get("svix-id")!,
    "svix-timestamp": headerPayload.get("svix-timestamp")!,
    "svix-signature": headerPayload.get("svix-signature")!,
  }) as WebhookEvent;

  if (event.type === "user.created") {
    const { id, email_addresses, first_name } = event.data;

    // Create or update user in the database
    await prisma.user.upsert({
      where: { clerkId: id },
      update: {},
      create: {
        clerkId: id,
        email: email_addresses[0].email_address,
        name: `${first_name}`,
      },
    });

    // Initialize user stats
    await prisma.stats.upsert({
      where: { userId: id },
      update: {},
      create: {
        userId: id,
        totalProcessed: 0,
        unreadEmails: 0,
        processedToday: 0,
        averageTime: 0,
        streak: 0,
        dailyGoal: 0,
      },
    });
  }

  return new Response("OK");
}

// Note: Every time ngrok restarts, the URL changes, so you need to update the webhook URL in Clerk's dashboard.
