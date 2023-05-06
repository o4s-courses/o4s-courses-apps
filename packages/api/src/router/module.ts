/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { z } from "zod";
import slugify from "@sindresorhus/slugify";

import { createTRPCRouter, adminProcedure, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const moduleRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.lesson.findMany({ orderBy: { id: "desc" } });
  }),
  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.lesson.findFirst({ where: { id: input.id } });
    }),
	byCourse: adminProcedure
		.input(z.object({ id: z.number() }))
		.query(({ ctx, input }) => {
			return ctx.prisma.module.findMany({
				where: { courseId: input.id },
				orderBy: { pos: 'asc' },
				select: {
					id: true,
					name: true,
					courseId: true,
					lessons: {
						select: {
							id: true,
							name: true,
							status: true,
						},
					},
				}
			});
		}),
	setPos: adminProcedure
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
		const lessons = ctx.prisma.module.findFirst({
			where: { id: input },
			select: {
				_count: {
					select: {
						lessons: true,
					},
				},
			}
		});
		if (lessons._count.lessons > 0) {
			throw new TRPCError({ code: "UNAUTHORIZED" });
		};
    return ctx.prisma.module.delete({ where: { id: input } });
  }),
});