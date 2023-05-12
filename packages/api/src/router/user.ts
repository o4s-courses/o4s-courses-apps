import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  memberOf: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.memberInCourse.findMany({
      where: { userId: ctx.session.user.id },
      select: {
        role: true,
        course: {
          // where: { deleted: false },
          select: {
            id: true,
            name: true,
            description: true,
            image: true,
          },
        },
      },
    });
  }),
  addToCourse: protectedProcedure
    .input(
      z.object({
        courseId: z.number(),
        userId: z.string().min(1),
        role: z.string().valid("AUTHOR", "TEACHER", "STUDENT"),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.memberInCourse.create({
        data: {
          courseId: input.courseId,
          userId: input.userId,
          role: input.role,
        },
      });
    }),
});
