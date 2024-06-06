"use client";

import React, { useState, useEffect, FormEvent } from "react";
import {
  doc,
  getDoc,
  updateDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import { db } from "../../../../../firebase";
import dynamic from "next/dynamic";
import styles from "../../../../../styles/CreateProject.module.css";
import { useSearchParams } from "next/navigation";
import withAuth from "@/components/withAuth";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

interface BlogData {
  id: string;
  title: string;
  content: string;
  image?: string;
  category?: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}

interface PageProps {
  params: {
    id: string;
  };
}

const EditBlog = ({ params }: PageProps) => {
  const { id } = params;

  const [blogData, setBlogData] = useState<BlogData | null>(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        try {
          const docRef = doc(db, "blogs", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const postData = docSnap.data() as BlogData;
            setBlogData({ ...postData, id: docSnap.id });
            setSelectedCategory(postData.category || "");
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching document:", error);
        }
      } else {
        console.log("No ID found in URL.");
      }
      setLoading(false);
    };

    const fetchCategories = async () => {
      const querySnapshot = await getDocs(collection(db, "categories"));
      const categoriesList: any[] = [];
      querySnapshot.forEach((doc) => {
        categoriesList.push({ id: doc.id, ...doc.data() });
      });
      setCategories(categoriesList);
    };

    fetchPost();
    fetchCategories();
  }, [id]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (id && blogData) {
      try {
        const docRef = doc(db, "blogs", id);
        await updateDoc(docRef, {
          title: blogData.title,
          content: blogData.content,
          image: blogData.image,
          category: selectedCategory,
        });
        alert("Blog updated successfully!");
      } catch (error) {
        console.error("Error updating blog: ", error);
        alert("Error updating blog. Please try again.");
      }
    } else {
      console.log("No ID found in URL.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!blogData) {
    return <div>No post found.</div>;
  }

  return (
    <>
      <div className={styles.createProject}>
        <h1 className={styles.h1}>Edit Blog</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={blogData.title}
              onChange={(e) =>
                setBlogData({ ...blogData, title: e.target.value })
              }
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
              value={blogData.image || ""}
              onChange={(e) =>
                setBlogData({ ...blogData, image: e.target.value })
              }
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="content">Content</label>
            <ReactQuill
              value={blogData.content}
              onChange={(value) => setBlogData({ ...blogData, content: value })}
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
            Update Blog
          </button>
        </form>
      </div>
    </>
  );
};

export default withAuth(EditBlog);
