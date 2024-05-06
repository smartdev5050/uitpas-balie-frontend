"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { AuthProvider } from "@/shared/lib/auth";
import { UserProvider } from "@/shared/lib/user";
import { CounterProvider } from "@/shared/feature-counter/context/CounterProvider";
import { theme } from "@/mobile/lib/ui";
import { ActivityProvider } from "@/mobile/feature-activities/context/ActivityProvider";

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

export function MobileProviders({ children }: PropsWithChildren) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <AuthProvider loginPath={"/mobile/login"}>
            <UserProvider>
              <CounterProvider
                counterPath={"/mobile/counters"}
                whiteListedPages={"/mobile/counters/contact"}
              >
                <ActivityProvider>{children}</ActivityProvider>
              </CounterProvider>
            </UserProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
