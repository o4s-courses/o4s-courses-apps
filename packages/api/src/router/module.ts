/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { z } from "zod";
import slugify from "@sindresorhus/slugify";

import { createTRPCRouter, adminProcedure, publicProcedure } from "../trpc";

export const lessonRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.lesson.findMany({ orderBy: { id: "desc" } });
  }),
  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.lesson.findFirst({ where: { id: input.id } });
    }),
	byAuthor: adminProcedure
		.query(({ ctx }) => {
			return ctx.prisma.course.findMany({
				where: { authorId: ctx.session.user.id },
				select: {
					id: true,
					name: true,
					description: true,
					published: true,
					_count: {
						select: {
							lessons: true,
							students: true,
						},
					},
				}
			});
		}),
  create: adminProcedure
    .input(
      z.object({
				courseId: z.number(),
        name: z.string().min(1),
      }),
    )
    .mutation(({ ctx, input }) => {
			const id = input.courseId;
      return ctx.prisma.module.create({
						data: {
							name: input.name,
							slug: slugify(input.name),
							course: {
								connect: {
									id
								}
							}
						}}
				);
    }),
  delete: adminProcedure.input(z.number()).mutation(({ ctx, input }) => {
		const lessons = ctx.prisma.lesson.
    return ctx.prisma.module.delete({ where: { id: input } });
  }),
});