import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import Head from "next/head";
import { openSansFont, theme } from "@/lib/ui";
import { Layout } from "@/layouts";
import { AuthProvider } from "@/lib/auth";
import { CounterProvider } from "@/feature-counter/context/CounterProvider";
import { UserProvider } from "@/lib/user";
import { LegacyModeProvider } from "@/feature-legacy";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/joy";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { createEmotionCache } from "@/lib/ui";
import { useIsBlacklisted } from "@/lib/utils";
import { FallbackPage } from "@/feature-legacy";

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

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const App = ({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: MyAppProps) => {
  const isBlacklisted = useIsBlacklisted();

  return (
    <CacheProvider value={emotionCache}>
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
            html: {
              fontFamily: openSansFont.style.fontFamily,
            },
            body: {
              color: "#333",
              fontSize: "15px",
            },
            iframe: {
              border: 0,
            },
            a: {
              color: theme.palette.info[500],
            },
          }}
        />
        <main
          className={[openSansFont.variable, openSansFont.className].join(" ")}
        >
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <UserProvider>
                <CounterProvider>
                  <Layout>
                    <LegacyModeProvider>
                      {isBlacklisted ? (
                        <FallbackPage />
                      ) : (
                        <Component {...pageProps} />
                      )}
                    </LegacyModeProvider>
                  </Layout>
                </CounterProvider>
              </UserProvider>
            </AuthProvider>
          </QueryClientProvider>
        </main>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default appWithTranslation(App);
