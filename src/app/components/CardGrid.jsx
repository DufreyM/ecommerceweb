import PokemonCard from "./PokemonCard";
import { useRouter } from "next/navigation";

export default function CardGrid({ cards, onAddToCart, onToggleFavorite, favorites }) {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <PokemonCard
          key={card.id}
          card={card}
          onAddToCart={onAddToCart}
          onToggleFavorite={onToggleFavorite}
          isFavorite={favorites.some((f) => f.id === card.id)}
          onClick={() => router.push(`/card/${card.id}`)}
        />
      ))}
    </div>
  );
}
