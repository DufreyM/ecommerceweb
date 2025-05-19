export const dynamic = "force-dynamic"; // Siempre SSR (opcional pero recomendado)

async function getCardById(id) {
  const res = await fetch(`https://api.pokemontcg.io/v2/cards/${id}`, {
    headers: {
      "X-Api-Key": "89bf9437-6145-41f5-82b5-280d4d522ce3",
    },
    cache: "no-store", // no usar caché
  });

  if (!res.ok) {
    throw new Error("No se pudo obtener la carta");
  }

  const data = await res.json();
  return data.data;
}

export default async function CardDetailPage({ params }) {
  const card = await getCardById(params.id);

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{card.name}</h1>
      <img
        src={card.images.large}
        alt={card.name}
        className="w-full max-w-md mx-auto mb-6"
      />

      <div className="space-y-2">
        <p><strong>Supertipo:</strong> {card.supertype}</p>
        {card.subtypes && <p><strong>Subtipos:</strong> {card.subtypes.join(", ")}</p>}
        {card.types && <p><strong>Tipo:</strong> {card.types.join(", ")}</p>}
        {card.rarity && <p><strong>Rareza:</strong> {card.rarity}</p>}
        {card.set?.name && <p><strong>Set:</strong> {card.set.name}</p>}

        {card.attacks?.length > 0 && (
          <div>
            <strong>Ataques:</strong>
            <ul className="list-disc list-inside">
              {card.attacks.map((atk, index) => (
                <li key={index}>{atk.name} - {atk.damage}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
