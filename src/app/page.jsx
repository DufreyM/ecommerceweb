"use client";

import { useEffect, useState, useContext, useRef } from "react";
import { CartContext } from "./context/CartContext";
import { FavoritesContext } from "./context/FavoritesContext";
import HeaderBar from "./components/HeaderBar";
import SearchBar from "./components/SearchBar";
import CardGrid from "./components/CardGrid";
import LoadingScreen from "./components/LoadingScreen";

export default function HomePage() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { addToCart } = useContext(CartContext);
  const { toggleFavorite, favorites } = useContext(FavoritesContext);

  const showFavoritesOnly = useRef(false);

  const toggleShowFavorites = () => {
    showFavoritesOnly.current = !showFavoritesOnly.current;
    setSearch((prev) => prev); // fuerza el re-render
  };

  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://api.pokemontcg.io/v2/cards?pageSize=250", {
          headers: { "X-Api-Key": "89bf9437-6145-41f5-82b5-280d4d522ce3" },
        });
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

  const filteredCards = cards.filter((card) => {
  const matchesSearch = card.name.toLowerCase().includes(search.toLowerCase());
  const isFavorite = favorites.find((f) => f.id === card.id);
  const hasValidPrice = card.tcgplayer?.prices?.holofoil?.market != null;

  return matchesSearch && hasValidPrice && (!showFavoritesOnly.current || isFavorite);
});


  if (loading) return <LoadingScreen />;

  return (
    <main className="p-6 min-h-screen bg-gradient-to-br from-yellow-100 via-orange-200 to-yellow-300">
      <HeaderBar
        onToggleFavorites={toggleShowFavorites}
        showFavorites={showFavoritesOnly.current}
      />
      <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
      <CardGrid
        cards={filteredCards}
        onAddToCart={addToCart}
        onToggleFavorite={toggleFavorite}
        favorites={favorites}
      />
    </main>
  );
}
