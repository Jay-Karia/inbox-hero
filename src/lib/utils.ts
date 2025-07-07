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
  const lastActive = stats.lastActive;

  // Default values if stats doesn't have streak data
  const currentStreak = stats.streak || 0;
  const dailyGoal = stats.dailyGoal || 10;

  // Check if daily goal was achieved with this session
  const goalAchieved = stats.processedToday >= dailyGoal;

  if (!goalAchieved) {
    // If goal not achieved, just update lastActive and return
    return {
      ...stats,
      lastActive: now,
    };
  }

  // If there's no lastActive date, this is the first achievement
  if (!lastActive) {
    return {
      ...stats,
      streak: 0, // Start streak at 0
      lastActive: now,
    };
  }

  // Convert lastActive to date components to properly check calendar days
  const lastActiveDate = new Date(lastActive);
  const lastDay = new Date(
    lastActiveDate.getFullYear(),
    lastActiveDate.getMonth(),
    lastActiveDate.getDate()
  );

  // Check if it's the same day
  const isSameDay = todayDate.getTime() === lastDay.getTime();

  // Check if it's the next day (consecutive)
  const nextDay = new Date(lastDay);
  nextDay.setDate(lastDay.getDate() + 1);
  const isConsecutiveDay = todayDate.getTime() === nextDay.getTime();

  if (isSameDay) {
    // Same day, already counted in streak, just update lastActive
    return {
      ...stats,
      lastActive: now,
    };
  } else if (isConsecutiveDay) {
    // Consecutive day, increment streak
    const newStreak = currentStreak + 1;
    return {
      ...stats,
      streak: newStreak,
      lastActive: now,
    };
  } else {
    // Not consecutive, start new streak
    return {
      ...stats,
      streak: 0, // Reset to 0 as requested
      lastActive: now,
    };
  }
}
