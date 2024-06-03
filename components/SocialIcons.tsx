"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import styles from "../styles/SocialIcons.module.css";
import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export default function SocialIcons() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
    });
  }, []);

  return (
    <div className={styles.socialIcons}>
      <div>
        <Link
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.button} ${styles.downloadButton}`}
          data-aos="fade-up"
        >
          Download Resume
        </Link>
        <Link
          href="/contact"
          className={`${styles.button} ${styles.contactButton}`}
          data-aos="fade-up"
          data-aos-delay="100"
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
          data-aos="fade-left"
        >
          <Github />
        </Link>
        <Link
          href="https://www.linkedin.com/in/andrews-osei?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
          target="_blank"
          rel="noopener noreferrer"
          className="mr-5 hover:text-orange-700"
          data-aos="fade-left"
          data-aos-delay="100"
        >
          <Linkedin />
        </Link>
        <Link
          href="https://x.com/devdrews1"
          target="_blank"
          rel="noopener noreferrer"
          className="mr-5 hover:text-orange-700"
          data-aos="fade-left"
          data-aos-delay="200"
        >
          <Twitter />
        </Link>
        <Link
          href="https://web.facebook.com/devdrews1"
          target="_blank"
          rel="noopener noreferrer"
          className="mr-5 hover:text-orange-700"
          data-aos="fade-left"
          data-aos-delay="300"
        >
          <Facebook />
        </Link>
        <Link
          href="https://www.instagram.com/devdrews1/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-orange-700"
          data-aos="fade-left"
          data-aos-delay="400"
        >
          <Instagram />
        </Link>
      </div>
    </div>
  );
}
