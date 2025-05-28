'use client'

import { useContext, useMemo } from 'react'
import { CartContext } from '../context/CartContext'
import { useRouter } from 'next/navigation'
import CartList from './CartList'
import CartSummary from './CartSummary'

export default function CarritoPage () {
  const router = useRouter()
  const { cart, incrementQuantity, decrementQuantity, clearCart } = useContext(CartContext)

  const itemSubtotals = useMemo(() => {
    return cart.map((item) => {
      const price = item.discountPrice ?? item.originalPrice
      return {
        ...item,
        subtotal: price * item.quantity
      }
    })
  }, [cart])

  const subtotal = useMemo(() => {
    return itemSubtotals.reduce((acc, item) => acc + item.subtotal, 0)
  }, [itemSubtotals])

  return (
    <main className="p-6 min-h-screen bg-gradient-to-br from-yellow-100 via-orange-200 to-yellow-300">
      <button
        onClick={() => router.push('/')}
        className="absolute top-4 left-4 text-red-600 text-2xl font-bold hover:scale-110"
      >
        ✖
      </button>

      <h1 className="text-3xl font-bold mb-6 text-center">Carrito de compras</h1>

      {cart.length === 0
        ? (
          <p className="text-lg text-center">Tu carrito está vacío.</p>
        )
        : (
          <>
            <button
              onClick={clearCart}
              className="mb-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
            Vaciar carrito
            </button>

            <CartList
              items={itemSubtotals}
              incrementQuantity={incrementQuantity}
              decrementQuantity={decrementQuantity}
            />

            <div className="mt-6 flex justify-center">
              <button
                onClick={() => router.push('/')}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded"
              >
              Buscar más
              </button>
            </div>

            <CartSummary subtotal={subtotal} />
          </>
        )}
    </main>
  )
}
