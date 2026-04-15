import { useFavoritesStore } from "../store/useFavoritesStore";
import styles from "./FavsMenu.module.css";

interface FavsMenuProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function FavsMenu({ isOpen, onToggle }: FavsMenuProps) {
  const { favorites, setSelectedCharacter } = useFavoritesStore();

  return (
    <div className={styles.favsContainer}>
      <button 
        className={styles.favsButton} 
        onClick={onToggle}
      >
        FAVS
      </button>
      
      {isOpen && (
        <div className={styles.favsDropdown}>
          {favorites.length === 0 ? (
            <div className={styles.favsItem}>No hay favoritos</div>
          ) : (
            favorites.map((fav) => (
              <div 
                key={fav.id} 
                className={styles.favsItem}
                onClick={() => {
                  setSelectedCharacter(fav); 
                  onToggle(); 
                }}
              >
                {fav.name.toUpperCase()}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}