import { ChevronDown, ChevronUp } from 'lucide-react';
import { Character } from "../types";
import CharacterCard from "./CharacterCard";
import FavsMenu from "./FavsMenu";
import styles from "./ListSection.module.css";
import SearchForm from "./SearchForm";

interface ListSectionProps {
  formAction: (payload: FormData) => void;
  isPending: boolean;
  currentItems: Character[];
  handlePrevPage: () => void;
  handleNextPage: () => void;
  currentPage: number;
  totalPages: number;
  isFavsOpen: boolean;
  setIsFavsOpen: (isOpen: boolean) => void;
}

export default function ListSection({
  formAction,
  isPending,
  currentItems,
  handlePrevPage,
  handleNextPage,
  currentPage,
  totalPages,
  isFavsOpen,
  setIsFavsOpen
}: ListSectionProps) {
  return (
    <section className={styles.listSection}>
      
      <SearchForm formAction={formAction} isPending={isPending} />

      <div className={styles.gridAndControlsWrapper}>
        <div className={styles.grid}>
          {currentItems.map((char) => (
            <CharacterCard key={char.id} character={char} />
          ))}
        </div>

        <div className={styles.sideControls}>
          <button 
            onClick={handlePrevPage} 
            disabled={currentPage === 0} 
            className={styles.pageBtn}
          >
            <ChevronUp size={24} />
          </button>
          <button 
            onClick={handleNextPage} 
            disabled={currentPage >= totalPages - 1} 
            className={styles.pageBtn}
          >
            <ChevronDown size={24} />
          </button>
        </div>
      </div>

      <FavsMenu 
        isOpen={isFavsOpen} 
        onToggle={() => setIsFavsOpen(!isFavsOpen)} 
      />

    </section>
  );
}