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

    return NextResponse.json({
      success: true,
      message: "Daily stats reset successfully",
    });
  } catch (error) {
    console.error("Error resetting daily stats:", error);
    return NextResponse.json(
      { success: false, error: "Failed to reset daily stats" },
      { status: 500 }
    );
  }
}
