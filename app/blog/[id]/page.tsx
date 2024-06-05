"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "../../../styles/Post.module.css";
import Image from "next/image";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  image?: string;
  author?: string;
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

const BlogPostPage = ({ params }: PageProps) => {
  const searchParams = useSearchParams();
  const { id } = params;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        try {
          const docRef = doc(db, "blogs", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setPost({ id: docSnap.id, ...docSnap.data() } as BlogPost);
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
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="text-white flex items-center justify-center mt-5">
        Loading...
      </div>
    );
  }

  if (!post) {
    return <div>No post found.</div>;
  }

  return (
    <>
      <Navbar />
      <div className={styles.blogPost}>
        <div className={styles.imageContainer}>
          <Image
            src={post.image || "/images/default.jpg"}
            alt={post.title}
            width={800}
            height={600}
            className={styles.postImage}
          />
        </div>
        <h1 className={styles.title}>{post.title}</h1>

        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <div className={styles.postMeta}>
          <span>{post.author || "Unknown Author"}</span>
          <span>
            {new Date(post.createdAt.seconds * 1000).toLocaleDateString(
              "en-US",
              { year: "numeric", month: "long", day: "numeric" }
            )}
          </span>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogPostPage;
