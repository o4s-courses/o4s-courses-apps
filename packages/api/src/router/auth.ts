import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
	deleteSession: protectedProcedure.mutation(({ ctx }) => {
		return ctx.prisma.session.deleteMany({
			where: { userId: ctx.session.user.id }
		})
	}),
  getSecretMessage: protectedProcedure.query(() => {
    // testing type validation of overridden next-auth Session in @o4s/auth package
    return "you can see this secret message!";
  }),
});
