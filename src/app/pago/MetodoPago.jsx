export default function MetodoPago({ metodoPago, setMetodoPago }) {
  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Métodos de Pago</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        <div
          onClick={() => setMetodoPago("tarjeta")}
          className={`min-w-[150px] p-4 shadow rounded text-center cursor-pointer hover:bg-green-100 ${
            metodoPago === "tarjeta"
              ? "bg-green-600 text-white"
              : "bg-white text-black"
          }`}
        >
          💳 Tarjeta 1234
        </div>
        <div
          onClick={() => setMetodoPago("efectivo")}
          className={`min-w-[150px] p-4 shadow rounded text-center cursor-pointer hover:bg-green-100 ${
            metodoPago === "efectivo"
              ? "bg-green-600 text-white"
              : "bg-white text-black"
          }`}
        >
          🏦 Efectivo
        </div>
      </div>
    </section>
  );
}
