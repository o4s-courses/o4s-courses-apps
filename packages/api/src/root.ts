import { authRouter } from "./router/auth";
import { moduleRouter } from "./router/module";
import { courseRouter } from "./router/course";
import { createTRPCRouter } from "./trpc";
import { lessonRouter } from "./router/lesson";
import { productRouter } from "./router/product";

export const appRouter = createTRPCRouter({
	course: courseRouter,
  module: moduleRouter,
	lesson: lessonRouter,
	product: productRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
