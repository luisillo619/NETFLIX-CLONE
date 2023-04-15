import { auth } from "@/helpers/firebase";
import { useRef, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import styles from "./SignupScreen.module.scss";
import axios from "axios";

// registro
export default function SignUpScreen({ email }) {
  const [registerScreen, setRegisterScreen] = useState(true);
  const [emailState, setEmailState] = useState(email || "");
  const [passwordState, setPasswordState] = useState("");
  const [error, setError] = useState();

  const register = (e) => {
    e.preventDefault();
    if (!emailState || !passwordState) {
      setError("Error (You must enter the email and password to register)");
      return;
    }
    createUserWithEmailAndPassword(auth, emailState, passwordState)
      .then(() => {
        axios.post("/api/nodemailer", { email: emailState });
      })
      .catch((err) => {
        console.log(err);
        const inicio = err.message.indexOf(":") + 1;
        const subcadena = err.message.slice(inicio ? inicio : 0);
        setError(subcadena);
      });
  };

  const signIn = (e) => {
    e.preventDefault();
    if (!emailState || !passwordState) {
      setError("Error (You must enter the email and password to sign In)");
      return;
    }
    signInWithEmailAndPassword(auth, emailState, passwordState)
      .then((authUser) => console.log(authUser))
      .catch((err) => {
        const inicio = err.message.indexOf(":") + 1;

        const subcadena = err.message.slice(inicio);
        setError(subcadena);
      });
  };

  return (
    <>
      {registerScreen ? (
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
              <button
                className={styles.signupScreen__link}
                onClick={(e) => {
                  e.preventDefault();
                  setRegisterScreen(false);
                }}
              >
                Sign Up now.
              </button>
            </h4>
          </form>
        </div>
      ) : (
        <div className={styles.signupScreen}>
          <form>
            <h1>Sign Up</h1>
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
            <button type="submit" onClick={register}>
              Sign up
            </button>
            <h4>
              <span className={styles.signupScreen__gray}>
                Already have an account?
              </span>
              <button
                className={styles.signupScreen__link}
                onClick={(e) => {
                  e.preventDefault();
                  setRegisterScreen(true);
                }}
              >
                Sign in now.
              </button>
            </h4>
          </form>
        </div>
      )}
    </>
  );
}
