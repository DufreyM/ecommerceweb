"use client";

import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

const addToCart = (card) => {
  setCart((prevCart) => {
    const existing = prevCart.find((item) => item.id === card.id);
    if (existing) {
      return prevCart.map((item) =>
        item.id === card.id
          ? { ...item, quantity: Math.min(item.quantity + 1, 9) }
          : item
      );
    }

    return [
      ...prevCart,
      {
        ...card,
        quantity: card.quantity ?? 1, 
        originalPrice: card.originalPrice ?? 0,
        discountPrice: card.discountPrice ?? null,
      },
    ];
  });
};


  const incrementQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.min(item.quantity + 1, 9) }
          : item
      )
    );
  };

  const decrementQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, incrementQuantity, decrementQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
