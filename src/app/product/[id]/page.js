'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://api.pokemontcg.io/v2/cards/${id}`, {
      headers: {
        'X-Api-Key': 'ee8e607f-dc80-4a01-a7ca-c92593fdd14c',
      },
    })
      .then(res => res.json())
      .then(data => setProduct(data.data))
      .catch(err => console.error('Error al cargar detalle:', err));
  }, [id]);

  if (!product) return <div className="p-4">Cargando...</div>;

  return (
    <div className="p-4">
      <img src={product.images.large} alt={product.name} className="w-full h-60 object-contain" />
      <h1 className="text-xl">{product.name}</h1>
      <p className="text-gray-700">ID: {product.id}</p>
      <p className="text-green-700 text-lg font-bold">${(Math.random() * 100).toFixed(2)}</p>
      <p>{'★'.repeat(Math.floor(Math.random() * 5 + 1))}</p>
      <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded">Agregar al carrito</button>
    </div>
  );
}
