"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { ThemeProvider } from "@/lib/contexts/ThemeContext";
import { I18nProvider } from "@/lib/contexts/I18nContext";
import { AuthProvider } from "@/lib/contexts/AuthContext";
import { UsageProvider } from "@/lib/contexts/UsageContext";
import { Toaster } from "sonner";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <I18nProvider>
          <AuthProvider>
            <UsageProvider>
              {children}
              <Toaster
                position="bottom-center"
                toastOptions={{
                  style: {
                    background: "#10182F",
                    color: "#F8FAFC",
                    border: "1px solid rgba(34,211,238,0.2)",
                    borderRadius: "16px",
                  },
                }}
              />
            </UsageProvider>
          </AuthProvider>
        </I18nProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
