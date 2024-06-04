"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import Navbarr from "@/components/Navbarr";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

const ProjectsList: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(collection(db, "projects"));
      const projectsData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProjects(projectsData);
    };

    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "projects", id));
      setProjects(projects.filter((project) => project.id !== id));
      alert("Project deleted successfully!");
    } catch (error) {
      console.error("Error deleting project: ", error);
      alert("Error deleting project. Please try again.");
    }
  };

  return (
    <>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold mb-4 text-white">Projects</h1>
          <Link
            href="/dashboard/projects/create"
            className="py-2 px-3 bg-green-600 text-white rounded-md"
          >
            Add Project
          </Link>
        </div>
        <table className="min-w-full bg-slate-500 text-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Image</th>
              <th className="py-2 px-4 border-b">Demo Link</th>
              <th className="py-2 px-4 border-b">GitHub Link</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td className="py-2 px-4 border-b">{project.title}</td>
                <td className="py-2 px-4 border-b">{project.description}</td>
                <td className="py-2 px-4 border-b">
                  <Image
                    src={project.image}
                    alt={project.title}
                    className="h-16 w-16 object-cover"
                    height={400}
                    width={400}
                  />
                </td>
                <td className="py-2 px-4 border-b">
                  <Link
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Demo
                  </Link>
                </td>
                <td className="py-2 px-4 border-b">
                  <Link
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </Link>
                </td>
                <td className="py-2 px-4 border-b">
                  <Link href={`/dashboard/projects/edit/${project.id}`}>
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="text-red-500 hover:underline ml-4"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProjectsList;
