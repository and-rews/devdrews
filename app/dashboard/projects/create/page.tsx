"use client";

import React, { useState, FormEvent } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import styles from "../../../../styles/CreateProject.module.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import withAuth from "@/components/withAuth";

const CreateProject: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [demoLink, setDemoLink] = useState<string>("");
  const [githubLink, setGithubLink] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "projects"), {
        title,
        description,
        image,
        demoLink,
        githubLink,
      });
      alert("Project added successfully!");
      setTitle("");
      setDescription("");
      setImage("");
      setDemoLink("");
      setGithubLink("");
    } catch (error) {
      console.error("Error adding project: ", error);
      alert("Error adding project. Please try again.");
    }
  };

  return (
    <>
      <div className={styles.createProject}>
        <h1 className={styles.h1}>Add New Project</h1>
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
            Add Project
          </button>
        </form>
      </div>
    </>
  );
};

export default withAuth(CreateProject);
