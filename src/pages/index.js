import { useSelector } from "react-redux";

import axios from "@/helpers/axios";
import requests from "@/helpers/Request";
import HomeScreen from "@/components/HomeScreen/HomeScreen";
import LoginScreen from "@/components/Login/LoginScreen/LoginScreen";
import { selectUser } from "@/redux/reducer/userSlice";
import Head from "next/head";
export default function Home({ initialMovie }) {
  const user = useSelector(selectUser);   

  return (
    <>
      <div>
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        /></div>
     <div>
      {user ? <HomeScreen initialMovie={initialMovie} /> : <LoginScreen /> }
    </div>
    </>
   
  );
}

export async function getServerSideProps() {
  const { data } = await axios(requests.fetchNetflixOriginals);
  const randomMovieIndex = Math.floor(Math.random() * data.results.length);
  const randomMovie = data.results[randomMovieIndex];
  return {
    props: {
      initialMovie: randomMovie,
    },
  };
}
