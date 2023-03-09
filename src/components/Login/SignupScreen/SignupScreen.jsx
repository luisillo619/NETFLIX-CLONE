import { auth } from "@/helpers/firebase";
import { useRef } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import styles from "./SignupScreen.module.scss";

export default function SignUpScreen() {
  const emailRef = useRef();
  const passwordRef = useRef();

  // verificar que el ususario no exista y si ya existe igual va a dar error
  const register = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
    // en el .then puedo mandar los datos del ususario a mi propia db
      .then((authUser) => console.log(authUser))
      .catch((err) => alert(err.message));
  };
  return (
    <div className={styles.signupScreen}>
      <form>
        <h1>Sign In</h1>
        <input ref={emailRef} type="email" placeholder="Email" />
        <input ref={passwordRef} type="password" placeholder="Password" />
        <button type="submit" onClick={signIn}>
          Sign in
        </button>
        <h4>
          <span className={styles.signupScreen__gray}>New to Netflix?</span>
          <span className={styles.signupScreen__link} onClick={register}>
            Sign Up now.
          </span>
        </h4>
      </form>
    </div>
  );
}
