"use client";

import React, { useState } from "react";
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
  {
    name: "Web",
    icon: <Code className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />,
  },
  {
    name: "Mobile",
    icon: <Smartphone className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />,
  },
  {
    name: "Security",
    icon: <Shield className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />,
  },
  {
    name: "Other",
    icon: <Server className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />,
  },
];

interface ProjectListProps {
  initialProjects: Project[];
}

export default function ProjectList({ initialProjects }: ProjectListProps) {
  const [projects, setProjects] = useState(initialProjects);
  const [filter, setFilter] = useState<string | null>(null);

  const filteredProjects = filter
    ? projects.filter((project) => project.category === filter)
    : projects;

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <>
      <nav aria-label="Project categories" className="mb-12">
        <ul className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <li key={category.name}>
              <button
                onClick={() =>
                  setFilter(
                    category.name === "All" ? null : category.name.toLowerCase()
                  )
                }
                className={`nav-link group relative flex items-center px-4 py-2 rounded-full transition-all text-sm ${
                  filter ===
                  (category.name === "All" ? null : category.name.toLowerCase())
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "bg-card text-foreground hover:bg-primary/20"
                }`}
                aria-label={`Filter by ${category.name} projects`}
              >
                {category.icon && (
                  <span className="mr-2" aria-hidden="true">
                    {category.icon}
                  </span>
                )}
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex w-auto -ml-8"
        columnClassName="pl-8 bg-clip-padding"
      >
        {filteredProjects.map((project) => (
          <article key={project.id} className="mb-4 break-inside-avoid">
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
                        aria-label={`View demo of ${project.title}`}
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
                        aria-label={`View GitHub repository of ${project.title}`}
                      >
                        <Github className="w-4 h-4 mr-1" aria-hidden="true" />
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
          </article>
        ))}
      </Masonry>
    </>
  );
}
