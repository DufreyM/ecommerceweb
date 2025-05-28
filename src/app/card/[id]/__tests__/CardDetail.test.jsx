import { render, screen, fireEvent } from '@testing-library/react'
import CardDetail from '../CardDetail'

describe('CardDetail', () => {
  const mockCard = {
    name: 'Pikachu',
    images: { large: 'https://example.com/pikachu.png' },
    supertype: 'Pokémon',
    subtypes: ['Basic'],
    hp: '60',
    types: ['Electric'],
    evolvesTo: ['Raichu'],
    rarity: 'Common',
    originalPrice: 10,
    discountPrice: 7,
    weaknesses: [{ type: 'Fighting', value: '×2' }],
    retreatCost: ['Colorless'],
    artist: 'Ken Sugimori',
    set: { name: 'Base Set', series: 'Original', releaseDate: '1999/01/09' },
    rules: ['Solo puedes tener una carta de esta en tu mazo.'],
    attacks: [{
      name: 'Impactrueno',
      damage: '30',
      cost: ['Electric', 'Colorless'],
      text: 'Puede paralizar al oponente.'
    }]
  }

  const mockAddToCart = jest.fn()

  it('muestra el nombre del Pokémon y el precio con descuento', () => {
    render(<CardDetail card={mockCard} typeClass="" addToCart={mockAddToCart} />)

    expect(screen.getByText('Pikachu')).toBeInTheDocument()
    expect(screen.getByText('$10.00')).toBeInTheDocument()
    expect(screen.getByText('$7.00')).toBeInTheDocument()
  })

  it('llama a addToCart al hacer clic en el botón', () => {
    render(<CardDetail card={mockCard} typeClass="" addToCart={mockAddToCart} />)

    const button = screen.getByText(/añadir al carrito/i)
    fireEvent.click(button)

    expect(mockAddToCart).toHaveBeenCalledTimes(1)
    expect(mockAddToCart).toHaveBeenCalledWith(expect.objectContaining({
      name: 'Pikachu',
      quantity: 1
    }))
  })
})
