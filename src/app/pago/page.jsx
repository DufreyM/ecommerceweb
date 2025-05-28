"use client";

import { useContext, useMemo, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useRouter } from "next/navigation";
import MetodoPago from "./MetodoPago";
import DatosEntrega from "./DatosEntrega";
import Factura from "./Factura";
import Resumen from "./Resumen";
import ConfirmacionModal from "./ConfirmacionModal";

export default function PagoPage() {
  const { cart, clearCart } = useContext(CartContext);
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [compraId, setCompraId] = useState("");

  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [metodoPago, setMetodoPago] = useState(null);

  const total = useMemo(() => {
    return cart
      .reduce((acc, item) => {
        const price = item.discountPrice ?? item.originalPrice;
        return acc + price * item.quantity;
      }, 0)
      .toFixed(2);
  }, [cart]);

  const isFormValid =
    nombre && direccion && ciudad && codigoPostal && metodoPago !== null;

  const handlePedir = () => {
    if (!isFormValid) {
      alert(
        "Por favor, completa todos los campos de datos de entrega y selecciona un método de pago."
      );
      return;
    }

    if (metodoPago === "tarjeta") {
      alert("Pago con tarjeta simulado");
    }

    const fakeId = `ORD-${Math.floor(Math.random() * 1000000)}`;
    setCompraId(fakeId);
    setShowModal(true);
    clearCart();

    console.log("Orden creada con datos:", {
      nombre,
      direccion,
      ciudad,
      codigoPostal,
      metodoPago,
      cart,
    });
  };

  return (
    <main className="p-6 min-h-screen bg-gradient-to-br from-yellow-100 via-orange-200 to-yellow-300">
      <button
        onClick={() => router.push("/carrito")}
        className="absolute top-4 left-4 text-red-600 text-2xl font-bold hover:scale-110"
      >
        ✖
      </button>

      <div className="flex justify-end p-4">
        <button
          onClick={() => router.push("/")}
          className="text-red-600 text-2xl font-bold hover:scale-110"
          title="HOME"
        >
          🏠
        </button>
      </div>

      <h1 className="text-3xl font-bold text-center mb-6">Confirmar Pago</h1>

      <MetodoPago metodoPago={metodoPago} setMetodoPago={setMetodoPago} />

      <DatosEntrega
        nombre={nombre}
        setNombre={setNombre}
        direccion={direccion}
        setDireccion={setDireccion}
        ciudad={ciudad}
        setCiudad={setCiudad}
        codigoPostal={codigoPostal}
        setCodigoPostal={setCodigoPostal}
      />

      <Factura cart={cart} />

      <Resumen total={total} />

      <div className="text-center">
        <button
          onClick={handlePedir}
          className={`px-6 py-2 rounded text-lg text-white ${
            isFormValid
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!isFormValid}
        >
          Pedir
        </button>
      </div>

      {showModal && (
        <ConfirmacionModal compraId={compraId} onClose={() => router.push("/")} />
      )}
    </main>
  );
}
