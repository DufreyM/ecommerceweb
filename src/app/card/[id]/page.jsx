'use client'

import { useEffect, useState, useContext, use } from 'react'

import { CartContext } from '@/app/context/CartContext'
import { FavoritesContext } from '@/app/context/FavoritesContext'
import CardHeader from './CardHeader'
import CardDetail from './CardDetail'
import SimilarCards from './SimilarCards'

export default function CardPage ({ params }) {
  const { id } = use(params)

  const [card, setCard] = useState(null)
  const [similarCards, setSimilarCards] = useState([])
  const { addToCart } = useContext(CartContext)
  const { favorites, toggleFavorite } = useContext(FavoritesContext)
  const isFavorite = favorites.some((f) => f.id === id)

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const res = await fetch(`https://api.pokemontcg.io/v2/cards/${id}`)
        const data = await res.json()

        // Enriquecer con precios
        const originalPrice = data.data.tcgplayer?.prices?.holofoil?.market ?? 0
        const hasDiscount = Math.random() < 0.5
        const discountRate = 0.1 + Math.random() * 0.3
        const discountPrice = hasDiscount ? originalPrice * (1 - discountRate) : null

        const enrichedCard = {
          ...data.data,
          originalPrice,
          discountPrice
        }

        setCard(enrichedCard)

        const resAll = await fetch(
          `https://api.pokemontcg.io/v2/cards?pageSize=50&name=${data.data.name}`
        )
        const allData = await resAll.json()

        const currentTypes = data.data.types || []
        const currentName = data.data.name?.toLowerCase() || ''

        const similars = allData.data.filter((c) => {
          if (c.id === id) return false
          const otherTypes = c.types || []
          const nameMatch = c.name?.toLowerCase() === currentName
          const typeMatch = currentTypes.some((type) =>
            otherTypes.includes(type)
          )
          return nameMatch || typeMatch
        })

        setSimilarCards(similars)
      } catch (error) {
        console.error('Error al obtener la carta:', error)
      }
    }

    fetchCard()
  }, [id])

  if (!card) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-200 via-orange-300 to-yellow-500">
        <img
          src="/pikachucorriendo.gif"
          alt="Cargando..."
          className="w-64 h-64 object-contain"
        />
        <p className="text-2xl font-bold text-yellow-900 mt-4 animate-pulse">
          Cargando
        </p>
      </div>
    )
  }

  const typeColorMap = {
    Grass: 'bg-green-100 text-green-700',
    Fire: 'bg-red-100 text-red-700',
    Water: 'bg-blue-100 text-blue-700',
    Lightning: 'bg-yellow-100 text-yellow-700',
    Psychic: 'bg-purple-100 text-purple-700',
    Fighting: 'bg-orange-100 text-orange-700',
    Darkness: 'bg-gray-800 text-white',
    Metal: 'bg-gray-300 text-gray-900',
    Fairy: 'bg-pink-100 text-pink-700',
    Dragon: 'bg-yellow-200 text-yellow-800'
  }

  const typeClass = typeColorMap[card.types?.[0]] || 'bg-gray-100 text-gray-700'

  return (
    <main className="p-6 min-h-screen bg-gradient-to-br from-yellow-100 via-orange-200 to-yellow-300">
      <CardHeader card={card} isFavorite={isFavorite} toggleFavorite={toggleFavorite} />
      <CardDetail card={card} typeClass={typeClass} addToCart={addToCart} />
      {similarCards.length > 0 && <SimilarCards similarCards={similarCards} />}
    </main>
  )
}
