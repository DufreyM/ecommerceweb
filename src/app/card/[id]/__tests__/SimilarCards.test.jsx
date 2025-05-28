import { render, screen, fireEvent } from '@testing-library/react'
import SimilarCards from '../SimilarCards'
import { useRouter } from 'next/navigation'

// Mock del router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}))

describe('SimilarCards', () => {
  const mockPush = jest.fn()

  const mockCards = [
    {
      id: 'card-1',
      name: 'Charmander',
      images: { small: '/charmander.jpg' }
    },
    {
      id: 'card-2',
      name: 'Squirtle',
      images: { small: '/squirtle.jpg' }
    }
  ]

  beforeEach(() => {
    useRouter.mockReturnValue({ push: mockPush })
    jest.clearAllMocks()
  })

  test('renderiza las cartas similares correctamente', () => {
    render(<SimilarCards similarCards={mockCards} />)
    expect(screen.getByText('Charmander')).toBeInTheDocument()
    expect(screen.getByText('Squirtle')).toBeInTheDocument()
    expect(screen.getByAltText('Charmander')).toHaveAttribute('src', '/charmander.jpg')
  })

  test('navega al hacer click en una carta', () => {
    render(<SimilarCards similarCards={mockCards} />)
    fireEvent.click(screen.getByText('Charmander'))
    expect(mockPush).toHaveBeenCalledWith('/card/card-1')
  })
})
