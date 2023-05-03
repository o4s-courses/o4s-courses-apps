/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
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
      return ctx.prisma.course.findFirst({ where: { id: input.id } });
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
        name: z.string().min(1),
        description: z.string().min(1),
      }),
    )
    .mutation(({ ctx, input }) => {
			const id = ctx.session?.user?.id;
      return ctx.prisma.course.create({
						data: {
							name: input.name,
							description: input.description,
							slug: slugify(input.name),
							author: {
								connect: {
									id
								}
							}
						}}
				);
    }),
  delete: adminProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.prisma.course.delete({ where: { id: input } });
  }),
});