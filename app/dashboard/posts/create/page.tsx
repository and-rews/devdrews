"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase";
import dynamic from "next/dynamic";
import styles from "../../../../styles/CreateProject.module.css";
import withAuth from "@/components/withAuth";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const AddBlog: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    const fetchCategories = async () => {
      const querySnapshot = await getDocs(collection(db, "categories"));
      const categoriesList: any[] = [];
      querySnapshot.forEach((doc) => {
        categoriesList.push({ id: doc.id, ...doc.data() });
      });
      setCategories(categoriesList);
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "blogs"), {
        title,
        content,
        image,
        category: selectedCategory,
        createdAt: new Date(),
      });
      alert("Blog added successfully!");
      setTitle("");
      setContent("");
      setImage("");
      setSelectedCategory("");
    } catch (error) {
      console.error("Error adding blog: ", error);
      alert("Error adding blog. Please try again.");
    }
  };

  return (
    <>
      <div className={styles.createProject}>
        <h1 className={styles.h1}>Add New Blog</h1>
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
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Category
              </option>
              {categories.map((category) => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
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
            <label htmlFor="content">Content</label>
            <ReactQuill
              value={content}
              onChange={setContent}
              modules={{
                toolbar: [
                  [{ header: "1" }, { header: "2" }, { font: [] }],
                  [{ size: [] }],
                  ["bold", "italic", "underline", "strike", "blockquote"],
                  [
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" },
                  ],
                  ["link", "image", "video"],
                  ["clean"],
                ],
              }}
              formats={[
                "header",
                "font",
                "size",
                "bold",
                "italic",
                "underline",
                "strike",
                "blockquote",
                "list",
                "bullet",
                "indent",
                "link",
                "image",
                "video",
              ]}
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Add Blog
          </button>
        </form>
      </div>
    </>
  );
};

export default withAuth(AddBlog);
