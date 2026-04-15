import { create } from 'zustand';
import { Character } from '../types';

interface StoreState {
  favorites: Character[];
  selectedCharacter: Character | null;
  fetchFavorites: () => Promise<void>;
  toggleFavorite: (character: Character) => Promise<void>;
  isFavorite: (id: number | string) => boolean; 
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
  
  const exists = favorites.find((fav) => String(fav.id_character) === String(character.id));

  try {
    if (exists) {
      await fetch(`http://localhost:4000/favorites/${exists.id}`, { 
        method: 'DELETE' 
      });
      
      set({ 
        favorites: favorites.filter((fav) => String(fav.id_character) !== String(character.id)) 
      });
    } else {
      const response = await fetch('http://localhost:4000/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...character,
          id_character: String(character.id) 
        }),
      });

      const newFavorite = await response.json();
      set({ favorites: [...favorites, newFavorite] });
    }
  } catch (error) {
    console.error("Error al sincronizar con json-server:", error);
  }
},
  isFavorite: (id) => {
    console.log(get().favorites.some((fav) => String(fav.id_character) === String(id)), id);
    return get().favorites.some((fav) => String(fav.id_character) === String(id));
  },

  setSelectedCharacter: (character) => {
    set({ selectedCharacter: character });
  }
}));