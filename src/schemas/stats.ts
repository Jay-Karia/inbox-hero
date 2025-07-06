import { Stats } from "../../generated/prisma";
import { z } from "zod";

export const StatsSchema = z.object({
  id: z.number().int().positive(),
  userId: z.string().min(1).max(255),
  totalProcessed: z.number().int().min(0),
  processedToday: z.number().int().min(0),
  averageTime: z.number().int().min(0).max(3600), // Max 1 hour per email
  streak: z.number().int().min(0).max(365), // Max 1 year streak
  unreadEmails: z.number().int().min(0).max(100000),
  dailyGoal: z.number().int().min(1).max(1000),
  achievedInboxZero: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
}) satisfies z.ZodType<Stats>;

export const UpdateStatsSchema = StatsSchema.partial().required({
  userId: true,
}).extend({
  totalProcessed: z.number().int().min(0),
  processedToday: z.number().int().min(0),
  averageTime: z.number().int().min(0).max(3600),
  streak: z.number().int().min(0).max(365),
  unreadEmails: z.number().int().min(0).max(100000),
  dailyGoal: z.number().int().min(0).max(1000),
});
