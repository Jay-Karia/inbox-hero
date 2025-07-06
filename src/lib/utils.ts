import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Session, Stats } from "../../generated/prisma";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function updateStatsData(
  currentStats: Stats | null,
  sessionData: Session,
  userId: string | undefined
): Stats {
  if (!currentStats) {
    throw new Error("Current stats are required to update stats data.");
  }

  const statsData: Stats = { ...currentStats };
  statsData.userId = userId || "";
  statsData.processedToday =
    currentStats.processedToday + sessionData.emailsProcessed;
  statsData.totalProcessed =
    currentStats.totalProcessed + sessionData.emailsProcessed;
  statsData.b = Math.round(
    (currentStats.averageTime * currentStats.totalProcessed +
      sessionData.duration) /
      (currentStats.totalProcessed + sessionData.emailsProcessed)
  );

  return statsData;
}
