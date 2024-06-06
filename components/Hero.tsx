"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Typed, { ReactTyped } from "react-typed";
import styles from "../styles/Hero.module.css";
import Image from "next/image";

export default function Hero() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
    });
  }, []);

  return (
    <div>
      <h1 className={styles.dev} data-aos="fade-down">
        Dev<span className="text-orange-700">Drews</span>{" "}
      </h1>
      <div className={styles.hero}>
        <h1 className={styles.heading} data-aos="fade-up" data-aos-delay="100">
          <ReactTyped
            strings={[
              "Hi, I'm Andrews😎",
              "By day, a developer; by night, a hacker.",
              "Welcome to my digital playground!",
              "Explore my portfolio.",
              "Contact me for collaborations.",
            ]}
            typeSpeed={80}
            backSpeed={50}
            loop
          />
        </h1>
        <div className={styles.profile} data-aos="zoom-in" data-aos-delay="200">
          <Image
            src="/images/profile.png"
            alt="Profile "
            height={500}
            width={500}
            className={styles.profileImage}
          />
        </div>
      </div>
    </div>
  );
}
