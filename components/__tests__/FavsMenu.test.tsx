import { fireEvent, render, screen } from '@testing-library/react';
import { useFavoritesStore } from '../../store/useFavoritesStore';
import FavsMenu from '../FavsMenu';

jest.mock('../../store/useFavoritesStore');

describe('Componente: FavsMenu', () => {
  const mockSetSelectedCharacter = jest.fn();
  const mockOnToggle = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('1. Muestra el mensaje "No hay favoritos" cuando la lista está vacía', () => {
    (useFavoritesStore as unknown as jest.Mock).mockReturnValue({
      favorites: [],
      setSelectedCharacter: mockSetSelectedCharacter,
    });

    render(<FavsMenu isOpen={true} onToggle={mockOnToggle} />);
    
    expect(screen.getByText('No hay favoritos')).toBeInTheDocument();
  });

  it('2. Renderiza la lista de favoritos y permite seleccionar uno', () => {
    const mockFav = { id: 1, name: 'Morty Smith' };
    
    (useFavoritesStore as unknown as jest.Mock).mockReturnValue({
      favorites: [mockFav],
      setSelectedCharacter: mockSetSelectedCharacter,
    });

    render(<FavsMenu isOpen={true} onToggle={mockOnToggle} />);
    
    const favItem = screen.getByText('MORTY SMITH');
    expect(favItem).toBeInTheDocument();

    fireEvent.click(favItem);

    expect(mockSetSelectedCharacter).toHaveBeenCalledWith(mockFav);
    expect(mockOnToggle).toHaveBeenCalled();
  });
});