import { fireEvent, render, screen } from '@testing-library/react';
import { useFavoritesStore } from '../../store/useFavoritesStore';
import { Character } from '../../types';
import CharacterCard from '../CharacterCard';

jest.mock('../../store/useFavoritesStore');

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} fill={undefined} priority={undefined} />;
  },
}));

const mockCharacter: Character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: { name: 'Earth', url: '' },
  location: { name: 'Earth', url: '' },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: [],
  url: '',
  created: '',
};

describe('Componente: CharacterCard', () => {
  const mockSetSelectedCharacter = jest.fn();
  const mockToggleFavorite = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useFavoritesStore as unknown as jest.Mock).mockReturnValue({
      selectedCharacter: null,
      setSelectedCharacter: mockSetSelectedCharacter,
      toggleFavorite: mockToggleFavorite,
      isFavorite: () => false,
    });
  });

  it('1. Renderiza el nombre y la imagen del personaje correctamente', () => {
    render(<CharacterCard character={mockCharacter} />);
    
    expect(screen.getByText('Rick')).toBeInTheDocument();
    
    const image = screen.getByAltText('Rick Sanchez');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockCharacter.image);
  });

  it('2. Llama a setSelectedCharacter al hacer clic en la tarjeta', () => {
    render(<CharacterCard character={mockCharacter} />);
    
    const cardElement = screen.getByText('Rick').closest('div');
    fireEvent.click(cardElement!);

    expect(mockSetSelectedCharacter).toHaveBeenCalledTimes(1);
    expect(mockSetSelectedCharacter).toHaveBeenCalledWith(mockCharacter);
  });

  it('3. Llama a toggleFavorite al hacer clic en el botón de Like sin seleccionar la tarjeta', () => {
    render(<CharacterCard character={mockCharacter} />);
    
    const likeButton = screen.getByRole('button', { name: /like/i });
    fireEvent.click(likeButton);

    expect(mockToggleFavorite).toHaveBeenCalledTimes(1);
    expect(mockToggleFavorite).toHaveBeenCalledWith(mockCharacter);
    expect(mockSetSelectedCharacter).not.toHaveBeenCalled();
  });

  it('4. Aplica la clase de "Liked" si el personaje está en favoritos', () => {
    (useFavoritesStore as unknown as jest.Mock).mockReturnValue({
      selectedCharacter: null,
      setSelectedCharacter: mockSetSelectedCharacter,
      toggleFavorite: mockToggleFavorite,
      isFavorite: () => true, 
    });

    render(<CharacterCard character={mockCharacter} />);
    
    const likeButton = screen.getByRole('button', { name: /liked/i });
    expect(likeButton).toBeInTheDocument();
  });
});