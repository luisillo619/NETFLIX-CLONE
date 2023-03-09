import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/helpers/firebase";
import { useState } from "react";
import { login } from "@/redux/reducer/userSlice";
import { logout } from "@/redux/reducer/userSlice";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      setLoading(false);
      if (userAuth) {
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
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
  
  return <div >{children}</div>;
};

export default Layout;
