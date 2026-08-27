'use client';
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteAll() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/notifications`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to update notification");
      }

      return response.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    },
  });
}