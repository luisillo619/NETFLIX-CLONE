import NavBar from "@/components/NavBar/NavBar";
import styles from "./ProfileScreen.module.scss";
import Image from "next/image";
import netflixAvatar from "../../assets/netflix-avatar.png";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/reducer/userSlice";
import { signOut } from "firebase/auth";
import { auth } from "@/helpers/firebase";
import Layout from "@/components/Layout/Layout";
import LoginScreen from "@/components/Login/LoginScreen/LoginScreen";

export default function ProfileScreen() {
  const user = useSelector(selectUser);

  return (
    <Layout>
      {!user ? (
        <LoginScreen />
      ) : (
        <div className={styles.profileScreen}>
          <NavBar />
          <div className={styles.profileScreen__body}>
            <h1>Edit Profile</h1>
            <div className={styles.profileScreen__info}>
              <Image
                className={styles.profileScreen__avatar}
                src={netflixAvatar}
                alt="netflix avatar"
                placeholder="blur"
              />
              <div className={styles.profileScreen__details}>
                <h2>{user?.email}</h2>
                <div className={styles.profileScreen__plans}>
                  <button
                    onClick={(e) => signOut(auth)}
                    className={styles.profileScreen__signOut}
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
