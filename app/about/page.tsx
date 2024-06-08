"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import styles from "../../styles/About.module.css";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function About() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
    });
  }, []);

  return (
    <span className={styles.aboutContainer}>
      <Navbar />
      <div className={styles.about}>
        <div className={styles.container}>
          <div className={styles.content}>
            <h1 data-aos="fade-right">About Me</h1>
            <p data-aos="fade-right" data-aos-delay="100">
              I am a passionate software engineer with 4 years of experience in
              developing high-quality, scalable solutions. My journey in the
              tech industry began with a deep interest in programming and
              problem-solving, which led me to pursue a career in software
              engineering.
            </p>
            <p data-aos="fade-right" data-aos-delay="200">
              Throughout my career, I have worked on a wide range of projects,
              collaborating with cross-functional teams to deliver innovative
              and user-friendly applications. I thrive on tackling complex
              challenges and continuously expanding my knowledge in the
              ever-evolving tech landscape.
            </p>
            <p data-aos="fade-right" data-aos-delay="300">
              This year, I have ventured into the fascinating world of ethical
              hacking, driven by a curiosity to understand the intricacies of
              cybersecurity and learn how to safeguard systems from potential
              threats. By exploring ethical hacking techniques, I aim to
              contribute to creating more secure and resilient software
              solutions.
            </p>
            <p data-aos="fade-right" data-aos-delay="400">
              Outside of work, I enjoy staying updated with the latest trends
              and advancements in the tech industry. I actively participate in
              local developer communities, attending meetups and conferences to
              exchange ideas and learn from fellow professionals.
            </p>
            <Link
              href="/projects"
              className={styles.viewProjectsButton}
              data-aos="fade-up"
              data-aos-delay="500"
            >
              View Projects
            </Link>
          </div>
          <div
            className={styles.imageContainer}
            data-aos="zoom-in"
            data-aos-delay="600"
          >
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
      <Footer />
    </span>
  );
}
