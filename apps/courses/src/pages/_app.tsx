import "~/styles/globals.css";
import type { ReactElement, ReactNode } from "react";
import type { AppProps } from "next/app";
import { type NextPage } from "next/types";
import { JitsuProvider, createClient } from "@jitsu/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

import Layout from "~/components/layout";

const queryClient = new QueryClient();

// initialize Jitsu client

const jitsuClient = createClient({
  tracking_host: "http://joseantcordeiro.hopto.org:8000/",
  key: "js.9qqbb5wzjcnv8u4koj5zlx.uf974t1ixqe1kntovcqd7m",
  // See Jitsu SDK parameters section for more options
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  return (
    <JitsuProvider client={jitsuClient}>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          {getLayout(<Component {...pageProps} />)}
          <div>
            <Toaster />
          </div>
        </QueryClientProvider>
      </SessionProvider>
    </JitsuProvider>
  );
}

export default MyApp;
