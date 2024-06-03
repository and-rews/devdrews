"use client";
import React from "react";
import styles from "../../styles/Projects.module.css";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "Project Management App",
    description:
      "A web application built with React and Node.js to help teams collaborate and manage their projects efficiently.",
    image: "/images/project1.jpg",
    demoLink: "https://project-management-app.com",
    githubLink: "https://github.com/your-username/project-management-app",
  },
  {
    id: 2,
    title: "E-commerce Platform",
    description:
      "A fully-featured e-commerce platform built with Next.js and Stripe for secure online payments.",
    image: "/images/project2.jpg",
    demoLink: "https://e-commerce-platform.com",
    githubLink: "https://github.com/your-username/e-commerce-platform",
  },
  {
    id: 3,
    title: "Cybersecurity Tool",
    description:
      "A command-line tool written in Python to help security professionals perform various ethical hacking tasks.",
    image: "/images/project3.jpg",
    githubLink: "https://github.com/your-username/cybersecurity-tool",
  },
];

export default function Projects() {
  return (
    <div className={styles.projects}>
      <h1>My Projects</h1>
      <div className={styles.projectsGrid}>
        {projects.map((project) => (
          <div key={project.id} className={styles.project}>
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
                <a
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  Live Demo
                </a>
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
  );
}
