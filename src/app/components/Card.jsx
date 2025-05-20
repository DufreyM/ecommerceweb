
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import { FavoritesContext } from "@/context/FavoritesContext";
import { Heart, HeartOff, ShoppingCart } from "lucide-react";
export default function Card({ card }) {
  const { addToCart } = useContext(CartContext);
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const isFavorited = favorites.some((fav) => fav.id === card.id);
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center transition-transform hover:scale-105">
      <img
        src={card.images.large}
        alt={card.name}
        className="w-full h-auto object-contain rounded-lg mb-4"
      />
      <h2 className="text-lg font-bold mb-2 text-center">{card.name}</h2>
      <div className="flex justify-between w-full mt-auto">
        <button
          onClick={() => addToCart(card)}
          className="bg-green-500 hover:bg-green-600 text-white rounded-full p-2"
        >
          <ShoppingCart size={20} />
        </button>
        <button
          onClick={() => toggleFavorite(card)}
          className="text-red-500 hover:text-red-600"
        >
          {isFavorited ? <HeartOff size={20} /> : <Heart size={20} />}
        </button>
      </div>
    </div>
  );
}
