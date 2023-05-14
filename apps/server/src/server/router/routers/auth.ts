import { protectedProcedure, publicProcedure, router } from "../trpc";

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  /**getAuthenticatedUser: protectedProcedure.query(({ ctx }) => {
		return ctx.session.session.findFirst();
	}),*/
  deleteSession: protectedProcedure.mutation(({ ctx }) => {
    return ctx.prisma.session.deleteMany({
      where: { userId: ctx.session.user.id },
    });
  }),
  getSecretMessage: protectedProcedure.query(() => {
    // testing type validation of overridden next-auth Session in @o4s/auth package
    return "you can see this secret message!";
  }),
});
