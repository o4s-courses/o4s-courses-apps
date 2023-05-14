/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { PrismaClient } from "@prisma/client";
import Redis from "ioredis";
import type Prisma from "prisma";
import { createPrismaRedisCache } from "prisma-redis-middleware";

const redis = new Redis({
  port: Number(process.env.CACHE_PORT), // Redis port
  host: String(process.env.CACHE_HOST), // Redis host
  username: String(process.env.CACHE_USER), // needs Redis >= 6
  password: String(process.env.CACHE_PASSWORD),
  db: Number(process.env.CACHE_DATABASE), // Defaults to 0
});

const cacheMiddleware: Prisma.Middleware = createPrismaRedisCache({
  models: [
    { model: "Lesson", excludeMethods: ["findFirst"] },
    // { model: "Post", cacheTime: 180, cacheKey: "lesson" },
  ],
  storage: {
    type: "redis",
    options: {
      client: redis,
      invalidation: { referencesTTL: 300 },
      log: console,
    },
  },
  cacheTime: 300,
  excludeModels: ["Session"],
  excludeMethods: ["count", "groupBy"],
  onHit: (key) => {
    console.log("hit", key);
  },
  onMiss: (key) => {
    console.log("miss", key);
  },
  onError: (key) => {
    console.log("error", key);
  },
});

export * from "@prisma/client";
export * from "./db";
export * from "./src/sanitisePrismaObject";

const globalForPrisma = globalThis as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (!process.env.IS_ADMIN) prisma.$use(cacheMiddleware);

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
