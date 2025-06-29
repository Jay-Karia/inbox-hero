export type mockStatsType = {
  totalProcessed: number; // total emails processed
  processedToday: number;
  averageTime: number; // in seconds
  streak: number; // in days
  unreadEmails: number;
  dailyGoal: number; // daily goal of emails
}
