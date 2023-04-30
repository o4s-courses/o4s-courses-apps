import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type DefaultSession, type NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";

import { prisma } from "@o4s/db";

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
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM
    }),
  ],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/require-await
    async session({ session, token, user }) {
      if (session.user) {
        session.user.id = user.id
        session.user.role = user.role
      }

      return session
    }
  },
  theme: {
    colorScheme: "dark", // "auto" | "dark" | "light"
    brandColor: "#1FB2A5", // Hex color code
    logo: "https://cld.pt/dl/download/d2e82d71-a6b7-4ab2-8c21-8f2d4be99505/logoO4S-70alt.png", // Absolute URL to image
    // buttonText: "" // Hex color code
  }
};

