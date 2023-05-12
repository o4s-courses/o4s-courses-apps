import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type DefaultSession, type NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";

import { prisma } from "@o4s/db";

import { sendVerificationRequest } from "./utils/sendVerificationRequest";

/**
 * Module augmentation for `next-auth` types
 * Allows us to add custom properties to the `session` object
 * and keep type safety
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 **/
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      role: string;
    } & DefaultSession["user"];
  }

  interface User {
    // ...other properties
    role: string;
  }
}

/**
 * Options for NextAuth.js used to configure
 * adapters, providers, callbacks, etc.
 * @see https://next-auth.js.org/configuration/options
 **/
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "database",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      sendVerificationRequest,
    }),
  ],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/require-await
    async session({ session, token, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.role = user.role;
      }
      console.log("Session Callback", { session, token, user });
      return session;
    },
    jwt: ({ token, user }) => {
      console.log("JWT Callback", { token, user });
      if (user) {
        const u = user as unknown as any;
        token.role = u.role;
        return {
          ...token,
          ...user,
        };
      }
      return token;
    },
  },
};
