import { authRouter } from "./routers/auth";
import { courseRouter } from "./routers/course";
import { lessonRouter } from "./routers/lesson";
import { moduleRouter } from "./routers/module";
import { productRouter } from "./routers/product";
import { userRouter } from "./routers/user";
import { router } from "./trpc";

export const appRouter = router({
  auth: authRouter,
  course: courseRouter,
  lesson: lessonRouter,
  module: moduleRouter,
  product: productRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
