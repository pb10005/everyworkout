-- AlterTable
ALTER TABLE "WeeklyReport" ADD COLUMN     "executeDate" TEXT NOT NULL DEFAULT '1975-01-01';

-- CreateTable
CREATE TABLE "WeeklyReportMaster" (
    "executeDate" TEXT NOT NULL,
    "isGenerated" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "WeeklyReportMaster_pkey" PRIMARY KEY ("executeDate")
);
