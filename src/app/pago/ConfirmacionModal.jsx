export default function ConfirmacionModal ({ compraId, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg text-center max-w-sm">
        <h2 className="text-2xl font-bold mb-2">¡Gracias por tu compra!</h2>
        <p className="mb-4">
          Tu número de orden es <strong>{compraId}</strong>
        </p>
        <button
          onClick={onClose}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  )
}
