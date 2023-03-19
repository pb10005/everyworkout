/*
  Warnings:

  - A unique constraint covering the columns `[userId,exerciseId,metrics_code,value,date]` on the table `Maximum` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Maximum_userId_exerciseId_metrics_code_value_date_key" ON "Maximum"("userId", "exerciseId", "metrics_code", "value", "date");
