import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HeaderBar({ onToggleFavorites, showFavorites }) {
  const router = useRouter();

  return (
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
        onClick={onToggleFavorites}
        className="text-sm bg-yellow-300 hover:bg-yellow-400 px-3 py-1 rounded"
        title="Mostrar solo favoritos"
      >
        {showFavorites ? "Ver todos" : "Solo ❤️"}
      </button>
    </div>
  );
}
