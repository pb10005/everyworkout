/*
  Warnings:

  - Added the required column `weeklyReportPublished` to the `Workout` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Workout" ADD COLUMN     "weeklyReportPublished" BOOLEAN NOT NULL DEFAULT FALSE;

-- CreateTable
CREATE TABLE "WeeklyReport" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WeeklyReport_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WeeklyReport" ADD CONSTRAINT "WeeklyReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
