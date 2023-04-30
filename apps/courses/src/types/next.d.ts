import type { NextComponentType, NextPageContext } from "next";
import type { Session } from "@o4s/auth";
import type { Router } from "next/router";

declare module "next/app" {
  type AppProps<P = Record<string, unknown>> = {
    Component: NextComponentType<NextPageContext, any, P>
    router: Router
    __N_SSG?: boolean
    __N_SSP?: boolean
    pageProps: P & {
      /** Initial session passed in from `getServerSideProps` or `getInitialProps` */
      session?: Session
    }
  }
};