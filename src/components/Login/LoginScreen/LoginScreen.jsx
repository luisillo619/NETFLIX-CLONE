import styles from "./LoginScreen.module.scss";
import Link from "next/link";
import Image from "next/image";
import Footer from "../../Footer/Footer";
import netflixLoginLogo from "../../../assets/netflix-login-logo.png";


export default function LoginScreen() {
 
  return (
    <div className={styles.loginScreen__container}>      
      <div className={styles.loginScreen}>
        <div className={styles.loginScreen__background}>
          <button className={styles.button}>
          <Image
            className={styles.loginScreen__logo}
            src={netflixLoginLogo}
            alt="netflix login logo"
            placeholder="blur"
          />
          </button>

         <Link className={styles.loginScreen__button} href='http://localhost:3000/signIn'>
            Sign in        
         </Link>
        </div>

        <div className={styles.loginScreen__body}>
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
                  className={styles.form__input}
                  type="email"
                  placeholder="Email Adress"                   
                />
                  <Link className={styles.loginScreen__getStarted} href='http://localhost:3000/signIn'>
                    GET STARTED       
                  </Link>
              </form>
            </div>
          </>
        </div>

        <div className={styles.loginScreen__footer}>
          <Footer />
        </div>
      </div>
    </div>
  );
}
