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
	getContent: adminProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.lesson.findFirst({
				where: {
					id: input.id,
					deleted: false,
				},
				select: {
					id: true,
					name: true,
					html: true,
					status: true,
					course: {
						select: {
							id: true,
							name: true,
						},
					},
				},
			});
  }),
	withModule: adminProcedure
		.input(z.object({ id: z.number() }))
		.query(({ ctx, input }) => {
			return ctx.prisma.lesson.findMany({
				where: {
					courseId: input.id,
					deleted: false,
				},
				select: {
					id: true,
					name: true,
					pos: true,
					status: true,
					courseId: true,
					module: {
						select: {
							id: true,
							name: true,
							pos: true,
						},
					},
				},
			});
	}),
	byAuthor: adminProcedure
		.query(({ ctx }) => {
			return ctx.prisma.course.findMany({
				where: {
					authorId: ctx.session.user.id,
					deleted: false,
				},
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
	update: adminProcedure
    .input(
      z.object({
				id: z.number(),
        name: z.string().min(1),
				status: z.enum(["published", "draft"]),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.lesson.update({
						where: { id: input.id },
						data: {
							name: input.name,
							slug: slugify(input.name),
							status: input.status,
						}
					}
				);
    }),
  create: adminProcedure
    .input(
      z.object({
				courseId: z.number(),
				moduleId: z.number(),
        name: z.string().min(1),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.lesson.create({
						data: {
							name: input.name,
							slug: slugify(input.name),
							courseId: input.courseId,
							moduleId: input.moduleId,
						}
					}
				);
    }),
	saveHTML: adminProcedure
		.input(
			z.object({
				id: z.number(),
				html: z.string(),
			}),
		)
		.mutation(({ ctx, input }) => {
			return ctx.prisma.lesson.update({
				where: { id: input.id },
				data: {
					html: input.html,
				}
			});
		}),
  delete: adminProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.prisma.lesson.update({
			where: { id: input, },
			data: { deleted: true, },
		});
  }),
});