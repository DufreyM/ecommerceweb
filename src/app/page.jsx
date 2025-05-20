"use client";

import { useEffect, useState, useContext, useRef } from "react";
import { CartContext } from "./context/CartContext";
import { FavoritesContext } from "./context/FavoritesContext";
import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";

export default function HomePage() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { addToCart } = useContext(CartContext);
  const { toggleFavorite, favorites } = useContext(FavoritesContext);
  const router = useRouter();

  const showFavoritesOnly = useRef(false); 

  const handleAddToCart = (card) => {
    addToCart(card); // ya no redirige
  };

  const toggleShowFavorites = () => {
    showFavoritesOnly.current = !showFavoritesOnly.current;
    setSearch((prev) => prev); 
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

  // ✅ Filtro por nombre y favoritos si está activado
  const filteredCards = cards.filter((card) => {
    const matchesSearch = card.name.toLowerCase().includes(search.toLowerCase());
    const isFavorite = favorites.find((f) => f.id === card.id);
    return matchesSearch && (!showFavoritesOnly.current || isFavorite);
  });

  if (loading) {
    return <div className="p-6 text-xl">Cargando cartas...</div>;
  }

  return (
    <main className="p-6">
      {/* Encabezado superior con carrito y filtros */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => router.push("/carrito")}
          className="text-blue-600 hover:text-blue-800"
          title="Ir al carrito"
        >
          <ShoppingCart className="w-8 h-8" />
        </button>

        <h1 className="text-2xl sm:text-3xl font-bold text-center flex-1">
          ECCOMERCE MEJÍA PUCHAMON
        </h1>

        <button
          onClick={toggleShowFavorites}
          className="text-sm bg-yellow-300 hover:bg-yellow-400 px-3 py-1 rounded"
          title="Mostrar solo favoritos"
        >
          {showFavoritesOnly.current ? "Ver todos" : "Solo ❤️"}
        </button>
      </div>

      {/* Barra de búsqueda */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar Pokémon..."
          className="w-full p-2 border border-gray-300 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Cartas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCards.map((card) => (
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
