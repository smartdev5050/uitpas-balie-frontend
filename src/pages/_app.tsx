import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import Head from "next/head";
import { GlobalStyles, ThemeProvider } from "@mui/system";
import { theme } from "@/lib/ui";
import { Layout } from "@/layouts";
import { AuthProvider } from "@/lib/auth";
import { CounterProvider } from "@/feature-counter/context/CounterProvider";
import { UserProvider } from "@/feature-user";

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
        <GlobalStyles
          styles={{
            body: {
              padding: 0,
              margin: 0,
              fontFamily: "'Open Sans', sans-serif",
              color: "#333",
              fontSize: "15px",
            },
            iframe: {
              border: 0,
            },
          }}
        />
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <UserProvider>
              <CounterProvider>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </CounterProvider>
            </UserProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
};

export default appWithTranslation(App);
