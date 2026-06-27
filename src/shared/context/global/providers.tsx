import React from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactQueryProvider from "./providers/react-query-provider";
import { ThemeProvider } from "./providers/theme-provider";
import { Toaster } from "sonner";

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
