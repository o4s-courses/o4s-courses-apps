import { authRouter } from "./router/auth";
import { postRouter } from "./router/post";
import { courseRouter } from "./router/course";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
	course: courseRouter,
  post: postRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
