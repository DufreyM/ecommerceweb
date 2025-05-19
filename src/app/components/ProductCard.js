'use client';

import Link from 'next/link';

export default function ProductCard({ product }) {
  const fakePrice = (Math.random() * 100).toFixed(2);
  const stars = Math.floor(Math.random() * 5) + 1;

  return (
    <div className="border p-2 rounded shadow">
      <Link href={`/product/${product.id}`}>
        <img src={product.images.small} alt={product.name} className="w-full h-40 object-cover" />
        <h2>{product.name}</h2>
        <p>${fakePrice}</p>
        <p>{'★'.repeat(stars)}</p>
      </Link>
      <button className="mt-2 bg-blue-500 text-white px-2 py-1 rounded">Agregar</button>
    </div>
  );
}
