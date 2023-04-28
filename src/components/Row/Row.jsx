import axios from "../../helpers/axios";
import React, { useEffect, useState } from "react";
import styles from "./Row.module.scss";
import Slider from "react-slick";


export default function Row({ title, fetchUrl, isLargeRow = false }) {
  
  const [movies, setMovies] = useState([]);
  const baseUrl = "https://image.tmdb.org/t/p/w342";
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    }
    fetchData();
  }, [fetchUrl]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings = {
    infinite: true,
    speed: 600,
    slidesToShow: 5,
    slidesToScroll: 5,
    draggable:true,
    variableWidth: false,
    variableHigth: false
  };

  const staticGallery = (
    <>
      {movies.map(
        (movie) =>
          ((isLargeRow && movie.poster_path) ||
            (!isLargeRow && movie.backdrop_path)) && (
            <img
              alt={movie.id}
              className={`${styles.row__poster} ${
                isLargeRow && styles.row__posterLarge
              }`}
              key={movie.id}
              src={`${baseUrl}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
            />
          )
      )}
    </>
  );

  const sliderGallery = (
    <Slider {...settings}>
      {movies.map(
        (movie) =>
          ((isLargeRow && movie.poster_path) ||
            (!isLargeRow && movie.backdrop_path)) && (
            <img
              alt={movie.id}
              className={`${styles.row__poster} ${
                isLargeRow && styles.row__posterLarge
              }`}
              key={movie.id}
              src={`${baseUrl}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
            />
          )
      )}
    </Slider>
  );


  return (
    <div className={styles.row}>
      <h2>{title}</h2>

      <div className={styles.row__posters}>
        {isSmallScreen ? staticGallery : sliderGallery}
      </div>

    </div>
  );
}