import axios from "../../helpers/axios";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Row.module.scss";
import Slider from "react-slick";

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

  const settings = {
    infinite: true,
    speed: 900,
    slidesToShow: 5,
    slidesToScroll: 5,
    draggable:true,
    variableWidth: false,
    variableHigth: false
  };

  return (
    <div className={styles.row}>
      <h2>{title}</h2>

      <div ref={refRow} className={styles.row__posters}>
        <Slider {...settings}>
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
        </Slider>
      </div>
    </div>
  );
}
