"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Masonry from "react-masonry-css";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Github,
  ExternalLink,
  Code,
  Server,
  Shield,
  Smartphone,
  Tag,
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  demoLink?: string;
  githubLink?: string;
  category: string;
}

const categories = [
  { name: "All", icon: null },
  { name: "Web", icon: <Code className="w-4 h-4 md:w-5 md:h-5" /> },
  { name: "Mobile", icon: <Smartphone className="w-4 h-4 md:w-5 md:h-5" /> },
  { name: "Security", icon: <Shield className="w-4 h-4 md:w-5 md:h-5" /> },
  { name: "Other", icon: <Server className="w-4 h-4 md:w-5 md:h-5" /> },
];

interface ProjectListProps {
  initialProjects: Project[];
  categories: { name: string; icon: string }[];
}

export default function ProjectList({ initialProjects }: ProjectListProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  useEffect(() => {
    AOS.init({ duration: 1000 });
    setProjects(initialProjects);
    setLoading(false);
    console.log("Initial projects:", initialProjects);
  }, [initialProjects]);

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  console.log("Active category:", activeCategory);
  console.log("Filtered projects:", filteredProjects);

  return (
    <>
      <div
        className="flex flex-wrap justify-center gap-3 mb-12"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => setActiveCategory(category.name)}
            className={`nav-link group relative flex items-center px-4 py-2 rounded-full transition-all text-sm ${
              activeCategory === category.name
                ? "bg-primary text-primary-foreground font-semibold"
                : "bg-card text-foreground hover:bg-primary/20"
            }`}
          >
            {category.icon && <span className="mr-2">{category.icon}</span>}
            {category.name}
            {activeCategory === category.name && (
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
          className="flex w-auto -ml-4"
          columnClassName="pl-4 bg-clip-padding"
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
                    alt={`Screenshot of ${project.title}`}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                    <h2 className="text-xl font-bold text-white">
                      {project.title}
                    </h2>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap justify-between items-center text-xs text-muted-foreground mb-4">
                    <span className="flex items-center bg-primary/10 text-primary px-2 py-1 rounded-full mb-2 sm:mb-0">
                      <Tag className="w-4 h-4 mr-1" />
                      {project.category}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    {project.demoLink && (
                      <Link
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm hover:bg-primary/80 transition-colors"
                      >
                        <ExternalLink
                          className="w-4 h-4 mr-1"
                          aria-hidden="true"
                        />
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
                        <Github className="w-4 h-4 mr-1" aria-hidden="true" />
                        GitHub
                      </Link>
                    )}
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
    </>
  );
}
