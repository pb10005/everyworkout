-- CreateIndex
CREATE INDEX "ExerciseMuscle_muscleId_is_main_idx" ON "ExerciseMuscle"("muscleId", "is_main");

-- CreateIndex
CREATE INDEX "Maximum_id_userId_idx" ON "Maximum"("id", "userId");

-- CreateIndex
CREATE INDEX "Workout_id_userId_idx" ON "Workout"("id", "userId");
