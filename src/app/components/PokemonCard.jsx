export default function PokemonCard({ card, onAddToCart, onToggleFavorite, isFavorite, onClick }) {
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
        <p className="text-sm text-green-600">
          Precio: ${card.tcgplayer?.prices?.holofoil?.market?.toFixed(2) ?? "N/A"}
        </p>
        <p className="text-sm text-gray-500">
          {card.supertype} - {card.subtypes?.join(", ")}
        </p>
        <div className="mt-4 flex justify-between">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(card);
            }}
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
        </div>
      </div>
    </div>
  );
}
