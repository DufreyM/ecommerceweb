import { render, screen, fireEvent } from '@testing-library/react'
import CardHeader from '../CardHeader'
import { useRouter } from 'next/navigation'

// Mock de useRouter
jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}))

describe('CardHeader', () => {
  const mockPush = jest.fn()
  const mockToggleFavorite = jest.fn()

  const mockCard = {
    id: 'abc123',
    name: 'Pikachu'
  }

  beforeEach(() => {
    useRouter.mockReturnValue({ push: mockPush })
    jest.clearAllMocks()
  })

  test('navega al inicio al hacer click en el botón de cerrar (❌)', () => {
    render(<CardHeader card={mockCard} isFavorite={false} toggleFavorite={mockToggleFavorite} />)
    fireEvent.click(screen.getByText('❌'))
    expect(mockPush).toHaveBeenCalledWith('/')
  })

  test('llama a toggleFavorite al hacer click en el botón de favorito', () => {
    render(<CardHeader card={mockCard} isFavorite={false} toggleFavorite={mockToggleFavorite} />)
    fireEvent.click(screen.getByText('🤍')) // Corazón vacío
    expect(mockToggleFavorite).toHaveBeenCalledWith(mockCard)
  })

  test('muestra el corazón lleno si es favorito', () => {
    render(<CardHeader card={mockCard} isFavorite={true} toggleFavorite={mockToggleFavorite} />)
    expect(screen.getByText('❤️')).toBeInTheDocument()
  })

  test('navega al carrito al hacer click en el icono de carrito', () => {
    render(<CardHeader card={mockCard} isFavorite={false} toggleFavorite={mockToggleFavorite} />)
    const cartButton = screen.getByRole('button', { name: '' }) // No tiene texto, usamos role
    fireEvent.click(cartButton)
    expect(mockPush).toHaveBeenCalledWith('/carrito')
  })
})
