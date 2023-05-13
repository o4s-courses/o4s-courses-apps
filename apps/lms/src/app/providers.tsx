"use client";

import React, { useState } from "react";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, cookieStorageManager } from "@chakra-ui/react";

import { type Session } from "@o4s/auth";
import { SessionProvider, useSession } from "next-auth/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { api } from "~/utils/api";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode,
}) {
	return (
		<SessionProvider>
			<CacheProvider>
				<ChakraProvider colorModeManager={cookieStorageManager}>
					<TrpcProvider>
						{children}
					</TrpcProvider>
				</ChakraProvider>
			</CacheProvider>
		</SessionProvider>
	)
}

export const TrpcProvider: React.FC<{ children: React.ReactNode, }> = ({
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
					//	return {
					//		authorization: `Bearer ${getCookie('next-auth.session-token')}`,
					//	};
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

export const NextAuthProvider: React.FC<{ children: React.ReactNode, }> = ({
	children,
}) => {
	const { data: session, status } = useSession();
	return <SessionProvider session={session}>{children}</SessionProvider >;
}