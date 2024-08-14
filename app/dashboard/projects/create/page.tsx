"use client";
import React, { useState, FormEvent } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import withAuth from "@/components/withAuth";

const categories = ["Web", "Mobile", "Security", "Other"];

const CreateProject: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [demoLink, setDemoLink] = useState<string>("");
  const [githubLink, setGithubLink] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "projects"), {
        title,
        description,
        image,
        demoLink,
        githubLink,
        category,
      });
      alert("Project added successfully!");
      setTitle("");
      setDescription("");
      setImage("");
      setDemoLink("");
      setGithubLink("");
      setCategory("");
    } catch (error) {
      console.error("Error adding project: ", error);
      alert("Error adding project. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Add New Project</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block mb-2 font-semibold">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-2 font-semibold">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
            rows={4}
          ></textarea>
        </div>
        <div>
          <label htmlFor="image" className="block mb-2 font-semibold">
            Image URL
          </label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="demoLink" className="block mb-2 font-semibold">
            Demo Link
          </label>
          <input
            type="text"
            id="demoLink"
            value={demoLink}
            onChange={(e) => setDemoLink(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="githubLink" className="block mb-2 font-semibold">
            GitHub Link
          </label>
          <input
            type="text"
            id="githubLink"
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="category" className="block mb-2 font-semibold">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Add Project
        </button>
      </form>
    </div>
  );
};

export default withAuth(CreateProject);
