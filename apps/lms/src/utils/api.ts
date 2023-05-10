import type { AppRouter } from "@o4s/api";
import { createTRPCReact } from "@trpc/react-query";

export const api = createTRPCReact<AppRouter>();

export { type RouterInputs, type RouterOutputs } from "@o4s/api";
