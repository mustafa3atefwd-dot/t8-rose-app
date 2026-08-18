"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import { useSession } from "next-auth/react";

import {
  addToCartAction,
  removeCartAction,
  removeFromCartAction,
  updateCartQuantityAction,
} from "../actions/cart-actions";

import { CartItem } from "../lib/types/product";
import { createGuestStore } from "../lib/utils/guest-storage.util";

const GUEST_CART_KEY = "guest_cart_items";

const guestCartStore = createGuestStore<CartItem>(GUEST_CART_KEY);

export function useCart() {
  // Session status
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { status } = useSession();

  const isLoggedIn =
    mounted && status === "authenticated";

  const queryClient = useQueryClient();

  // Guest cart
  const guestCart = useSyncExternalStore(
    guestCartStore.subscribe,
    guestCartStore.getSnapshot,
    guestCartStore.getServerSnapshot
  );

  // Fetch server cart for authenticated users
  const {
   
    data: serverCart = [],
   
    isLoading: isCartLoading,
    isError: isCartError,
    refetch: refetchCart,
 ,
    isPending: isServerCartPending,
  } = useQuery<CartItem[]>({
    queryKey: ["cart"],

    queryFn: async () => {
      const res = await fetch("/api/cart");

      if (!res.ok) {
        throw new Error("Failed to load cart");
      }

      const data = await res.json();

      return data.payload?.cartItems || data.payload || [];
    },

    enabled: isLoggedIn,

    staleTime: 1000 * 60 * 5,
  });

  const cartItems = isLoggedIn ? serverCart : guestCart;

  // True only once `cartItems` actually reflects the user's cart. Until the
  // session resolves and (for a logged-in user) the server cart arrives,
  // `cartItems` is an empty placeholder — a caller that reads that as "the
  // cart is empty" will act on a cart that simply has not loaded yet.
  //
  // This cannot be derived from `isLoading`: a disabled query reports
  // `isLoading: false`, so during the pre-mount pass the hook would otherwise
  // claim to be settled on an empty guest cart.
  const isCartReady = mounted && status !== 'loading' && (!isLoggedIn || !isServerCartPending);

  // Add to cart mutation
  const addToCartMutation = useMutation({
    mutationFn: ({
      productId,
      quantity,
    }: {
      productId: string;
      quantity: number;
    }) => {
      return addToCartAction(productId, quantity);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });

  // Update quantity mutation
  const updateQuantityMutation = useMutation({
    mutationFn: ({
      id,
      quantity,
    }: {
      id: string;
      quantity: number;
    }) => {
      return updateCartQuantityAction(id, quantity);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });

  // Clear cart mutation
  const removeCartMutation = useMutation({
    mutationFn: () => {
      return removeCartAction();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });

  // Remove item mutation
  const removeFromCartMutation = useMutation({
    mutationFn: ({
      id,
    }: {
      id: string;
    }) => {
      return removeFromCartAction(id);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });

  // Add to cart
  const addToCart = async (
    productId: string,
    quantityToAdd = 1,
    productDetails?: CartItem["product"]
  ) => {
    if (isLoggedIn) {
      const existingItem = serverCart.find(
        (item) => item.productId === productId
      );

      if (existingItem) {
        const newQuantity =
          existingItem.quantity + quantityToAdd;

        await updateQuantityMutation.mutateAsync({
          id: existingItem.id,
          quantity: newQuantity,
        });
      } else {
        await addToCartMutation.mutateAsync({
          productId,
          quantity: quantityToAdd,
        });
      }

      return;
    }

    // Guest cart
    const currentGuestCart =
      guestCartStore.read();

    const existingItem =
      currentGuestCart.find(
        (item) => item.productId === productId
      );

    let updatedGuestCart: CartItem[];

    if (existingItem) {
      updatedGuestCart =
        currentGuestCart.map((item) =>
          item.productId === productId
            ? {
                ...item,
                quantity:
                  item.quantity + quantityToAdd,
              }
            : item
        );
    } else {
      if (!productDetails) return;

      const newItem: CartItem = {
        id: `guest-${Date.now()}`,
        productId,
        product: productDetails,
        quantity: quantityToAdd,
      };

      updatedGuestCart = [
        ...currentGuestCart,
        newItem,
      ];
    }

    guestCartStore.save(updatedGuestCart);
  };

  // Remove item from cart
  const removeFromCart = async (id: string) => {
    if (isLoggedIn) {
      await removeFromCartMutation.mutateAsync({
        id,
      });

      return;
    }

    const currentGuestCart =
      guestCartStore.read();

    const updatedGuestCart =
      currentGuestCart.filter(
        (item) => item.id !== id
      );

    guestCartStore.save(updatedGuestCart);
  };

  // Update quantity
  const updateQuantity = async (
    id: string,
    quantity: number
  ) => {
    // Minimum quantity
    if (quantity <= 0) {
      return removeFromCart(id);
    }

    if (isLoggedIn) {
      await updateQuantityMutation.mutateAsync({
        id,
        quantity,
      });

      return;
    }

    // Guest cart
    const currentGuestCart =
      guestCartStore.read();

    const updatedGuestCart =
      currentGuestCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity,
            }
          : item
      );

    guestCartStore.save(updatedGuestCart);
  };

  // Clear cart
  const clearCart = async () => {
    if (isLoggedIn) {
      await removeCartMutation.mutateAsync();

      return;
    }

    guestCartStore.save([]);
  };

  return {
    // Cart actions
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,

    // Cart data
    cartItems,
    uniqueItemsCount: cartItems.length,

    // Mutations
    removeCartMutation,
    removeFromCartMutation,
    updateQuantityMutation,

    // Loading
    isLoading:
      isCartLoading ||
      addToCartMutation.isPending ||
      updateQuantityMutation.isPending,

    // Error
    isError: isLoggedIn && isCartError,

    // Retry
    refetchCart,
    isCartReady,
  };
}