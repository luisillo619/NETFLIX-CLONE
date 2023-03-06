import React, { useState } from "react";
import styles from "./Banner.module.scss";


export default function Banner({initialMovie}) {
  const [movie, setMovie] = useState(initialMovie)

  const truncate = (string, n) => {
    return string?.length > n ? string.slice(0, n - 1) + "..." : string;
  };
  return (
    <header
      className={styles.banner}
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
        backgroundPosition: "center 0",
      }}
    >
      <div className={styles.banner__contents}>
        <h1 className={styles.banner__title}>{movie?.name || movie?.original_name}</h1>
        <div className={styles.banner__buttons}>
          <button className={styles.banner__button}>Play</button>
          <button className={styles.banner__button}>My list</button>
        </div>
        <h1 className={styles.banner__description}>
          {truncate(`${movie?.overview}`,150)}
        </h1>
      </div>
      <div className={`${styles["banner--fade-bottom"]}`} />
    </header>
  );
}

