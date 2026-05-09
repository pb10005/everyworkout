-- Add duration and calories columns to Workout table
-- duration: integer minutes, null = strength workout
-- calories: float kcal, null = not recorded
ALTER TABLE "Workout"
  ADD COLUMN "duration" INTEGER,
  ADD COLUMN "calories" DOUBLE PRECISION;
