import React from "react";
import styles from "./Footer.module.scss";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";


export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.dev}>
          <p className={styles.footer__text}>
            By: <span>Luis Rangel</span>
          </p>

          <div className={styles.footer__icons}>
            <Link
              href="https://www.linkedin.com/in/luisrangel-lagunes/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className={styles.icons}/>
            </Link>
            <Link
              href="https://wa.me/525582482375"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp className={styles.icons}/>
            </Link>
            <Link
              href="https://github.com/luisillo619"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className={styles.icons}/>
            </Link>
          </div>
        </div>

        <div className={styles.dev}>
          <p className={styles.footer__text}>
            By: <span>Carlos Mario</span>
          </p>
          <div className={styles.footer__icons}>
            <Link
              href="https://www.linkedin.com/in/carlosmario-pro/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className={styles.icons}/>
            </Link>
            <Link
              href="https://wa.me/573128082002"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp className={styles.icons}/>
            </Link>
            <Link
              href="https://github.com/CarlosMario-Pro"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className={styles.icons}/>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}