'use client';

import { useCart } from '@/shared/hooks/use-cart';
import ItemCard from './item-card';
import EmptyCart from './empty-cart';
import CartError from './cart-error';
import ItemsSkeleton from '../skeletons/items.skeleton';

export default function Items() {
  const { cartItems, removeFromCart, updateQuantity, isLoading, isError, refetchCart } = useCart();

  if (isLoading) {
    return <ItemsSkeleton />;
  }

  if (isError) {
    return <CartError onRetry={refetchCart} />;
  }

  if (!cartItems.length) {
    return <EmptyCart />;
  }

  return (
    <>
      {cartItems.map((itemCart, index) => (
        <ItemCard
          key={itemCart.id}
          itemCart={itemCart}
          onRemove={removeFromCart}
          onUpdate={updateQuantity}
          isLast={index === cartItems.length - 1}
        />
      ))}
    </>
  );
}
