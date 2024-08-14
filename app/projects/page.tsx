"use client";

import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import Link from "next/link";
import {
  Github,
  ExternalLink,
  Code,
  Server,
  Shield,
  Smartphone,
} from "lucide-react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import Masonry from "react-masonry-css";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  demoLink?: string;
  githubLink?: string;
  category: "web" | "mobile" | "security" | "other";
}

const categories = [
  { name: "All", icon: null },
  { name: "Web", icon: <Code className="w-4 h-4 md:w-5 md:h-5" /> },
  { name: "Mobile", icon: <Smartphone className="w-4 h-4 md:w-5 md:h-5" /> },
  { name: "Security", icon: <Shield className="w-4 h-4 md:w-5 md:h-5" /> },
  { name: "Other", icon: <Server className="w-4 h-4 md:w-5 md:h-5" /> },
];

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        const projectsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Project[];
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching projects: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
    AOS.init({ duration: 1000 });
  }, []);

  const filteredProjects = filter
    ? projects.filter((project) => project.category === filter)
    : projects;

  const isActive = (category: string | null): boolean => {
    return category === filter;
  };

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <div className="md:container min-h-screen bg-gradient-to-br from-background via-background to-muted py-16 px-4 md:px-8">
      <div className="md:container max-w-7xl mx-auto">
        <h1
          className="text-4xl md:text-6xl font-bold mb-12 text-primary text-center"
          data-aos="fade-up"
        >
          My Projects
        </h1>

        <div
          className="flex flex-wrap justify-center gap-3 mb-12"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() =>
                setFilter(
                  category.name === "All" ? null : category.name.toLowerCase()
                )
              }
              className={`nav-link group relative flex items-center px-4 py-2 rounded-full transition-all text-sm ${
                isActive(
                  category.name === "All" ? null : category.name.toLowerCase()
                )
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "bg-card text-foreground hover:bg-primary/20"
              }`}
            >
              {category.icon && <span className="mr-2">{category.icon}</span>}
              {category.name}
              {isActive(
                category.name === "All" ? null : category.name.toLowerCase()
              ) && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-foreground shadow-glow"></span>
              )}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex w-auto -ml-8"
            columnClassName="pl-8 bg-clip-padding"
          >
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="mb-4 break-inside-avoid"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="bg-card bg-opacity-80 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
                  <div className="relative">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                      <h3 className="text-xl font-bold text-white">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-muted-foreground mb-4">
                      {project.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        {project.demoLink && (
                          <Link
                            href={project.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm hover:bg-primary/80 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4 mr-1" />
                            Demo
                          </Link>
                        )}
                        {project.githubLink && (
                          <Link
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center bg-card text-foreground px-3 py-1 rounded-full text-sm hover:bg-muted transition-colors"
                          >
                            <Github className="w-4 h-4 mr-1" />
                            GitHub
                          </Link>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                        {project.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Masonry>
        )}

        {!loading && filteredProjects.length === 0 && (
          <p className="text-center text-muted-foreground mt-8">
            No projects found for the selected category.
          </p>
        )}
      </div>
    </div>
  );
}
