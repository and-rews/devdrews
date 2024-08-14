"use client";

import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import Image from "next/image";
import { Calendar, Tag } from "lucide-react";
import AOS from "aos";
import { Metadata } from "next";
import "aos/dist/aos.css";

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

interface PageProps {
  params: { id: string };
}

const BlogPostPage = ({ params }: PageProps) => {
  const { id } = params;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000 });
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
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center text-2xl mt-8 text-foreground">
        No post found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h1
          className="text-4xl md:text-6xl font-bold mb-8 text-green-500 text-center"
          data-aos="fade-up"
        >
          {post.title}
        </h1>

        <div
          className="bg-card bg-opacity-80 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <Image
            src={post.image || "/images/default.jpg"}
            alt={`Cover image for blog post titled ${post.title}`}
            width={600}
            height={400}
            className="w-full h-auto object-cover transition-transform duration-300 hover:scale-110"
          />

          <div className="p-8">
            <div className="flex flex-wrap justify-between items-center text-sm mb-6">
              <span className="flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full mb-2 sm:mb-0">
                <Tag className="w-4 h-4 mr-2" />
                {post.category}
              </span>
              <span className="flex items-center text-green-500">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(post.createdAt.seconds * 1000).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </span>
            </div>

            <div
              className="prose prose-lg max-w-none text-foreground"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
