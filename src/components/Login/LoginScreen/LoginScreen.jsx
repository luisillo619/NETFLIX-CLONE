import styles from "./LoginScreen.module.scss";
import Image from "next/image";
import netflixLoginLogo from "../../../assets/netflix-login-logo.png";
import { useState } from "react";
import SignUpScreen from "../SignupScreen/SignupScreen";

export default function LoginScreen() {
  const [signIn, setSignIn] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <div className={styles.loginScreen}>
      <div className={styles.loginScreen__container}>


        <div className={styles.loginScreen__background}>
          <Image
            className={styles.loginScreen__logo}
            src={netflixLoginLogo}
            alt="netflix login logo"
            placeholder="blur"
          />
          <button
            className={styles.loginScreen__button}
            onClick={() => setSignIn(true)}
          >
            Sign in
          </button>
          {/* <div className={styles.loginScreen__gradient} /> */}
        </div>


        <div className={styles.loginScreen__body}>
          {signIn ? (
            <SignUpScreen email={email}/>
          ) : (
            <>
              <h1>Unlimited Films, Tv programmes and more.</h1>
              <h2>Watch anywhere. Cancel at any time.</h2>
              <h3>
                Ready to watch? Enter your email to create or restart your
                membership.
              </h3>
              <div className={styles.loginScreen__input}>
                <form>
                  <input
                    type="email"
                    placeholder="Email Adress"
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                  <button
                    className={styles.loginScreen__getStarted}
                    onClick={() => setSignIn(true)}
                  >
                    GET STARTED
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
