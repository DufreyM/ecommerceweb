export default function Factura ({ cart }) {
  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Factura</h2>
      <ul className="bg-white p-4 rounded shadow divide-y">
        {cart.map((item) => (
          <li key={item.id} className="py-2 flex justify-between">
            <span>
              {item.name} x{item.quantity}
            </span>
            <span>
              $
              {(
                (item.discountPrice ?? item.originalPrice) * item.quantity
              ).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
