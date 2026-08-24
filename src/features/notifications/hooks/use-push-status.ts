"use client";

import { useQuery } from "@tanstack/react-query";
import { getPushStatus } from "../lib/apis/push-status.api";

export function usePushStatus() {
  return useQuery({
    queryKey: ["push-status"],
    queryFn: getPushStatus,
  });
}