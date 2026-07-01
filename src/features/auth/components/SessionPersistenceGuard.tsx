"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { hasActiveBrowserSession } from "../lib/session-policy";

export function SessionPersistenceGuard() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "authenticated") return;
    if (session?.rememberMe) return;
    if (hasActiveBrowserSession()) return;

    void signOut({ callbackUrl: "/en/login" });
  }, [session?.rememberMe, status]);

  return null;
}
