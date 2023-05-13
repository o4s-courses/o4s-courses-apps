import { z } from "zod";

import { adminProcedure, createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  all: adminProcedure
    .input(
      z.object({
        skip: z.number(),
        take: z.number(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findMany({
        orderBy: { id: "desc" },
        skip: input.skip,
        take: input.take,
        select: {
          id: true,
          name: true,
          email: true,
          emailVerified: true,
          image: true,
          courses: {
            select: {
              courseId: true,
              role: true,
            },
          },
        },
      });
    }),
  byUserRole: adminProcedure
    .input(
      z.object({
        skip: z.number(),
        take: z.number(),
        role: z.enum(["ADMIN", "AUTHOR", "TEACHER", "OBSERVATOR", "STUDENT"]),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.memberInCourse.findMany({
        where: { role: input.role },
        distinct: ["userId"],
        select: {
          role: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              emailVerified: true,
              image: true,
              role: true,
            },
          },
        },
        skip: input.skip,
        take: input.take,
      });
    }),
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
        role: z.enum(["ADMIN", "AUTHOR", "TEACHER", "OBSERVATOR", "STUDENT"]),
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
