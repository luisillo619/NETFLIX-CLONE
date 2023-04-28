import { auth } from "@/helpers/firebase";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Link from "next/link";
import styles from "./SignInScreen.module.scss";
import { useRouter } from "next/router";
// registro

export default function SignInScreen() {
  const router = useRouter() 
  const [emailState, setEmailState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [error, setError] = useState();

  const signIn = (e) => {
    e.preventDefault();
    if (!emailState || !passwordState) {
      setError("Error (You must enter the email and password to sign In)");
      return;
    }
    signInWithEmailAndPassword(auth, emailState, passwordState)
      .then((authUser) => router.push("/"))
      .catch((err) => {
        const inicio = err.message.indexOf(":") + 1;

        const subcadena = err.message.slice(inicio);
        setError(subcadena);
      });
  };


  return (
    <>   
      <div className={styles.signupScreen}>
        <form>
          <h1>Sign In</h1>
          <input
            type="email"
            placeholder="Email"
            value={emailState}
            onChange={(e) => setEmailState(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={passwordState}
            onChange={(e) => setPasswordState(e.target.value)}
          />
          <h3>{error}</h3>
          <button type="submit" onClick={signIn}>
            Sign in
          </button>
          <h4>
            <span className={styles.signupScreen__gray}>New to Netflix?</span>
            <Link
              href="/signUp"
              className={styles.signupScreen__link}
            >
              Sign Up now.
            </Link>          
          </h4>
        </form>
      </div>
    </>
  );
}
