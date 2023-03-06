import React from "react";
import Banner from "../Banner/Banner";
import NavBar from "../NavBar/NavBar";
import Row from "../Row/Row";
import styles from "./HomeScreen.module.scss";
import requests from "@/helpers/Request";

export default function HomeScreen({ initialMovie }) {
  return (
    <div className={styles.homeScreen}>
      <NavBar />

      <Banner initialMovie={initialMovie} />

      <Row
        title="NETFLIX ORIGINALS"
        isLargeRow
        fetchUrl={requests.fetchNetflixOriginals}
      />
     <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
    </div>
  );
}
