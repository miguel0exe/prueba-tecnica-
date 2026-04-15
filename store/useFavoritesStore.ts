import { create } from 'zustand';
import { Character } from '../types';

interface StoreState {
  favorites: Character[];
  selectedCharacter: Character | null;
  fetchFavorites: () => Promise<void>;
  toggleFavorite: (character: Character) => Promise<void>;
  isFavorite: (id: number) => boolean;
  setSelectedCharacter: (character: Character) => void;
}

export const useFavoritesStore = create<StoreState>((set, get) => ({
  favorites: [],
  selectedCharacter: null,

  fetchFavorites: async () => {
    try {
      const res = await fetch('http://localhost:4000/favorites');
      const data = await res.json();
      set({ favorites: data });
    } catch (error) {
      console.error("Error al cargar favoritos:", error);
    }
  },

  toggleFavorite: async (character) => {
    const { favorites } = get();
    const exists = favorites.find((fav) => fav.id === character.id);

    try {
      if (exists) {
        await fetch(`http://localhost:4000/favorites/${character.id}`, { 
          method: 'DELETE' 
        });
        set({ favorites: favorites.filter((fav) => fav.id !== character.id) });
      } else {
        await fetch('http://localhost:4000/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(character),
        });
        set({ favorites: [...favorites, character] });
      }
    } catch (error) {
      console.error("Error al actualizar favorito:", error);
    }
  },

  isFavorite: (id) => {
    return get().favorites.some((fav) => fav.id === id);
  },

  setSelectedCharacter: (character) => {
    set({ selectedCharacter: character });
  }
}));