import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/helpers/firebase";
import { useState } from "react";
import { login } from "@/redux/reducer/userSlice";
import { logout } from "@/redux/reducer/userSlice";
import { useRouter } from "next/router";
import styles from "./Layout.module.scss"
import Footer from "../Footer/Footer";
const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  // cuando se loguea o desloguea onAuthStateChange siempre esta escuchando y se ejecuta
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      setLoading(false);
      if (userAuth) {
        // se agregan los datos del ususario en redux
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        // se borran los datos del ususario de redux y se redireccion al home para que cuando se vuelva a logear no entre al profile directamente
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  if (loading) {
    return (
      <div
        style={{ background: "black", height: "100vh", width: "100%" }}
      ></div>
    );
  }

  return <div className={styles.layout}>{children}
  {/* <Footer/> */}
  </div>;
};

export default Layout;
