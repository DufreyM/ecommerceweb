"use client";
import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";

export default function CardHeader({ card, isFavorite, toggleFavorite }) {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center mb-4">
      <button
        onClick={() => router.push("/")}
        className="text-red-600 hover:text-red-800 font-bold text-2xl transition-transform hover:scale-110"
      >
        ❌
      </button>
      <div className="flex gap-4">
        <button
          onClick={() => toggleFavorite(card)}
          className="text-2xl transition-transform hover:scale-110"
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
        <button
          onClick={() => router.push("/carrito")}
          className="transition-transform hover:scale-110"
        >
          <ShoppingCart className="w-7 h-7 text-blue-600" />
        </button>
      </div>
    </div>
  );
}
