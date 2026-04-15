'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { rickMortyService } from '../services/rickMorty';
import { useFavoritesStore } from '../store/useFavoritesStore';
import { Character, SearchState } from '../types';
import styles from "./page.module.css";

import HeroSection from '../components/HeroSection';
import ListSection from '../components/ListSection';

async function searchCharacters(prevState: SearchState, formData: FormData): Promise<SearchState> {
  const query = formData.get('search') as string;
  try {
    if (!query) {
      const data = await rickMortyService.getCharacters(1);
      return { characters: data.results || [], error: null };
    }
    
    const results = await rickMortyService.getCharacterByName(query);
    return { characters: results, error: results.length === 0 ? "No se encontraron personajes" : null };
  } catch (error) {
    return { characters: [], error: "Error fetching characters" };
  }
}

export default function Home() {
  const { setSelectedCharacter, selectedCharacter, fetchFavorites } = useFavoritesStore();

  const [state, formAction, isPending] = useActionState(searchCharacters, { 
    characters: [], 
    error: null 
  });

  const [initialCharacters, setInitialCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isFavsOpen, setIsFavsOpen] = useState(false);
  const itemsPerPage = 4;

  const hasInitialized = useRef(false);

  useEffect(() => {
    const fetchInitial = async () => {
      try {
        const response = await rickMortyService.getCharacters();
        const results = response.results || [];
        
        setInitialCharacters(results);

        if (!hasInitialized.current && results.length > 0) {
          hasInitialized.current = true;
          
          if (!selectedCharacter) {
            setSelectedCharacter(results[0]);
          }
          
          fetchFavorites(); 
        }
      } catch (error) {
        console.error("Error fetching initial characters:", error);
      }
    };

    if (initialCharacters.length === 0) {
      fetchInitial();
    }
  }, [selectedCharacter, setSelectedCharacter, fetchFavorites, initialCharacters.length]);

  const handleSearchAction = (payload: FormData) => {
    setCurrentPage(0);
    formAction(payload);
  };

  const sourceList = state.characters.length > 0 ? state.characters : initialCharacters;
  const totalPages = Math.ceil(sourceList.length / itemsPerPage);
  const currentItems = sourceList.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const handleNextPage = () => { if (currentPage < totalPages - 1) setCurrentPage(prev => prev + 1); };
  const handlePrevPage = () => { if (currentPage > 0) setCurrentPage(prev => prev - 1); };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        
        <HeroSection />

        <ListSection 
          formAction={handleSearchAction} 
          isPending={isPending}
          currentItems={currentItems}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          currentPage={currentPage}
          totalPages={totalPages}
          isFavsOpen={isFavsOpen}
          setIsFavsOpen={setIsFavsOpen}
        />
        
      </main>
    </div>
  );
}