/*
  Warnings:

  - Made the column `endTime` on table `Session` required. This step will fail if there are existing NULL values in that column.
  - Made the column `duration` on table `Session` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "target" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "endTime" SET NOT NULL,
ALTER COLUMN "duration" SET NOT NULL;
