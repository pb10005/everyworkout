import { createTRPCRouter } from "./trpc";
import { muscleRouter } from "./routers/muscle";
import { exerciseRouter } from "./routers/exercise";
import { workoutRouter } from "./routers/workout";
import { maximumRouter } from "./routers/maximum";
import { profileRouter } from "./routers/profile";
import { bodyPartRouter } from "./routers/bodyPart";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  muscle: muscleRouter,
  exercise: exerciseRouter,
  workout: workoutRouter,
  maximum: maximumRouter,
  profile: profileRouter,
  bodyPart: bodyPartRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
