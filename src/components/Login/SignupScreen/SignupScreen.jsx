import { auth } from "@/helpers/firebase";
import { useRef, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import styles from "./SignupScreen.module.scss";

export default function SignUpScreen({ email }) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState();
  // verificar que el ususario no exista y si ya existe igual va a dar error
  const register = (e) => {
    e.preventDefault();
    if (!emailRef.current.value || !passwordRef.current.value) {
      setError("Error (You must enter the email and password to register)");
      return;
    }
    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((err) => {
        const inicio = err.message.indexOf(":") + 1;

        const subcadena = err.message.slice(inicio ? inicio: 0);
        setError(subcadena);
      });
  };

  const signIn = (e) => {
    e.preventDefault();
    if (!emailRef.current.value || !passwordRef.current.value) {
      setError("Error (You must enter the email and password to sign In)");
      return;
    }
    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      // en el .then puedo mandar los datos del ususario a mi propia db
      .then((authUser) => console.log(authUser))
      .catch((err) => {
        const inicio = err.message.indexOf(":") + 1;

        const subcadena = err.message.slice(inicio );
        setError(subcadena);
      });
  };
  return (
    <div className={styles.signupScreen}>
      <form>
        <h1>Sign In</h1>
        <input
          ref={emailRef}
          type="email"
          placeholder="Email"
          defaultValue={email}
        />
        <input ref={passwordRef} type="password" placeholder="Password" />
        <h3>{error}</h3>
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
