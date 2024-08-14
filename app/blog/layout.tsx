import React from "react";
import { Metadata } from "next";
import { db } from "../../firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

async function getBlogTitles() {
  const querySnapshot = await getDocs(
    query(collection(db, "blogs"), orderBy("createdAt", "desc"), limit(10))
  );
  return querySnapshot.docs.map((doc) => doc.data().title);
}

export async function generateMetadata(): Promise<Metadata> {
  const blogTitles = await getBlogTitles();

  return {
    title: {
      default:
        "Blog | DevDrews - Insights on Ethical Hacking & Software Engineering",
      template: "%s | DevDrews Blog",
    },
    description:
      "Read Andrews' latest thoughts on cybersecurity, software development, and the intersection of technology and ethics. Stay updated with cutting-edge insights and tutorials.",
    keywords: [
      "Andrews",
      "DevDrews Blog",
      "Andrews Osei",
      "Andrews Osei-Agyemang",
      "Andrews Osei Agyemang",
      "DevDrews",
      "Ethical Hacking",
      "Software Engineering",
      "Cybersecurity",
      "Tech Ethics",
      "Software Development",
      ...blogTitles,
    ],
    openGraph: {
      title:
        "Blog | DevDrews - Insights on Ethical Hacking & Software Engineering",
      description:
        "Read Andrews' latest thoughts on cybersecurity, software development, and the intersection of technology and ethics. Stay updated with cutting-edge insights and tutorials.",
      images: [
        {
          url: "/images/blog-og.jpg",
          width: 1200,
          height: 630,
          alt: "DevDrews Blog",
        },
      ],
      type: "website",
      locale: "en_US",
      url: "https://devdrews.com/blog",
      siteName: "DevDrews Blog",
    },
    twitter: {
      card: "summary_large_image",
      title:
        "Blog | DevDrews - Insights on Ethical Hacking & Software Engineering",
      description:
        "Read Andrews' latest thoughts on cybersecurity, software development, and the intersection of technology and ethics. Stay updated with cutting-edge insights and tutorials.",
      images: ["/images/blog-og.jpg"],
      creator: "@devdrews",
    },
  };
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
