"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import Link from "next/link";
import Masonry from "react-masonry-css";
import {
  Calendar,
  Tag,
  Book,
  Code,
  Globe,
  Lightbulb,
  Briefcase,
  HeartPulse,
  Camera,
  Music,
} from "lucide-react";

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

const categories = [
  { name: "All", icon: null },
  { name: "Technology", icon: <Code className="w-4 h-4 md:w-5 md:h-5" /> },
  { name: "Travel", icon: <Globe className="w-4 h-4 md:w-5 md:h-5" /> },
  { name: "Lifestyle", icon: <HeartPulse className="w-4 h-4 md:w-5 md:h-5" /> },
  { name: "Business", icon: <Briefcase className="w-4 h-4 md:w-5 md:h-5" /> },
  { name: "Science", icon: <Lightbulb className="w-4 h-4 md:w-5 md:h-5" /> },
  { name: "Culture", icon: <Book className="w-4 h-4 md:w-5 md:h-5" /> },
  { name: "Photography", icon: <Camera className="w-4 h-4 md:w-5 md:h-5" /> },
  { name: "Music", icon: <Music className="w-4 h-4 md:w-5 md:h-5" /> },
];

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string | null>(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(
          query(collection(db, "blogs"), orderBy("createdAt", "desc"))
        );
        const postsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as BlogPost[];
        setPosts(postsList);
      } catch (error) {
        console.error("Error fetching blog posts: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };

  const filteredPosts = filter
    ? posts.filter((post) => post.category.toLowerCase() === filter)
    : posts;

  const isActive = (category: string | null): boolean => {
    return category === filter;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h1
          className="text-4xl md:text-6xl font-bold mb-12 text-primary text-center"
          data-aos="fade-up"
        >
          Blog Posts
        </h1>

        <div
          className="flex flex-wrap justify-center gap-3 mb-12"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() =>
                setFilter(
                  category.name === "All" ? null : category.name.toLowerCase()
                )
              }
              className={`nav-link group relative flex items-center px-4 py-2 rounded-full transition-all text-sm ${
                isActive(
                  category.name === "All" ? null : category.name.toLowerCase()
                )
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "bg-card text-foreground hover:bg-primary/20"
              }`}
            >
              {category.icon && <span className="mr-2">{category.icon}</span>}
              {category.name}
              {isActive(
                category.name === "All" ? null : category.name.toLowerCase()
              ) && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-foreground shadow-glow"></span>
              )}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex w-auto -ml-4"
            columnClassName="pl-4 bg-clip-padding"
          >
            {filteredPosts.map((post, index) => (
              <div
                key={post.id}
                className="mb-4 break-inside-avoid"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="bg-card bg-opacity-80 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
                  <div className="relative">
                    <Image
                      src={post.image || "/images/default.jpg"}
                      alt={post.title}
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                      <h3 className="text-xl font-bold text-white">
                        {post.title}
                      </h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <div
                      className="text-sm text-muted-foreground mb-4 line-clamp-3"
                      dangerouslySetInnerHTML={{
                        __html: post.content,
                      }}
                    />
                    <div className="flex flex-wrap justify-between items-center text-xs text-muted-foreground mb-4">
                      <span className="flex items-center bg-primary/10 text-primary px-2 py-1 rounded-full mb-2 sm:mb-0">
                        <Tag className="w-4 h-4 mr-1" />
                        {post.category}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(
                          post.createdAt.seconds * 1000
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <Link
                      href={`/blog/${post.id}`}
                      className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/80 transition-colors"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Masonry>
        )}

        {!loading && filteredPosts.length === 0 && (
          <p className="text-center text-muted-foreground mt-8">
            No blog posts found for the selected category.
          </p>
        )}
      </div>
    </div>
  );
};

export default Blog;
