import Image from "next/image";
import { useFavoritesStore } from "../store/useFavoritesStore";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  const { selectedCharacter } = useFavoritesStore();

  if (!selectedCharacter) {
    return (
      <section className={`${styles.heroSection} ${styles.skeleton}`}>
        <div className={styles.skeletonPulse}>
          <p className={styles.loadingText}>CARGANDO PERSONAJE...</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroCard}>
        <div className={styles.liveIndicator}>
          <span className={`${styles.dot} ${selectedCharacter.status === 'Dead' ? styles.dotDead : styles.dotAlive}`}></span> 
          {selectedCharacter.status === 'Dead' ? 'MUERTO' : 'VIVO'}
        </div>
        
        <div className={styles.heroImageWrapper}>
          <Image src={selectedCharacter.image} alt={selectedCharacter.name} fill className={styles.heroImage} priority />
        </div>
        <div className={styles.heroInfo}>
          <h2 className={styles.heroName}>{selectedCharacter.name}</h2>
          <p className={styles.heroSpecies}>
            {selectedCharacter.species} <br />
            <span className={styles.heroSubtype}>{selectedCharacter.type || "No subtype"}</span>
          </p>
          <div className={styles.heroStats}>
             <div className={styles.stat}><span className={styles.statLabel}>Origin</span><span className={styles.statValue}>{selectedCharacter.origin.name}</span></div>
             <div className={styles.stat}><span className={styles.statLabel}>Location</span><span className={styles.statValue}>{selectedCharacter.location.name}</span></div>
             <div className={styles.stat}><span className={styles.statLabel}>Gender</span><span className={styles.statValue}>{selectedCharacter.gender}</span></div>
             <div className={styles.stat}><span className={styles.statLabel}>Episodes</span><span className={styles.statValue}>{selectedCharacter.episode.length}</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}