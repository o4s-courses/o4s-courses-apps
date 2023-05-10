import {
  FetchCreateContextFnOptions,
  fetchRequestHandler,
} from "@trpc/server/adapters/fetch";
import { appRouter, createTRPCContext, type AppRouter } from "@o4s/api";

const handler = (request: Request) => {
  console.log(`incoming request ${request.url}`);
	//   // Enable cors
	//   await cors(req, res);
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: appRouter,
    createContext: createTRPCContext,
  });
};

export { handler as GET, handler as POST };