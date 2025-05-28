export default function Resumen ({ total }) {
  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Resumen Total</h2>
      <p className="text-lg">
        Total a pagar: <strong>${total}</strong>
      </p>
    </section>
  )
}
