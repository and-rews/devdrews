"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import styles from "../../styles/Projects.module.css";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Footer from "@/components/Footer";
const projects = [
  {
    id: 3,
    title: "Cybersecurity Tool",
    description:
      "A command-line tool written in Python to help security professionals perform various ethical hacking tasks.",
    image: "/images/project3.jpg",
    githubLink: "https://github.com/your-username/cybersecurity-tool",
  },
  {
    id: 1,
    title: "Hotel Website",
    description:
      "Responsive website for Lovek Condos, optimizing it for seamless viewing across all devices.",
    image: "/images/lovekcondos.png",
    demoLink: "https://lovekcondos.com",
  },
  {
    id: 2,
    title: "Online Phones Shop",
    description:
      "A convenient online phone shop that allows you to browse and purchase the latest devices from the comfort of your home.",
    image: "/images/superlovek.png",
    demoLink: "https://www.superlovekphones.com",
  },
  {
    id: 4,
    title: "Feedback System",
    description:
      "A robust feedback system with Nextjs and Firebase, enabling users to provide valuable insights and suggestions.",
    image: "/images/feedback.png",
    demoLink: "https://www.feedback-condos.vercel.app",
    githubLink: "https://github.com/and-rews/feedback_condos.git",
  },
];
export default function Projects() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
    });
  }, []);
  return (
    <>
      <Navbar />
      <div className={styles.projects}>
        <h1 data-aos="fade-up">My Projects</h1>
        <div className={styles.projectsGrid}>
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={styles.project}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className={styles.imageContainer}>
                <Image
                  src={project.image}
                  alt={project.title}
                  width={400}
                  height={300}
                  className={styles.projectImage}
                />
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className={styles.links}>
                {project.demoLink && (
                  <Link
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    Live Demo
                  </Link>
                )}
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
