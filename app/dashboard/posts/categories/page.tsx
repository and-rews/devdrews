"use client";

import React, { useState, FormEvent } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import styles from "../../../../styles/CreateProject.module.css";

const AddCategory: React.FC = () => {
  const [name, setName] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "categories"), {
        name,
      });
      alert("Category added successfully!");
      setName("");
    } catch (error) {
      console.error("Error adding category: ", error);
      alert("Error adding category. Please try again.");
    }
  };

  return (
    <>
      <div className={styles.createProject}>
        <h1 className={styles.h1}>Add New Category</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Category Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Add Category
          </button>
        </form>
      </div>
    </>
  );
};

export default AddCategory;
