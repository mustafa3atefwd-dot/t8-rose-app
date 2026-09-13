import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProductAction } from '../actions/products.action';

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProductAction,
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      await queryClient.invalidateQueries({ queryKey: ['admin-product', variables.id] });
    },
  });
}
