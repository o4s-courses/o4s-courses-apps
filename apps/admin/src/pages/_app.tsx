import "../styles/globals.css";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next/types";
import type { AppType, AppProps } from "next/app";
import type { Session } from "@o4s/auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

import Layout from "~/components/layout";

import { api } from "~/utils/api";

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
	const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);
  return (
    <SessionProvider session={session}>
      {getLayout(<Component {...pageProps} />)}
			<div>
        <Toaster />
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
