import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import Head from "next/head";
import { theme, openSansFont } from "@/lib/ui";
import { Layout } from "@/layouts";
import { AuthProvider } from "@/lib/auth";
import { CounterProvider } from "@/feature-counter/context/CounterProvider";
import { UserProvider } from "@/lib/user";
import { LegacyModeProvider } from "@/feature-legacy";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/joy";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      cacheTime: 5 * 60 * 1000,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>UiTPAS Beheer</title>
        <meta name="description" content="UiTPAS Beheer" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            body: {
              color: "#333",
              fontSize: "15px",
            },
            iframe: {
              border: 0,
            },
            a:{
              color: theme.palette.info[500]
            }
          }}
        />
        <main className={openSansFont.className}>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <UserProvider>
                <CounterProvider>
                  <Layout>
                    <LegacyModeProvider>
                      <Component {...pageProps} />
                    </LegacyModeProvider>
                  </Layout>
                </CounterProvider>
              </UserProvider>
            </AuthProvider>
          </QueryClientProvider>
        </main>
      </ThemeProvider>
    </>
  );
};

export default appWithTranslation(App);
