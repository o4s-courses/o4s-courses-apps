import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app isn't
   * built with invalid env vars.
   */
  server: {
		PUBLIC_URL: z.string().url(),
    DATABASE_URL: z.string().url(),
		DATABASE_DIRECT_URL: z.string().url(),
    NODE_ENV: z.enum(["development", "test", "production"]),
    NEXTAUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string().min(1)
        : z.string().min(1).optional(),
    NEXTAUTH_URL: z.preprocess(
      // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
      // Since NextAuth.js automatically uses the VERCEL_URL if present.
      (str) => process.env.VERCEL_URL ?? str,
      // VERCEL_URL doesn't include `https` so it cant be validated as a URL
      process.env.VERCEL ? z.string() : z.string().url(),
    ),
    // Add `.min(1) on ID and SECRET if you want to make sure they're not empty
		EMAIL_SERVER_HOST: z.string().min(1),
		EMAIL_SERVER_PORT: z.number(),
		EMAIL_SERVER_USER: z.string(),
		EMAIL_SERVER_PASSWORD: z.string(),
		EMAIL_FROM: z.string().min(1),
		// Redis cache
		CACHE_HOST: z.string().min(1),
		CACHE_PORT: z.number(),
		CACHE_USER: z.string().min(1),
		CACHE_PASSWORD: z.string().min(1),
		CACHE_DATABASE: z.number(),
		// Ghost
		GHOST_CONTENT_API_KEY: z.string().min(1),
		GHOST_ADMIN_API_KEY: z.string().min(1),
		GHOST_API_URL: z.string().url(),
  },
  /**
   * Specify your client-side environment variables schema here.
   * For them to be exposed to the client, prefix them with `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
  },
  /**
   * Destructure all variables from `process.env` to make sure they aren't tree-shaken away.
   */
  runtimeEnv: {
		PUBLIC_URL: process.env.PUBLIC_URL,
		DATABASE_URL: process.env.DATABASE_URL,
		DATABASE_DIRECT_URL: process.env.DATABASE_DIRECT_URL,
		NODE_ENV: process.env.NODE_ENV,
		NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
		NEXTAUTH_URL: process.env.NEXTAUTH_URL,
		EMAIL_SERVER_HOST: process.env.EMAIL_SERVER_HOST,
		EMAIL_SERVER_PORT: process.env.EMAIL_SERVER_PORT,
		EMAIL_SERVER_USER: process.env.EMAIL_SERVER_USER,
		EMAIL_SERVER_PASSWORD: process.env.EMAIL_SERVER_PASSWORD,
		EMAIL_FROM: process.env.EMAIL_FROM,
		CACHE_HOST: process.env.CACHE_HOST,
		CACHE_PORT: process.env.CACHE_PORT,
		CACHE_USER: process.env.CACHE_USER,
		CACHE_PASSWORD: process.env.CACHE_PASSWORD,
		CACHE_DATABASE: process.env.CACHE_DATABASE,
		GHOST_CONTENT_API_KEY: process.env.GHOST_CONTENT_API_KEY,
		GHOST_ADMIN_API_KEY: process.env.GHOST_ADMIN_API_KEY,
		GHOST_API_URL: process.env.GHOST_API_URL,
	},
});
