import React from "react";
import styles from "../styles/SocialIcons.module.css";
import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export default function SocialIcons() {
  return (
    <div className={styles.socialIcons}>
      <div>
        <Link
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.button} ${styles.downloadButton}`}
        >
          Download Resume
        </Link>
        <Link
          href="/contact"
          className={`${styles.button} ${styles.contactButton}`}
        >
          Contact Me
        </Link>
      </div>
      <div className={styles.links}>
        <Link
          href="https://github.com/and-rews"
          target="_blank"
          rel="noopener noreferrer"
          className="mr-5 hover:text-orange-700"
        >
          <Github />
        </Link>
        <Link
          href="https://www.linkedin.com/in/andrews-osei?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
          target="_blank"
          rel="noopener noreferrer"
          className="mr-5 hover:text-orange-700"
        >
          <Linkedin />
        </Link>
        <Link
          href="https://x.com/devdrews1"
          target="_blank"
          rel="noopener noreferrer"
          className="mr-5 hover:text-orange-700"
        >
          <Twitter />
        </Link>
        <Link
          href="https://web.facebook.com/devdrews1"
          target="_blank"
          rel="noopener noreferrer"
          className="mr-5 hover:text-orange-700"
        >
          <Facebook />
        </Link>
        <Link
          href="https://www.instagram.com/devdrews1/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-orange-700"
        >
          <Instagram />
        </Link>
      </div>
    </div>
  );
}
