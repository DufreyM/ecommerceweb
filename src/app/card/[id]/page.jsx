"use client";

import { useEffect, useState, useContext } from "react";
import { use } from "react"; // <--- Importante para desempaquetar Promises como params
import { useRouter } from "next/navigation";
import { CartContext } from "@/app/context/CartContext";
import { FavoritesContext } from "@/app/context/FavoritesContext";
import { ShoppingCart } from "lucide-react";

export default function CardPage({ params }) {
  const { id } = use(params); // ← cambio importante

  const [card, setCard] = useState(null);
  const [similarCards, setSimilarCards] = useState([]);
  const router = useRouter();
  const { addToCart } = useContext(CartContext);
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  const isFavorite = favorites.some((f) => f.id === id);

  useEffect(() => {
  const fetchCard = async () => {
    try {
      const res = await fetch(`https://api.pokemontcg.io/v2/cards/${id}`);
      const data = await res.json();
      setCard(data.data);

      // Obtener cartas similares por nombre
      const resAll = await fetch(
        `https://api.pokemontcg.io/v2/cards?pageSize=50&name=${data.data.name}`
      );
      const allData = await resAll.json();

      const currentTypes = data.data.types || [];
      const currentName = data.data.name?.toLowerCase() || "";

      const similars = allData.data.filter((c) => {
        if (c.id === id) return false;

        const otherTypes = c.types || [];
        const nameMatch = c.name?.toLowerCase() === currentName;
        const typeMatch = currentTypes.some((type) =>
          otherTypes.includes(type)
        );

        return nameMatch || typeMatch;
      });

      setSimilarCards(similars);
    } catch (error) {
      console.error("Error al obtener la carta:", error);
    }
  };

  fetchCard();
}, [id]);


  if (!card) return <div className="p-6 text-xl">Cargando carta...</div>;

  // Color dinámico según tipo de carta
  const typeColorMap = {
    Grass: "bg-green-100 text-green-700",
    Fire: "bg-red-100 text-red-700",
    Water: "bg-blue-100 text-blue-700",
    Lightning: "bg-yellow-100 text-yellow-700",
    Psychic: "bg-purple-100 text-purple-700",
    Fighting: "bg-orange-100 text-orange-700",
    Darkness: "bg-gray-800 text-white",
    Metal: "bg-gray-300 text-gray-900",
    Fairy: "bg-pink-100 text-pink-700",
    Dragon: "bg-yellow-200 text-yellow-800",
  };

  const typeClass = typeColorMap[card.types?.[0]] || "bg-gray-100 text-gray-700";

  return (
    <main className="p-6">
      {/* Barra superior */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => router.push("/")}
          className="text-red-600 hover:text-red-800 font-bold text-xl"
        >
          ❌
        </button>
        <div className="flex gap-4">
          <button onClick={() => toggleFavorite(card)}>
            {isFavorite ? "❤️" : "🤍"}
          </button>
          <button onClick={() => router.push("/carrito")}>
            <ShoppingCart className="w-6 h-6 text-blue-600" />
          </button>
        </div>
      </div>

      {/* Detalle carta */}
      <div
        className={`rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-6 ${typeClass}`}
      >
        <img
          src={card.images.large}
          alt={card.name}
          className="w-full md:w-1/3 object-contain"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-extrabold mb-2 animate-pulse">{card.name}</h1>
          <p className="text-lg mb-1">
            <strong>HP:</strong> {card.hp}
          </p>
          <p className="text-lg mb-1">
            <strong>Tipo:</strong> {card.types?.join(", ")}
          </p>
          <p className="text-lg mb-1">
            <strong>Rareza:</strong> {card.rarity}
          </p>
          <p className="text-lg mb-2">
            <strong>Precio:</strong>{" "}
            ${card.tcgplayer?.prices?.holofoil?.market?.toFixed(2) ?? "N/A"}
          </p>
          <button
            onClick={() => addToCart(card)}
            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded mt-2"
          >
            Añadir al carrito
          </button>
        </div>
      </div>

      {/* Cartas similares */}
      {similarCards.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Cartas similares</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {similarCards.map((simCard) => (
              <div
                key={simCard.id}
                onClick={() => router.push(`/card/${simCard.id}`)}
                className="cursor-pointer bg-white rounded-xl shadow hover:scale-105 transition p-2"
              >
                <img
                  src={simCard.images.small}
                  alt={simCard.name}
                  className="w-full h-48 object-contain"
                />
                <div className="text-center font-medium mt-2">{simCard.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
