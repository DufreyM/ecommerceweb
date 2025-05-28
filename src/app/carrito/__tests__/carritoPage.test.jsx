import { render, screen } from '@testing-library/react'
import CarritoPage from '../page'
import { CartContext } from '../../context/CartContext'

// Mock del router de Next.js
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

describe('CarritoPage', () => {
  it('muestra mensaje si el carrito está vacío', () => {
    const contextValue = {
      cart: [],
      incrementQuantity: jest.fn(),
      decrementQuantity: jest.fn(),
      clearCart: jest.fn(),
    }

    render(
      <CartContext.Provider value={contextValue}>
        <CarritoPage />
      </CartContext.Provider>
    )

    expect(screen.getByText('Tu carrito está vacío.')).toBeInTheDocument()
  })
})
