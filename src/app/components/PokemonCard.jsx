import { useState, useMemo } from "react";

export default function PokemonCard({
  card,
  onAddToCart,
  onToggleFavorite,
  isFavorite,
  onClick,
}) {
  const [likes, setLikes] = useState(0);

  const handleLike = (e) => {
    e.stopPropagation();
    setLikes((prev) => prev + 1);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart({
      ...card,
      quantity: 1,
    });
  };

  const randomRating = useMemo(() => Math.floor(Math.random() * 3) + 3, []);

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:scale-105 transition transform cursor-pointer"
    >
      <img
        src={card.images.small}
        alt={card.name}
        className="w-full h-64 object-contain p-4"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{card.name}</h2>

        <div className="flex items-center text-yellow-500 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i}>{i < randomRating ? "★" : "☆"}</span>
          ))}
        </div>

        {card.originalPrice ? (
          <div className="text-sm">
            {card.discountPrice ? (
              <>
                <p className="text-gray-500 line-through">
                  Precio original: ${card.originalPrice.toFixed(2)}
                </p>
                <p className="text-green-600 font-semibold">
                  Precio con descuento: ${card.discountPrice.toFixed(2)}
                </p>
              </>
            ) : (
              <p className="text-green-600 font-semibold">
                Precio: ${card.originalPrice.toFixed(2)}
              </p>
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-500">Precio: N/A</p>
        )}

        <p className="text-sm text-gray-500">
          {card.supertype} - {card.subtypes?.join(", ")}
        </p>

        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={handleAddToCart}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
          >
            Agregar al carrito
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(card);
            }}
            className={`px-3 py-1 rounded ${
              isFavorite ? "bg-red-500 text-white" : "bg-gray-200"
            }`}
          >
            ❤️
          </button>

          <button
            onClick={handleLike}
            className="flex items-center gap-1 px-3 py-1 rounded bg-pink-100 hover:bg-pink-200 text-pink-600"
          >
            💖 {likes}
          </button>
        </div>
      </div>
    </div>
  );
}
