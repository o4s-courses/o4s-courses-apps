import { z } from "zod";

import { adminProcedure, publicProcedure, router } from "../trpc";

export const productRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.product.findMany({ orderBy: { id: "desc" } });
  }),
  byId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.product.findFirst({ where: { id: input.id } });
    }),
  create: adminProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().min(1),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.product.create({ data: input });
    }),
  delete: adminProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.prisma.product.delete({ where: { id: input } });
  }),
});
