import { render, screen } from '@testing-library/react';
import { useFavoritesStore } from '../../store/useFavoritesStore';
import HeroSection from '../HeroSection';

// Mockeamos Zustand y next/image
jest.mock('../../store/useFavoritesStore');
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} fill={undefined} priority={undefined} />,
}));

describe('Componente: HeroSection', () => {
  
  it('1. Renderiza el "Skeleton" si no hay ningún personaje seleccionado', () => {
    (useFavoritesStore as unknown as jest.Mock).mockReturnValue({
      selectedCharacter: null,
    });

    render(<HeroSection />);
    
    expect(screen.getByText('CARGANDO PERSONAJE...')).toBeInTheDocument();
  });

  it('2. Renderiza la información del personaje cuando existe en el store', () => {
    const mockCharacter = {
      id: 2,
      name: 'Morty Smith',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth' },
      location: { name: 'Earth' },
      image: 'morty.png',
      episode: ['1', '2', '3']
    };

    (useFavoritesStore as unknown as jest.Mock).mockReturnValue({
      selectedCharacter: mockCharacter,
    });

    render(<HeroSection />);
    
    expect(screen.queryByText('CARGANDO PERSONAJE...')).not.toBeInTheDocument();
    
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    expect(screen.getByText('VIVO')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument(); // length del array de episodios
  });
});