"use client";

import React from "react";
import Typed, { ReactTyped } from "react-typed";
import styles from "../styles/Hero.module.css";
import Image from "next/image";

export default function Hero() {
  return (
    <div className={styles.hero}>
      <h1 className={styles.heading}>
        <ReactTyped
          strings={[
            "Hi, I'm Andrews!",
            "Welcome to my digital playground!",
            "Explore my portfolio.",
            "Contact me for collaborations.",
          ]}
          typeSpeed={80}
          backSpeed={50}
          loop
        />
      </h1>
      <div className={styles.profile}>
        <Image
          src="/images/profile.png"
          alt="Profile "
          height={500}
          width={500}
          className={styles.profileImage}
        />
      </div>
    </div>
  );
}
