// carrito.page.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CarritoPage from './page.jsx';
import { CartContext } from '../context/CartContext';

// Mock useRouter
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('CarritoPage', () => {
  const mockPush = jest.fn();
  const cartItems = [
    { id: 1, originalPrice: 10, discountPrice: 8, quantity: 2 },
    { id: 2, originalPrice: 5, quantity: 1 }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('muestra mensaje si el carrito está vacío', () => {
    render(
      <CartContext.Provider
        value={{
          cart: [],
          incrementQuantity: jest.fn(),
          decrementQuantity: jest.fn(),
          clearCart: jest.fn()
        }}
      >
        <CarritoPage />
      </CartContext.Provider>
    );

    expect(screen.getByText('Tu carrito está vacío.')).toBeInTheDocument();
  });

  it('muestra la lista de items y subtotal cuando hay productos', () => {
    render(
      <CartContext.Provider
        value={{
          cart: cartItems,
          incrementQuantity: jest.fn(),
          decrementQuantity: jest.fn(),
          clearCart: jest.fn()
        }}
      >
        <CarritoPage />
      </CartContext.Provider>
    );

    expect(screen.getByText('Carrito de compras')).toBeInTheDocument();
    expect(screen.getByText('Vaciar carrito')).toBeInTheDocument();
  });
});
