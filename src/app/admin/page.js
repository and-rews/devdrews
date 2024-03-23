"use client";

import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { db, storage } from "../firebaseConfig";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AdminPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [postId, setPostId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        // Update existing post
        const postRef = doc(db, "posts", postId);
        await updateDoc(postRef, { title, content });
        alert("Post updated successfully!");
      } else {
        // Add new post
        const postsCollectionRef = collection(db, "posts");
        await addDoc(postsCollectionRef, { title, content });
        alert("Post added successfully!");
      }

      // Clear form fields
      setTitle("");
      setContent("");
      setIsEditing(false);
      setPostId(null);
    } catch (error) {
      console.error("Error submitting post:", error);
      alert("Error submitting post. Please try again.");
    }
  };

  const handleEditPost = (postData) => {
    setTitle(postData.title);
    setContent(postData.content);
    setIsEditing(true);
    setPostId(postData.id);
  };

  // Handle image upload to Firebase Storage
  const handleImageUpload = async (file) => {
    // Here, you can implement the logic to upload the image to Firebase Storage
    // and get the download URL of the uploaded image
    // Then, you can insert the image URL into the Quill editor
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Content:
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
                ["link", "image"],
                ["clean"],
              ],
              clipboard: {
                matchVisual: false,
              },
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
            ]}
          />
        </label>
        <br />
        <button type="submit">{isEditing ? "Update Post" : "Add Post"}</button>
      </form>

      {/* Add a section to display existing posts and provide edit functionality */}
      {/* You'll need to fetch the list of posts and render them here */}
      {/* You can use the handleEditPost function to populate the form fields */}
    </div>
  );
};

export default AdminPage;
