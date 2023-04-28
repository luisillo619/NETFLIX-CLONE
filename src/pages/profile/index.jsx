import NavBar from "@/components/NavBar/NavBar";
import styles from "./ProfileScreen.module.scss";
import Image from "next/image";
import netflixAvatar from "../../assets/netflix-avatar.png";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/reducer/userSlice";
import { signOut } from "firebase/auth";
import db from "@/helpers/firebase";
import { auth } from "@/helpers/firebase";
import { collection, query, where, getDocs, doc } from "firebase/firestore";

import LoginScreen from "@/components/Login/LoginScreen/LoginScreen";
import PlansScreen from "@/components/PlansScreen/PlansScreen";
import { useRouter } from "next/router";

export default function ProfileScreen({ productsDb }) {
  // va a estar al tanto de si existe el ususario en redux o no
  const user = useSelector(selectUser);
  const router = useRouter()

  const handleLogut = async () =>{
    await signOut(auth)
    router.push("/")
  }
  return (
    <>
      {!user ? (
        <LoginScreen />
      ) : (
        <>
          <NavBar />
          <div className={styles.profileScreen}>
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
                    <h3>Plans</h3>
                    <PlansScreen products={productsDb} user={user} />
                    <button
                      type="button"
                      onClick={handleLogut}
                      className={styles.profileScreen__signOut}
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export async function getServerSideProps() {
  try {
    const q = query(collection(db, "products"), where("active", "==", true));
    const querySnapshot = await getDocs(q);

    const products = {};
    const promises = [];

    querySnapshot.forEach(async (productDoc) => {
      products[productDoc.id] = productDoc.data();
      const productDocRef = doc(db, "products", productDoc.id);
      const pricePromise = getDocs(collection(productDocRef, "prices")).then(
        (priceSnap) => {
          priceSnap.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          });
        }
      );
      promises.push(pricePromise);
    });

    await Promise.all(promises);
    return {
      props: {
        productsDb: products,
      },
    };
  } catch (error) {
 
    return {
      props: {
        productsDb: null,
      },
    };
  }
}
