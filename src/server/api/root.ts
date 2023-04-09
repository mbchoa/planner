import taskRouter from "~/server/api/routers/task";
import taskListRouter from "~/server/api/routers/taskList";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  taskLists: taskListRouter,
  task: taskRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
