import { authRouter } from "./router/auth";
import { courseRouter } from "./router/course";
import { lessonRouter } from "./router/lesson";
import { moduleRouter } from "./router/module";
import { productRouter } from "./router/product";
import { userRouter } from "./router/user";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  user: userRouter,
  course: courseRouter,
  module: moduleRouter,
  lesson: lessonRouter,
  product: productRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
