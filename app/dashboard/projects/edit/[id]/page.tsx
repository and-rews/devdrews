"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../firebase";
import styles from "../../../../../styles/CreateProject.module.css";

const EditProject: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [demoLink, setDemoLink] = useState<string>("");
  const [githubLink, setGithubLink] = useState<string>("");

  useEffect(() => {
    const fetchProject = async () => {
      if (id) {
        const docRef = doc(db, "projects", id as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const project = docSnap.data();
          setTitle(project.title);
          setDescription(project.description);
          setImage(project.image);
          setDemoLink(project.demoLink);
          setGithubLink(project.githubLink);
        } else {
          alert("No such project!");
          router.push("/dashboard/projects"); // Redirect to projects list if project not found
        }
      }
    };

    fetchProject();
  }, [id]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (id) {
        const docRef = doc(db, "projects", id as string);
        await updateDoc(docRef, {
          title,
          description,
          image,
          demoLink,
          githubLink,
        });
        alert("Project updated successfully!");
        router.push("/dashboard/projects"); // Redirect to projects list after successful update
      }
    } catch (error) {
      console.error("Error updating project: ", error);
      alert("Error updating project. Please try again.");
    }
  };

  return (
    <>
      <div className={styles.createProject}>
        <h1 className={styles.h1}>Edit Project</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="image">Image URL</label>
            <input
              type="text"
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="demoLink">Demo Link</label>
            <input
              type="text"
              id="demoLink"
              value={demoLink}
              onChange={(e) => setDemoLink(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="githubLink">GitHub Link</label>
            <input
              type="text"
              id="githubLink"
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)}
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Update Project
          </button>
        </form>
      </div>
    </>
  );
};

export default EditProject;
