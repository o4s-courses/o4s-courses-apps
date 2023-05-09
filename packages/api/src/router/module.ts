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
      return ctx.prisma.lesson.findFirst({
				where: {
					id: input.id,
					deleted: false,
				}
			});
    }),
	byCourse: adminProcedure
		.input(z.object({ id: z.number() }))
		.query(({ ctx, input }) => {
			return ctx.prisma.module.findMany({
				where: {
					courseId: input.id,
					deleted: false,
				},
				orderBy: { pos: 'asc' },
				select: {
					id: true,
					name: true,
					pos: true,
					courseId: true,
					lessons: {
						where: { deleted: false, },
						orderBy: { pos: 'asc', },
						select: {
							id: true,
							name: true,
							pos: true,
							status: true,
							courseId: true,
							moduleId: true,
						},
					},
				},
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
	update: adminProcedure
    .input(
      z.object({
				id: z.number(),
        name: z.string().min(1),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.module.update({
						where: { id: input.id },
						data: {
							name: input.name,
							slug: slugify(input.name),
						}
					}
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
			const lessonName = "Lesson for " + input.name;
      return ctx.prisma.module.create({
						data: {
							name: input.name,
							slug: slugify(input.name),
							course: {
								connect: {
									id: input.courseId,
								},
							},
							lessons: {
                create: {
                  name: lessonName,
                  slug: slugify(lessonName),
                  course: {
    								connect: {
    									id: input.courseId,
    								},
    							},
                },
              },
						},
					});
    }),
  delete: adminProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.prisma.module.update({
			where: { id: input },
			data: {
				deleted: true,
				lessons: {
					updateMany: {
						where: {
							deleted: false,
						},
						data: {
							deleted: true,
						},
					},
				},
			},
		});
  }),
});