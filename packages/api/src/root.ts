import { authRouter } from "./router/auth";
import { moduleRouter } from "./router/module";
import { courseRouter } from "./router/course";
import { createTRPCRouter } from "./trpc";
import { lessonRouter } from "./router/lesson";

export const appRouter = createTRPCRouter({
	course: courseRouter,
  module: moduleRouter,
	lesson: lessonRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
