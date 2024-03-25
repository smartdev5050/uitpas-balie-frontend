"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { AuthProvider } from "@/lib/auth";
import { UserProvider } from "@/lib/user";
import { CounterProvider } from "@/feature-counter/context/CounterProvider";
import { Layout } from "@/layouts";
import { LegacyModeProvider } from "@/feature-legacy";
import ThemeRegistry from "@/app/ThemeRegistry";

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

export function WebProviders({ children }: PropsWithChildren) {
  return (
    <ThemeRegistry options={{ key: "joy" }}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider loginPath={"/login"}>
          <UserProvider>
            <CounterProvider>
              <Layout>
                <LegacyModeProvider>{children}</LegacyModeProvider>
              </Layout>
            </CounterProvider>
          </UserProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeRegistry>
  );
}
