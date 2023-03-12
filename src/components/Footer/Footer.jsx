import React from "react";
import styles from "./Footer.module.scss";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <p className={styles.footer__text}>Realizado por: <span>Luis Rangel</span> </p>
        <div className={styles.footer__icons}>
          <Link
            href="https://www.linkedin.com/in/luisrangel-lagunes/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </Link>
          <Link
            href="https://wa.me/525582482375"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp />
          </Link>
          <Link
            href="https://github.com/luisillo619"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </Link>
        </div>
      </div>
    </footer>
  );
}
