"use client";

import { SessionProvider } from "next-auth/react";
import { SessionPersistenceGuard } from "./SessionPersistenceGuard";

export function AuthSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <SessionPersistenceGuard />
      {children}
    </SessionProvider>
  );
}
