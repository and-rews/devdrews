"use client";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import styles from "../../styles/Projects.module.css";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Footer from "@/components/Footer";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  demoLink?: string;
  githubLink?: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        const projectsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Project[];
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching projects: ", error);
      }
    };

    fetchProjects();
    AOS.init({
      duration: 1000,
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
