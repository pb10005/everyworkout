-- CreateIndex
CREATE INDEX "Maximum_exerciseId_metrics_code_idx" ON "Maximum"("exerciseId", "metrics_code");

-- CreateIndex
CREATE INDEX "Workout_userId_exerciseId_date_idx" ON "Workout"("userId", "exerciseId", "date");
