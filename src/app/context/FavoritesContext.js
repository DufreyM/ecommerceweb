"use client";

import { createContext, useState } from "react";

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  function toggleFavorite(card) {
    setFavorites((prev) =>
      prev.some((fav) => fav.id === card.id)
        ? prev.filter((fav) => fav.id !== card.id)
        : [...prev, card]
    );
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}
