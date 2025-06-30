/*
  Warnings:

  - Added the required column `skipped` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Session_userId_key";

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "skipped" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "Session_userId_startTime_idx" ON "Session"("userId", "startTime");

-- CreateIndex
CREATE INDEX "Session_userId_createdAt_idx" ON "Session"("userId", "createdAt");
