"use client";

import { useContext, useMemo } from "react";
import { CartContext } from "../context/CartContext";
import { useRouter } from "next/navigation";

export default function CarritoPage() {
  const router = useRouter();
  const { cart, incrementQuantity, decrementQuantity, clearCart } = useContext(CartContext);

  // Calcular subtotales por producto (con descuento si aplica)
  const itemSubtotals = useMemo(() => {
    return cart.map((item) => {
      const price = item.discountPrice ?? item.originalPrice;
      return {
        ...item,
        subtotal: price * item.quantity,
      };
    });
  }, [cart]);

  // Subtotal general
  const subtotal = useMemo(() => {
    return itemSubtotals.reduce((acc, item) => acc + item.subtotal, 0);
  }, [itemSubtotals]);

  const total = subtotal.toFixed(2);

  return (
    <main className="p-6 relative">
      {/* Botón volver */}
      <button
        onClick={() => router.push("/")}
        className="absolute top-4 left-4 text-red-600 text-2xl font-bold hover:scale-110"
      >
        ✖
      </button>

      <h1 className="text-3xl font-bold mb-6 text-center">Carrito de compras</h1>

      {cart.length === 0 ? (
        <p className="text-lg text-center">Tu carrito está vacío.</p>
      ) : (
        <>
          <button
            onClick={clearCart}
            className="mb-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Vaciar carrito
          </button>

          <div className="space-y-4">
            {itemSubtotals.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 bg-white p-4 rounded shadow relative"
              >
                <img
                  src={item.images.small}
                  alt={item.name}
                  className="w-24 h-24 object-contain"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">{item.name}</h2>

                  {item.discountPrice ? (
                    <p className="text-sm text-green-600">
                      Precio: <span className="line-through text-gray-400">${item.originalPrice.toFixed(2)}</span>{" "}
                      <span className="text-green-700 font-bold">${item.discountPrice.toFixed(2)}</span>
                    </p>
                  ) : (
                    <p className="text-sm text-gray-600">
                      Precio: ${item.originalPrice.toFixed(2)}
                    </p>
                  )}

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

                  <p className="mt-2 text-sm font-medium text-right">
                    Subtotal: ${item.subtotal.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Botón buscar más */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => router.push("/")}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded"
            >
              Buscar más
            </button>
          </div>

          {/* Resumen */}
          <div className="mt-10 text-xl border-t pt-4">
            <p className="mb-2">Resumen:</p>
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>Total: ${total}</p>
          </div>

          {subtotal > 999.99 && (
            <div className="text-red-600 font-bold mt-4">
              ERROR: Total excede $999.99
            </div>
          )}

          <div className="mt-6 text-center">
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded text-lg">
              Comprar
            </button>
          </div>
        </>
      )}
    </main>
  );
}
