import React from "react";
import styles from "./SignupScreen.module.scss";
export default function SignUpScreen() {
  return (
    <div className={styles.signupScreen}>
      <form>
        <h1>Sign In</h1>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Sign in</button>
        <h4>
          <span className={styles.signupScreen__gray}>New to Netflix?</span>
          <span className={styles.signupScreen__link}>Sign Up now.</span>
        </h4>
      </form>
    </div>
  );
}
