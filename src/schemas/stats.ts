import { Stats } from "../../generated/prisma";
import { z } from "zod";

// Base Stats schema with comprehensive validation
export const StatsSchema = z.object({
  id: z.number().int().positive(),
  userId: z.string().min(1, "User ID is required").max(255),
  totalProcessed: z.number().int().min(0, "Total processed cannot be negative"),
  processedToday: z.number().int().min(0, "Processed today cannot be negative"),
  averageTime: z.number().int().min(0, "Average time cannot be negative").max(3600, "Average time seems too high"), // Max 1 hour per email
  streak: z.number().int().min(0, "Streak cannot be negative").max(365, "Streak seems unrealistic"), // Max 1 year streak
  unreadEmails: z.number().int().min(0, "Unread emails cannot be negative").max(100000, "Unread emails count seems too high"),
  dailyGoal: z.number().int().min(1, "Daily goal must be at least 1").max(1000, "Daily goal seems too high"),
  achievedInboxZero: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
}) satisfies z.ZodType<Stats>;

// Schema for updating stats (all fields optional except userId)
export const UpdateStatsSchema = StatsSchema.partial().required({
  userId: true,
}).extend({
  // Ensure updated fields maintain validation
  totalProcessed: z.number().int().min(0).optional(),
  processedToday: z.number().int().min(0).optional(),
  averageTime: z.number().int().min(0).max(3600).optional(),
  streak: z.number().int().min(0).max(365).optional(),
  unreadEmails: z.number().int().min(0).max(100000).optional(),
  dailyGoal: z.number().int().min(1).max(1000).optional(),
});

// Schema for API responses (handles date serialization)
export const StatsAPISchema = StatsSchema.extend({
  createdAt: z.union([
    z.date(),
    z.string().datetime().transform(val => new Date(val))
  ]),
  updatedAt: z.union([
    z.date(),
    z.string().datetime().transform(val => new Date(val))
  ]),
});

