import { Search } from 'lucide-react';
import styles from "./SearchForm.module.css";
interface SearchFormProps {
  formAction: (payload: FormData) => void; 
  isPending: boolean;
}

export default function SearchForm({ formAction, isPending }: SearchFormProps) {
  return (
    <form action={formAction} className={styles.searchForm}>
      <div className={styles.searchContainer}>
        <Search size={18} className={styles.searchIcon} />
        <input 
          type="text" 
          name="search" 
          placeholder="Find your character..." 
          className={styles.searchInput} 
          disabled={isPending} 
        />
      </div>
    </form>
  );
}