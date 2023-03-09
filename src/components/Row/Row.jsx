import axios from "../../helpers/axios";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./Row.module.scss";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

export default function Row({ title, fetchUrl, isLargeRow = false }) {
  const refRow = useRef(null);
  const leftArrowRef = useRef(null);
  const rightArrowRef = useRef(null);
  const [movies, setMovies] = useState([]);
  const baseUrl = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    }
    fetchData();
  }, [fetchUrl]);

  const handleLeftArrowClick = () => {
    refRow.current.scrollLeft -= refRow.current.offsetWidth;
  };

  const handleRightArrowClick = () => {
    refRow.current.scrollLeft += refRow.current.offsetWidth;
  };

  return (
    <div className={styles.row}>
      <h2>{title}</h2>

      <div className={styles.row__carousel}>
        <button
          onClick={handleLeftArrowClick}
          ref={leftArrowRef}
          className={styles.row__leftArrow}
        >
          <ChevronLeftIcon className={styles.row__iconLeftArrow} />
        </button>

        <div ref={refRow} className={styles.row__posters}>
          {movies.map(
            (movie) =>
              ((isLargeRow && movie.poster_path) ||
                (!isLargeRow && movie.backdrop_path)) && (
                <img
                  className={`${styles.row__poster} ${
                    isLargeRow && styles.row__posterLarge
                  }`}
                  key={movie.id}
                  src={`${baseUrl}${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  }`}
                  alt={movie.name}
                />
              )
          )}
        </div>

        <button
          onClick={handleRightArrowClick}
          ref={rightArrowRef}
          className={styles.row__rightArrow}
        >
          <ChevronRightIcon className={styles.row__iconRightArrow} />
        </button>
      </div>
    </div>
  );
}
