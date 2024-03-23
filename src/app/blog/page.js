"use client";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import Link from "next/link";
import { useEffect, useState } from "react";
import TransitionEffect from "../../../components/TransitionEffect";
import Navbar from "../../../components/Navbar";

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsCollectionRef = collection(db, "posts");
        const postsSnapshot = await getDocs(postsCollectionRef);
        const postsList = postsSnapshot.docs.map((doc) => ({
          id: doc.id, // Use the actual document ID
          ...doc.data(),
        }));
        setPosts(postsList);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <TransitionEffect>
        <main className="logo-flex min-h-screen flex p-24 flex-col items-center justify-between">
          <Navbar />
          <div>Loading...</div>
        </main>
      </TransitionEffect>
    );
  }

  return (
    <TransitionEffect>
      <div
        main
        className="logo-flex min-h-screen flex p-24 flex-col items-center justify-between"
      >
        <Navbar />
        <h1>Blog Posts</h1>
        <div>
          <ul className="blog">
            {posts.map((post) => (
              <li key={post.id} className="posts">
                <Link href={`/blog/${post.id}`}>{post.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </TransitionEffect>
  );
};

export default BlogList;
