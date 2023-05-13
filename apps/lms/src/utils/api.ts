import { createTRPCReact } from "@trpc/react-query";

import type { AppRouter } from "@o4s/api";

export const api = createTRPCReact<AppRouter>();

export { type RouterInputs, type RouterOutputs } from "@o4s/api";
