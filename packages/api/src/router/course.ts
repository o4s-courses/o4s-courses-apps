import { z } from "zod";
import slugify from "@sindresorhus/slugify";

import { createTRPCRouter, adminProcedure, publicProcedure } from "../trpc";

export const courseRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.course.findMany({ orderBy: { id: "desc" } });
  }),
  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.course.findFirst({
				where: {
					id: input.id,
					deleted: false,
				},
				select: {
					id: true,
					name: true,
					published: true,
					modules: {
						select: {
							id: true,
							name: true,
							lessons: {
								select: {
									id: true,
									name: true
								},
							},
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
					image: true,
					published: true,
					_count: {
						select: {
							modules: true,
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
        name: z.string().min(1),
        description: z.string().min(1).max(2000),
				image: z.string().min(1),
      }),
    )
    .mutation(({ ctx, input }) => {
			const id = ctx.session?.user?.id;
      return ctx.prisma.course.create({
						data: {
							name: input.name,
							description: input.description,
							slug: slugify(input.name),
							image: input.image,
							author: {
								connect: {
									id
								}
							}
						}}
				);
    }),
	publish: adminProcedure.input(z.number()).mutation(({ ctx, input }) => {
		return ctx.prisma.course.update({
			where: { id: input },
			data: { published: true },
		});
	}),
	unpublish: adminProcedure.input(z.number()).mutation(({ ctx, input }) => {
		return ctx.prisma.course.update({
			where: { id: input },
			data: { published: false },
		});
	}),
  delete: adminProcedure.input(z.number()).mutation(({ ctx, input }) => {
		const lessons = ctx.prisma.lesson.updateMany({
			where: {
				courseId: input,
				deleted: false,
			},
			data: { deleted: true },
		});
		const modules = ctx.prisma.module.updateMany({
			where: {
				courseId: input,
				deleted: false,
			},
			data: { deleted: true },
		});
    return ctx.prisma.course.update({
			where: { id: input },
			data: { deleted: true },
		});
  }),
});