import { Character } from '../types';

export interface APIResponse<T> {
  results: T[];
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
}

const BASE_URL = 'https://rickandmortyapi.com/api';

export const rickMortyService = {
  getCharacters: async (page: number = 1): Promise<APIResponse<Character>> => {
    try {
      const response = await fetch(`${BASE_URL}/character?page=${page}`);
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("Error en rickMortyService.getCharacters:", error);
      throw error;
    }
  },

  getCharacterByName: async (name: string): Promise<Character[]> => {
    try {
      const response = await fetch(`${BASE_URL}/character/?name=${encodeURIComponent(name)}`);
      if (!response.ok) {
        if (response.status === 404) return [];
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error("Error en rickMortyService.getCharacterByName:", error);
      throw error;
    }
  }
};