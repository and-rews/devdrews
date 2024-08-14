import React from "react";
import { Metadata } from "next";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

async function getProjectTitles() {
  const querySnapshot = await getDocs(collection(db, "projects"));
  return querySnapshot.docs.map((doc) => doc.data().title);
}

export async function generateMetadata(): Promise<Metadata> {
  const projectTitles = await getProjectTitles();

  return {
    title: {
      default: "Projects | DevDrews",
      template: "%s | DevDrews Projects",
    },
    description:
      "Explore Andrew's portfolio of web, mobile, and security projects. From innovative web applications to robust security solutions.",
    keywords: [
      "DevDrews",
      "Andrew's Projects",
      "Web Development",
      "Mobile Development",
      "Security Projects",
      ...projectTitles,
    ],
    openGraph: {
      title: "Projects | DevDrews",
      description:
        "Explore Andrew's portfolio of web, mobile, and security projects. From innovative web applications to robust security solutions.",
      images: [
        {
          url: "/images/projects-og.jpg",
          width: 1200,
          height: 630,
          alt: "DevDrews Projects",
        },
      ],
      type: "website",
      locale: "en_US",
      url: "https://devdrews.com/projects",
      siteName: "DevDrews Projects",
    },
    twitter: {
      card: "summary_large_image",
      title: "Projects | DevDrews",
      description:
        "Explore Andrew's portfolio of web, mobile, and security projects. From innovative web applications to robust security solutions.",
      images: ["/images/projects-og.jpg"],
      creator: "@devdrews",
    },
  };
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <main className="container mx-auto px-4 py-16 md:px-8">{children}</main>
    </div>
  );
}
