import { auth } from "@/helpers/firebase";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import styles from "./SignupScreen.module.scss";
import axios from "axios";
import { useRouter } from "next/router";

// registro
export default function SignUpScreen() { 
  const router = useRouter()
  const [emailState, setEmailState] = useState("");
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
        router.push("/")
      })
      .catch((err) => {
        console.log(err);
        const inicio = err.message.indexOf(":") + 1;
        const subcadena = err.message.slice(inicio ? inicio : 0);
        setError(subcadena);
      });
  };


  return (
    <>
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
    
    </>
  );
}
