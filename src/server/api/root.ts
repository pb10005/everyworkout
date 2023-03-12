import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { muscleRouter } from "./routers/muscle";
import { exerciseRouter } from "./routers/exercise";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  muscle: muscleRouter,
  exercise: exerciseRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
