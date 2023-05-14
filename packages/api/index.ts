import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";

import { type AppFastifyRouter, type AppRouter } from "./src/root";

export { appRouter, type AppRouter } from "./src/root";
export { appFastifyRouter, type AppFastifyRouter } from "./src/root";
export { createTRPCContext } from "./src/trpc";
export { createFastifyContext } from "./src/trpc";

/**
 * Inference helpers for input types
 * @example type HelloInput = RouterInputs['example']['hello']
 **/
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helpers for output types
 * @example type HelloOutput = RouterOutputs['example']['hello']
 **/
export type RouterOutputs = inferRouterOutputs<AppRouter>;
