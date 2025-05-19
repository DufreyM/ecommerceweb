'use client';

import { useEffect, useState } from 'react';
import ProductCard from './components/ProductCard';

export default function Home() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch('https://api.pokemontcg.io/v2/cards?pageSize=10', {
      headers: {
        'X-Api-Key': 'ee8e607f-dc80-4a01-a7ca-c92593fdd14c',
      },
    })
      .then(res => res.json())
      .then(data => setCards(data.data))
      .catch(err => console.error('Error al obtener cartas:', err));
  }, []);

  return (
    <main className="grid grid-cols-2 gap-4 p-4">
      {cards.map(card => (
        <ProductCard key={card.id} product={card} />
      ))}
    </main>
  );
}
