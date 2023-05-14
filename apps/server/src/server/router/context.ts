import { type inferAsyncReturnType } from "@trpc/server";
import { type CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";

import { type Session } from "@o4s/auth";
import { prisma } from "@o4s/db";

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API
 *
 * These allow you to access things like the database, the session, etc, when
 * processing a request
 *
 */

async function getDBSession(token: string) {
  const dbSession = await prisma.session.findUnique({
    where: {
      sessionToken: token,
    },
    select: {
      expires: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          role: true,
        },
      },
    },
  });

  if (!dbSession) {
    return null;
  }

  return {
    user: dbSession.user,
    expires: dbSession.expires.toISOString(),
  };
}

export async function createContext({ req, res }: CreateFastifyContextOptions) {
  const authorization = req.headers.authorization;
  const session: Session | null = null;

  if (!(authorization === undefined)) {
    const token = String(authorization.split(" ")[1]);
    const session: Session | null = await getDBSession(token);

    console.log(JSON.stringify(session));
    return { req, res, session, prisma };
  }

  return { req, res, session, prisma };
}

export type Context = inferAsyncReturnType<typeof createContext>;
