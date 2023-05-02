import Prisma from "prisma";
import { PrismaClient } from "@prisma/client";
import { createPrismaRedisCache } from "prisma-redis-middleware";
import Redis from "ioredis";

const redis = new Redis({
  port: Number(process.env.CACHE_PORT), // Redis port
  host: String(process.env.CACHE_HOST), // Redis host
  username: "default", // needs Redis >= 6
  password: String(process.env.CACHE_PASSWORD),
  db: 0, // Defaults to 0
});

const cacheMiddleware: Prisma.Middleware = createPrismaRedisCache({
  // models: [
    // { model: "User", excludeMethods: ["findMany"] },
    // { model: "Post", cacheTime: 180, cacheKey: "lesson" },
  // ],
  storage: { type: "redis", options: { client: redis, invalidation: { referencesTTL: 300 }, log: console } },
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

const globalForPrisma = globalThis as { prisma?: PrismaClient };

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const prisma =
  globalForPrisma.prisma ||
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

prisma.$use(cacheMiddleware);

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

