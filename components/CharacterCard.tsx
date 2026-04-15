import { Heart } from 'lucide-react';
import Image from "next/image";
import { useFavoritesStore } from "../store/useFavoritesStore";
import { Character } from "../types";
import styles from "./CharacterCard.module.css";

interface CharacterCardProps {
  character: Character;
}

export default function CharacterCard({ character }: CharacterCardProps) {
  const { 
    selectedCharacter, 
    setSelectedCharacter, 
    toggleFavorite, 
    isFavorite 
  } = useFavoritesStore();

  const isActive = selectedCharacter?.id === character.id;
  const isFav = isFavorite(character.id);

  return (
    <div
      className={`${styles.card} ${isActive ? styles.activeCard : ''}`}
      onClick={() => setSelectedCharacter(character)}
    >
      <h3 className={styles.cardTitle}>{character.name.split(' ')[0]}</h3>
      
      <div className={styles.cardImageWrapper}>
        <Image 
          src={character.image} 
          alt={character.name} 
          fill 
          className={styles.cardImage} 
        />
      </div>
      
      <button 
        className={`${styles.likeBtn} ${isFav ? styles.liked : ''}`}
        onClick={(e) => {
          e.stopPropagation(); 
          toggleFavorite(character);
        }}
      >
        <Heart 
          size={16} 
          fill={isFav ? "#ff4b4b" : "none"} 
          color={isFav ? "#ff4b4b" : "#fff"} 
        /> 
        {isFav ? 'Liked' : 'Like'}
      </button>
    </div>
  );
}