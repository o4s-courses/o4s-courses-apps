import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { getServerSession as $getServerSession } from "next-auth";

import { authOptions } from "./auth-options";

type GetServerSessionContext =
  | {
      req: GetServerSidePropsContext["req"];
      res: GetServerSidePropsContext["res"];
    }
  | { req: NextApiRequest; res: NextApiResponse };
export const getServerSession = (ctx: GetServerSessionContext) => {
  /**if (req.headers.authorization) {
		const token = await decodeAndVerifyJwtToken(
			req.headers.authorization.split(' ')[1],
		);
		return token;
	}**/
  return $getServerSession(ctx.req, ctx.res, authOptions);
};

export async function createContext({
  req,
  res,
}: trpcNext.CreateNextContextOptions) {
  // Create your context based on the request object
  // Will be available as `ctx` in all your resolvers
  // This is just an example of something you might want to do in your ctx fn
  async function getUserFromHeader() {
    if (req.headers.authorization) {
      const user = await decodeAndVerifyJwtToken(
        req.headers.authorization.split(" ")[1],
      );
      return user;
    }
    return null;
  }
  const user = await getUserFromHeader();
  return {
    user,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
