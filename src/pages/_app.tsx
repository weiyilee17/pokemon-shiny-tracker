import "~/styles/globals.css";

import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { api } from "~/utils/api";

import type { Session } from "next-auth";
import type { AppType } from "next/app";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Pokemon Pikachu Eevee Shiny Tracker</title>
        <meta
          name="description"
          content="Pokemon Pikachu Eevee Shiny Tracker"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
