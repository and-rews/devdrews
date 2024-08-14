import React from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import Image from "next/image";
import { Calendar, Tag } from "lucide-react";
import { Metadata } from "next";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  category: string;
  image?: string;
  author?: string;
  description?: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const post = await getPostData(params.id);

  if (!post) {
    return {
      title: "Post Not Found | DevDrews Blog",
      description: "The requested blog post could not be found.",
    };
  }

  const postDescription = post.description || post.content.substring(0, 160);
  const postImage = post.image || "/images/blog-og.jpg";

  return {
    title: post.title,
    description: postDescription,
    openGraph: {
      title: post.title,
      description: postDescription,
      type: "article",
      publishedTime: new Date(post.createdAt.seconds * 1000).toISOString(),
      authors: [post.author || "Andrew"],
      tags: [post.category],
      images: [
        {
          url: postImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: postDescription,
      images: [postImage],
      creator: "@devdrews",
    },
  };
}

async function getPostData(id: string): Promise<BlogPost | null> {
  try {
    const docRef = doc(db, "blogs", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as BlogPost;
    }
  } catch (error) {
    console.error("Error fetching document:", error);
  }
  return null;
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = await getPostData(params.id);

  if (!post) {
    return (
      <div className="text-center text-2xl mt-8 text-foreground">
        No post found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-6xl font-bold mb-8 text-primary text-center">
        {post.title}
      </h1>
      <div className="bg-card bg-opacity-80 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg">
        <Image
          src={post.image || "/images/blog-og.jpg"}
          alt={`Cover image for blog post: ${post.title}`}
          width={1200}
          height={630}
          className="w-full h-auto object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="p-8">
          <div className="flex flex-wrap justify-between items-center text-sm mb-6">
            <span className="flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full mb-2 sm:mb-0">
              <Tag className="w-4 h-4 mr-2" />
              {post.category}
            </span>
            <span className="flex items-center text-muted-foreground">
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
          {post.description && (
            <p className="text-lg text-muted-foreground mb-6">
              {post.description}
            </p>
          )}
          <div
            className="prose prose-lg max-w-none text-foreground"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>
    </div>
  );
}
