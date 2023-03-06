import axios from "../../helpers/axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Row.module.scss";

export default function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const baseUrl = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    async function fetchData() {
      const request = await axios(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div className={styles.row}>
      <h2>{title}</h2>
      <div className={styles.row__posters}>
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
    </div>
  );
}
