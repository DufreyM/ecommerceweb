'use client'

export default function CardDetail ({ card, typeClass, addToCart }) {
  return (
    <div className={`rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-6 ${typeClass}`}>
      <img
        src={card.images.large}
        alt={card.name}
        className="w-full md:w-1/3 object-contain"
      />
      <div className="flex-1 space-y-2">
        <h1 className="text-3xl font-extrabold animate-pulse">{card.name}</h1>
        <p><strong>Supertipo:</strong> {card.supertype}</p>
        <p><strong>Subtipos:</strong> {card.subtypes?.join(', ') || 'N/A'}</p>
        <p><strong>HP:</strong> {card.hp}</p>
        <p><strong>Tipo:</strong> {card.types?.join(', ')}</p>
        <p><strong>Evoluciona a:</strong> {card.evolvesTo?.join(', ') || '—'}</p>
        <p><strong>Rareza:</strong> {card.rarity}</p>

        {/* Precio */}
        <p><strong>Precio:</strong> {
          card.discountPrice
            ? <>
              <span className="line-through text-gray-400">${card.originalPrice.toFixed(2)}</span>{' '}
              <span className="text-green-700 font-bold">${card.discountPrice.toFixed(2)}</span>
            </>
            : `$${card.originalPrice.toFixed(2)}`
        }</p>

        <p><strong>Debilidades:</strong> {card.weaknesses?.map(w => `${w.type} ${w.value}`).join(', ') || '—'}</p>
        <p><strong>Coste de retirada:</strong> {card.retreatCost?.join(', ') || '—'}</p>
        <p><strong>Artista:</strong> {card.artist}</p>
        <p><strong>Set:</strong> {card.set.name} ({card.set.series})</p>
        <p><strong>Lanzamiento:</strong> {card.set.releaseDate}</p>

        {card.rules?.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded p-2">
            <strong>Reglas:</strong>
            <ul className="list-disc ml-5">
              {card.rules.map((rule, i) => (
                <li key={i}>{rule}</li>
              ))}
            </ul>
          </div>
        )}

        {card.attacks?.length > 0 && (
          <div className="bg-slate-100 rounded p-3 mt-4">
            <strong className="block mb-1">Ataques:</strong>
            <ul className="space-y-2">
              {card.attacks.map((atk, i) => (
                <li key={i} className="border rounded p-2 bg-white shadow-sm">
                  <div><strong>{atk.name}</strong> ({atk.damage || '—'})</div>
                  <div><strong>Costo:</strong> {atk.cost?.join(', ')}</div>
                  <div className="text-sm text-gray-700">{atk.text}</div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Botón */}
        <button
          onClick={() => {
            addToCart({
              ...card,
              quantity: 1
            })
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded mt-4"
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  )
}
