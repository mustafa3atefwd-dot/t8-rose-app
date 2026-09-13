import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProductAction } from '../actions/products.action';

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProductAction,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['admin-products'] });
    },
  });
}
