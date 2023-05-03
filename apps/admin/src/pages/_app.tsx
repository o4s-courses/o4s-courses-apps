import "../styles/globals.css";
import type { AppType } from "next/app";
import type { Session } from "@o4s/auth";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

import { api } from "~/utils/api";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
			<ThemeProvider defaultTheme='light' attribute='class'>
				<Component {...pageProps} />
				<div>
					<Toaster />
				</div>
			</ThemeProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);

