"use client";
import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, query, orderBy } from "firebase/firestore";

import { db } from "../../firebase";
import AOS from "aos";
import "aos/dist/aos.css";
import styles from "../../styles/Blog.module.css";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  category: string;
  image?: string;
  author?: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
    });
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(
        query(collection(db, "blogs"), orderBy("createdAt", "desc"))
      );
      const postsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as BlogPost[];
      setPosts(postsList);
    };

    fetchPosts();
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.blog}>
        <h1 data-aos="fade-up">Blog Posts</h1>
        <div className={styles.postGrid}>
          {posts.map((post, index) => (
            <div
              key={post.id}
              className={styles.post}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className={styles.imageContainer}>
                <Image
                  src={post.image || "/images/default.jpg"}
                  alt={post.title}
                  width={400}
                  height={300}
                  className={styles.postImage}
                />
              </div>
              <h3>{post.title}</h3>
              <div
                className={styles.postContent}
                dangerouslySetInnerHTML={{
                  __html:
                    post.content.length > 100
                      ? `${post.content.slice(0, 20)}...`
                      : post.content,
                }}
              />
              <div className={styles.postMeta}>
                <span>{post.category}</span>
                <span>
                  {new Date(post.createdAt.seconds * 1000).toLocaleDateString(
                    "en-US",
                    { year: "numeric", month: "long", day: "numeric" }
                  )}
                </span>
              </div>
              <Link href={`/blog/${post.id}`} className={styles.readMore}>
                Read More
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Blog;
