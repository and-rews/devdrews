"use client";
import React, { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import withAuth from "@/components/withAuth";

interface BlogPost {
  id: string;
  title: string;
  category: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}

const BlogManagement = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "blogs"));
      const postsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as BlogPost[];
      setPosts(postsList);
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      await deleteDoc(doc(db, "blogs", id));
      setPosts(posts.filter((post) => post.id !== id));
    }
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl text-white font-bold">Blog Management</h1>
          <Link href="/dashboard/blogs/add">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Add Post
            </button>
          </Link>
        </div>
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Title</th>
              <th className="py-2 px-4 border">Category</th>
              <th className="py-2 px-4 border">Date</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="py-2 px-4 border">{post.title}</td>
                <td className="py-2 px-4 border">{post.category}</td>
                <td className="py-2 px-4 border">
                  {new Date(post.createdAt.seconds * 1000).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border space-x-2">
                  <Link href={`/blog/${post.id}`}>
                    <button className="bg-green-500 text-white px-2 py-1 rounded">
                      View
                    </button>
                  </Link>
                  <Link href={`/dashboard/posts/edit/${post.id}`}>
                    <button className="bg-yellow-500 text-white px-2 py-1 rounded">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
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

export default withAuth(BlogManagement);
