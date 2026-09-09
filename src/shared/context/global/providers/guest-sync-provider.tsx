'use client';

import { useSyncGuestData } from "@/shared/hooks/use-sync-guest-data";



export default function GuestSyncProvider({ children }: { children: React.ReactNode }) {
  useSyncGuestData(); // Executes post-login sync automatically
  return <>{children}</>;
}