-- CreateTable
CREATE TABLE "Stats" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "totalEmails" INTEGER NOT NULL,
    "totalProcessed" INTEGER NOT NULL,
    "processedToday" INTEGER NOT NULL,
    "averageTime" INTEGER NOT NULL,
    "streak" INTEGER NOT NULL,
    "unreadEmails" INTEGER NOT NULL,
    "dailyGoal" INTEGER NOT NULL,

    CONSTRAINT "Stats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Stats_userId_key" ON "Stats"("userId");
