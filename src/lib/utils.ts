import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Session, Stats } from "../../generated/prisma";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function updateStatsData(
  currentStats: Stats,
  sessionData: Session,
  userId: string | undefined
): Partial<Stats> {
  const statsData: Partial<Stats> = {
    userId,
    dailyGoal: currentStats?.dailyGoal || 0,
    achievedInboxZero: currentStats?.achievedInboxZero || false,
    unreadEmails: currentStats?.unreadEmails || 0,
    streak: currentStats?.streak || 0,
  };
  if (!currentStats) {
    statsData.totalProcessed = sessionData.emailsProcessed;
    statsData.processedToday = sessionData.emailsProcessed;
    statsData.averageTime = sessionData.duration === 0 ? 0 : parseInt((sessionData.duration / sessionData.emailsProcessed).toFixed(0));
  } else {
    statsData.totalProcessed =
      currentStats.totalProcessed + sessionData.emailsProcessed;
    statsData.processedToday =
      currentStats.processedToday + sessionData.emailsProcessed;
    statsData.averageTime = parseInt(
      (
        (currentStats.averageTime * currentStats.totalProcessed +
          (sessionData.duration / sessionData.emailsProcessed) *
            sessionData.emailsProcessed) /
        (currentStats.totalProcessed + sessionData.emailsProcessed)
      ).toFixed(0)
    );
    statsData.dailyGoal = currentStats.dailyGoal;
    statsData.unreadEmails = currentStats.unreadEmails;
    statsData.streak = currentStats.streak;
  }

  return statsData;
}
