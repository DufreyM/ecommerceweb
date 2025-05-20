"use client";

import { useContext, useMemo } from "react";
import { CartContext } from "../context/CartContext";

export default function CarritoPage() {
  const { cart, incrementQuantity, decrementQuantity, clearCart } = useContext(CartContext);

  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => {
      const price = item.tcgplayer?.prices?.holofoil?.market || 0;
      return acc + price * item.quantity;
    }, 0);
  }, [cart]);

  const total = subtotal.toFixed(2);

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Carrito de compras</h1>

      {cart.length === 0 ? (
        <p className="text-lg">Tu carrito está vacío.</p>
      ) : (
        <>
          <button
            onClick={clearCart}
            className="mb-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Vaciar carrito
          </button>

          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded shadow">
                <img src={item.images.small} alt={item.name} className="w-24 h-24 object-contain" />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-600">
                    Precio unitario: ${item.tcgplayer?.prices?.holofoil?.market.toFixed(2) ?? "N/A"}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => decrementQuantity(item.id)}
                      className="bg-gray-300 px-2 py-1 rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => {
                        if (item.quantity < 9) incrementQuantity(item.id);
                      }}
                      className="bg-gray-300 px-2 py-1 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-xl">
            Subtotal: ${subtotal.toFixed(2)}
            <br />
            Total: ${total}
          </div>

          {subtotal > 999.99 && (
            <div className="text-red-600 font-bold mt-4">ERROR: Total excede $999.99</div>
          )}

          <button className="mt-6 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
            Comprar
          </button>
        </>
      )}
    </main>
  );
}
