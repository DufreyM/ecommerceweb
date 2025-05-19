'use client';

export default function CartPage() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Carrito de compras</h1>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span>Dialga</span>
          <div>
            <button>-</button>
            <span className="mx-2">1</span>
            <button>+</button>
          </div>
          <span>$15.99</span>
        </div>
        <hr />
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>$15.99</span>
        </div>
        <div className="flex justify-between text-red-600">
          <span>Total:</span>
          <span>$15.99</span>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2">Comprar</button>
        <button className="text-red-600 underline mt-2">Vaciar carrito</button>
      </div>
    </div>
  );
}
