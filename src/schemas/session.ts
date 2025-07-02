import { Session } from "../../generated/prisma";
import { z } from "zod";

export const SessionSchema = z.object({
  id: z.number().int().positive(),
  userId: z.string().min(1).max(255),
  startTime: z.date(),
  endTime: z.date(),
  duration: z.number().int().min(0),
  emailsProcessed: z.number().int().min(0),
  archived: z.number().int().min(0),
  deleted: z.number().int().min(0),
  skipped: z.number().int().min(0),
  target: z.number().int().min(0),
  createdAt: z.date(),
  updatedAt: z.date(),
}) satisfies z.ZodType<Session>;

export const UpdateSessionSchema = z.object({
  userId: z.string().min(1),
  startTime: z.date(),
  endTime: z.date(),
  duration: z.number().int().min(0),
  emailsProcessed: z.number().int().min(0),
  archived: z.number().int().min(0),
  deleted: z.number().int().min(0),
  skipped: z.number().int().min(0),
  target: z.number().int().min(0),
});
