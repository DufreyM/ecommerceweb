"use client";

import { useEffect, useState, useContext } from "react";
import { CartContext } from "./context/CartContext";
import { FavoritesContext } from "./context/FavoritesContext";
import { useRouter } from "next/navigation";


export default function HomePage() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);
  const { toggleFavorite, favorites } = useContext(FavoritesContext);
  const router = useRouter();

const handleAddToCart = (card) => {
  addToCart(card);
  router.push("/carrito");
};


  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "https://api.pokemontcg.io/v2/cards?pageSize=250",
          {
            headers: {
              "X-Api-Key": "89bf9437-6145-41f5-82b5-280d4d522ce3",
            },
          }
        );
        const data = await res.json();
        setCards(data.data);
      } catch (error) {
        console.error("Error fetching Pokémon cards:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  if (loading) {
    return <div className="p-6 text-xl">Cargando cartas...</div>;
  }

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Cartas Pokémon ({cards.length})</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
  <div
    key={card.id}
    className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transition transform"
  >
    <img
      src={card.images.small}
      alt={card.name}
      className="w-full h-64 object-contain p-4"
    />
    <div className="p-4">
      <h2 className="text-xl font-semibold">{card.name}</h2>
      <p className="text-sm text-green-600">
        Precio: ${card.tcgplayer?.prices?.holofoil?.market?.toFixed(2) ?? "N/A"}
      </p>
      <p className="text-sm text-gray-500">
        {card.supertype} - {card.subtypes?.join(", ")}
      </p>
      <div className="mt-4 flex justify-between">
        <button
  onClick={() => handleAddToCart(card)}
  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
>
  Agregar al carrito
</button>
        <button
          onClick={() => toggleFavorite(card)}
          className={`px-3 py-1 rounded ${
            favorites.find((f) => f.id === card.id)
              ? "bg-red-500 text-white"
              : "bg-gray-200"
          }`}
        >
          ❤️
        </button>
      </div>
    </div>
  </div>
))}
      </div>
    </main>
  );
}
