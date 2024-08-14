import React from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import ProjectList from "./ProjectList";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  demoLink?: string;
  githubLink?: string;
  category: "web" | "mobile" | "security" | "other";
}

async function getProjects() {
  const querySnapshot = await getDocs(collection(db, "projects"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Project[];
}

export default async function Projects() {
  const projects = await getProjects();

  return (
    <>
      <h1
        className="text-4xl md:text-6xl font-bold mb-12 text-glow text-center"
        data-aos="fade-up"
      >
        My Projects
      </h1>
      <ProjectList initialProjects={projects} />
    </>
  );
}
