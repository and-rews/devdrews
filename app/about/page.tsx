"use client";
import React from "react";
import styles from "../../styles/About.module.css";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function About() {
  return (
    <>
      <Navbar />
      <div className={styles.about}>
        <div className={styles.container}>
          <div className={styles.content}>
            <h1>About Me</h1>
            <p>
              I am a passionate software engineer with 4 years of experience in
              developing high-quality, scalable solutions. My journey in the
              tech industry began with a deep interest in programming and
              problem-solving, which led me to pursue a career in software
              engineering.
            </p>
            <p>
              Throughout my career, I have worked on a wide range of projects,
              collaborating with cross-functional teams to deliver innovative
              and user-friendly applications. I thrive on tackling complex
              challenges and continuously expanding my knowledge in the
              ever-evolving tech landscape.
            </p>
            <p>
              This year, I have ventured into the fascinating world of ethical
              hacking, driven by a curiosity to understand the intricacies of
              cybersecurity and learn how to safeguard systems from potential
              threats. By exploring ethical hacking techniques, I aim to
              contribute to creating more secure and resilient software
              solutions.
            </p>
            <p>
              Outside of work, I enjoy staying updated with the latest trends
              and advancements in the tech industry. I actively participate in
              local developer communities, attending meetups and conferences to
              exchange ideas and learn from fellow professionals.
            </p>
            <Link href="/projects" className={styles.viewProjectsButton}>
              View Projects
            </Link>
          </div>
          <div className={styles.imageContainer}>
            <Image
              src="/images/about2.png"
              alt="Profile Picture"
              width={400}
              height={400}
              className={styles.profileImage}
            />
          </div>
        </div>
      </div>
    </>
  );
}
