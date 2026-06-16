import React from "react";
import ReactQueryProvider from "./providers/react-query-provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "./providers/theme-provider";
import { Toaster } from "@/shared/components/ui/sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <ThemeProvider>
        {children}
        <Toaster  />
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </ReactQueryProvider>
  );
}
