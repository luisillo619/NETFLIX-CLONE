import styles from "./NavBar.module.scss";
import Image from "next/image";
import netflixLogo from "../../assets/netflix-logo.png";
import netflixAvatar from "../../assets/netflix-avatar.png";
import { useEffect, useState } from "react";
export default function NavBar() {
  const [show, handleShow] = useState(false);
  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else handleShow(false);
  };

  useEffect(()=>{
window.addEventListener("scroll",transitionNavBar);
return () => removeEventListener("scroll",transitionNavBar)
  },[])
  return (
    <div className={` ${styles.nav}  ${show && styles.nav__black}`}>
      <div className={styles.nav__contents}>
        <Image
          className={styles.nav__logo}
          src={netflixLogo}
          alt="netflix logo"
          placeholder="blur"
        />
        <Image
          className={styles.nav__avatar}
          src={netflixAvatar}
          alt="netflix avatar"
          placeholder="blur"
        />
      </div>
    </div>
  );
}
