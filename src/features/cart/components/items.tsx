'use client';

import { useCart } from '@/shared/hooks/use-cart';
import ItemCard from './item-card';
import EmptyCart from './empty-cart';

export default function Items() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
  } = useCart();

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