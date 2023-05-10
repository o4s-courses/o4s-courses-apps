"use client"

import { CacheProvider } from "@chakra-ui/next-js"
import { ChakraProvider, cookieStorageManager } from "@chakra-ui/react"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import React, { useState } from 'react';
import superjson from "superjson";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { api } from "~/utils/api";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CacheProvider>
      <ChakraProvider colorModeManager={cookieStorageManager}>
        {children}
      </ChakraProvider>
    </CacheProvider>
  )
}

export const TrpcProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
	const url = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : "http://joseantcordeiro.hopto.org:4000/api/trpc";
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    api.createClient({
			links: [
				httpBatchLink({
					url: url,
					// You can pass any HTTP headers you wish here
					//async headers() {
					//  return {
					//    authorization: getAuthCookie(),
					//  };
					//},
				}),
			],
			transformer: superjson,
		}),
  );
  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
				{children}
      </QueryClientProvider>
    </api.Provider>
  );
}
