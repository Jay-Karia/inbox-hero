import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// This function is protected by Vercel Cron and runs at 12:01 AM UTC daily
export async function GET(request: NextRequest) {
  // Securing the Cron Job
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  try {
    // Reset processedToday to 0 for all users
    await prisma.stats.updateMany({
      data: {
        processedToday: 0,
      },
    });

    // Get all users' stats to check and reset streaks
    const allStats = await prisma.stats.findMany();
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Track streak reset counts for logging
    let streakResetCount = 0;

    // Process each user's streak
    for (const userStats of allStats) {
      // Skip users with no lastActive date
      if (!userStats.lastActive) continue;

      const lastActiveDate = new Date(userStats.lastActive);
      const lastActiveDay = new Date(
        lastActiveDate.getFullYear(),
        lastActiveDate.getMonth(),
        lastActiveDate.getDate()
      );

      // Calculate days difference between today and last active day
      const daysDifference = Math.floor(
        (today.getTime() - lastActiveDay.getTime()) / (1000 * 3600 * 24)
      );

      // If the user hasn't been active yesterday (daysDifference > 1), reset streak
      if (daysDifference > 1) {
        await prisma.stats.update({
          where: { id: userStats.id },
          data: { streak: 0 }, // Reset streak to 0
        });
        streakResetCount++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Daily stats reset successfully. Reset ${streakResetCount} streaks.`,
    });
  } catch (error) {
    console.error("Error in daily reset cron job:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process daily reset" },
      { status: 500 }
    );
  }
}
