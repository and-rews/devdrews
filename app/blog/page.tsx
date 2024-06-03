"use client";
import React from "react";
import styles from "../../styles/Blog.module.css";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const posts = [
  {
    id: 1,
    title: "Introduction to Ethical Hacking",
    description:
      "Learn about the basics of ethical hacking, its importance, and the different types of hacking techniques.",
    image: "/images/blog1.jpg",
    author: "John Doe",
    date: "May 1, 2023",
    slug: "introduction-to-ethical-hacking",
  },
  {
    id: 2,
    title: "Building a Secure Web Application",
    description:
      "Discover best practices for building secure web applications and learn how to protect against common vulnerabilities.",
    image: "/images/blog2.jpg",
    author: "John Doe",
    date: "April 15, 2023",
    slug: "building-a-secure-web-application",
  },
  {
    id: 3,
    title: "The Future of Cybersecurity",
    description:
      "Explore the latest trends and advancements in the cybersecurity landscape, and how they will shape the future of digital security.",
    image: "/images/blog3.jpg",
    author: "John Doe",
    date: "March 30, 2023",
    slug: "the-future-of-cybersecurity",
  },
  {
    id: 4,
    title: "The Future of Cybersecurity",
    description:
      "Explore the latest trends and advancements in the cybersecurity landscape, and how they will shape the future of digital security.",
    image: "/images/blog3.jpg",
    author: "John Doe",
    date: "March 30, 2023",
    slug: "the-future-of-cybersecurity",
  },
];

export default function Blog() {
  return (
    <>
      <Navbar />
      <div className={styles.blog}>
        <h1>Blog Posts</h1>
        <div className={styles.postGrid}>
          {posts.map((post) => (
            <div key={post.id} className={styles.post}>
              <div className={styles.imageContainer}>
                <Image
                  src={post.image}
                  alt={post.title}
                  width={400}
                  height={300}
                  className={styles.postImage}
                />
              </div>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <div className={styles.postMeta}>
                <span>{post.author}</span>
                <span>{post.date}</span>
              </div>
              <Link href={`/blog/${post.slug}`} className={styles.readMore}>
                Read More
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
