"use client";

import { useContext, useMemo, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useRouter } from "next/navigation";

export default function PagoPage() {
  const { cart, clearCart } = useContext(CartContext);
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [compraId, setCompraId] = useState("");

  const total = useMemo(() => {
    return cart.reduce((acc, item) => {
      const price = item.discountPrice ?? item.originalPrice;
      return acc + price * item.quantity;
    }, 0).toFixed(2);
  }, [cart]);

  const handlePedir = () => {
    const fakeId = `ORD-${Math.floor(Math.random() * 1000000)}`;
    setCompraId(fakeId);
    setShowModal(true);
    clearCart();
  };

  return (
    <main className="p-6 min-h-screen bg-gradient-to-br from-yellow-100 via-orange-200 to-yellow-300">
      <h1 className="text-3xl font-bold text-center mb-6">Confirmar Pago</h1>

      {/* Métodos de pago */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Métodos de Pago</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          <div className="min-w-[150px] p-4 bg-white shadow rounded text-center cursor-pointer hover:bg-green-100">
            💳 Tarjeta 1234
          </div>
          <div className="min-w-[150px] p-4 bg-white shadow rounded text-center cursor-pointer hover:bg-green-100">
            🏦 Efectivo
          </div>
          <div className="min-w-[150px] p-4 bg-gray-200 text-gray-600 shadow rounded text-center cursor-pointer hover:bg-gray-300">
            ➕ Agregar tarjeta
          </div>
        </div>
      </section>

      {/* Datos de entrega */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Datos de entrega</h2>
        <form className="grid gap-3">
          <input type="text" placeholder="Nombre completo" className="border p-2 rounded" />
          <input type="text" placeholder="Dirección" className="border p-2 rounded" />
          <input type="text" placeholder="Ciudad" className="border p-2 rounded" />
          <input type="text" placeholder="Código postal" className="border p-2 rounded" />
        </form>
      </section>

      {/* Factura */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Factura</h2>
        <ul className="bg-white p-4 rounded shadow divide-y">
          {cart.map((item) => (
            <li key={item.id} className="py-2 flex justify-between">
              <span>{item.name} x{item.quantity}</span>
              <span>${((item.discountPrice ?? item.originalPrice) * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Resumen */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Resumen Total</h2>
        <p className="text-lg">Total a pagar: <strong>${total}</strong></p>
      </section>

      <div className="text-center">
        <button
          onClick={handlePedir}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded text-lg"
        >
          Pedir
        </button>
      </div>

      {/* Modal de confirmación */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center max-w-sm">
            <h2 className="text-2xl font-bold mb-2">¡Gracias por tu compra!</h2>
            <p className="mb-4">Tu número de orden es <strong>{compraId}</strong></p>
            <button
              onClick={() => router.push("/")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Volver al inicio
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
