import { useSelector } from "react-redux";

import axios from "@/helpers/axios";
import requests from "@/helpers/Request";
import HomeScreen from "@/components/HomeScreen/HomeScreen";
import LoginScreen from "@/components/Login/LoginScreen/LoginScreen";
import { selectUser } from "@/redux/reducer/userSlice";

export default function Home({ initialMovie }) {
  const user = useSelector(selectUser);
// http://localhost:3000/

  return (
    <div>
      {user ? <HomeScreen initialMovie={initialMovie} /> : <LoginScreen /> }
    </div>
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
