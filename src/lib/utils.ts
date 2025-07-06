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
  statsData.averageTime = Math.round(
    (currentStats.averageTime * currentStats.totalProcessed +
      sessionData.duration) /
      (currentStats.totalProcessed + sessionData.emailsProcessed)
  );

  return statsData;
}

export function updateStreak(stats: Stats): Stats {
  const now = new Date();
  const todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const lastDate = stats.lastActive ? new Date(stats.lastActive) : null;
  const lastActiveDate = lastDate
    ? new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate())
    : null;

  // Default values if stats doesn't have streak data
  const currentStreak = stats.streak || 0;
  const dailyGoal = stats.dailyGoal || 10;

  // Check if daily goal was achieved with this session
  const goalAchieved = stats.processedToday >= dailyGoal;

  if (!goalAchieved) {
    // If goal not achieved, just update lastStreakDate and return
    return {
      ...stats,
      lastActive: now,
    };
  }

  // If there's no lastActiveDate or it's the first time achieving the goal
  if (!lastActiveDate) {
    return {
      ...stats,
      streak: 1,
      lastActive: now,
    };
  }

  // Calculate the difference in days
  const daysDifference = Math.floor(
    (todayDate.getTime() - lastActiveDate.getTime()) / (1000 * 3600 * 24)
  );

  if (daysDifference === 0) {
    // Same day, already counted in streak, just update date
    return {
      ...stats,
      lastActive: now,
    };
  } else if (daysDifference === 1) {
    // Consecutive day, increment streak
    const newStreak = currentStreak + 1;
    return {
      ...stats,
      streak: newStreak,
      lastActive: now,
    };
  } else {
    // Streak broken, start new streak
    return {
      ...stats,
      streak: 1,
      lastActive: now,
    };
  }

  return { ...stats, streak: 1 };
}
