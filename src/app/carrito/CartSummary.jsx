"use client";
import { useRouter } from "next/navigation";

export default function CartSummary({ subtotal }) {
  const router = useRouter();

  const total = subtotal.toFixed(2);

  return (
    <>
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
        <button
          onClick={() => router.push("/pago")}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded text-lg"
        >
          Comprar
        </button>
      </div>
    </>
  );
}
