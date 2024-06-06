"use client";
import React, { useState, useEffect, FormEvent } from "react";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../../../firebase";
import styles from "../../../../styles/CreateProject.module.css";
import Link from "next/link";
import withAuth from "@/components/withAuth";

const CategoryManagement: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );

  useEffect(() => {
    const fetchCategories = async () => {
      const querySnapshot = await getDocs(collection(db, "categories"));
      const categoriesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
      }));
      setCategories(categoriesList);
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "categories"), {
        name,
      });
      alert("Category added successfully!");
      setName("");
      setCategories([...categories, { id: "", name }]);
    } catch (error) {
      console.error("Error adding category: ", error);
      alert("Error adding category. Please try again.");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteDoc(doc(db, "categories", id));
        setCategories(categories.filter((category) => category.id !== id));
        alert("Category deleted successfully!");
      } catch (error) {
        console.error("Error deleting category: ", error);
        alert("Error deleting category. Please try again.");
      }
    }
  };

  return (
    <>
      <div className={styles.createProject}>
        <h1 className={styles.h1}>Category Management</h1>
        <table className="min-w-full bg-white border mb-5">
          <thead className="text-slate-950">
            <tr>
              <th className="py-2 px-4 border">Category Name</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="py-2 px-4 border text-slate-950">
                  {category.name}
                </td>
                <td className="py-2 px-4 border space-x-2">
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2 className="mt-5 text-2xl text-center mb-3">Add New Category</h2>
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

export default withAuth(CategoryManagement);
