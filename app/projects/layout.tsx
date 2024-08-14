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
      "Explore Andrews' portfolio of web, mobile, and security projects. From innovative web applications to robust security solutions, discover the work of an ethical hacker and software engineer from Ghana.",
    keywords: [
      "DevDrews",
      "Andrews' Projects",
      "Andrews Osei",
      "Andrews Osei-Agyemang",
      "Andrews Osei Agyemang",
      "Web Development",
      "Mobile Development",
      "Security Projects",
      "Ethical Hacking",
      "Software Engineering",
      "Cybersecurity",
      "Full Stack Development",
      "Frontend Development",
      "Backend Development",
      "RESTful API",
      "Database Design",
      "UI/UX Design",
      "Responsive Web Design",
      "Progressive Web Apps",
      "Mobile App Development",
      "Android Development",
      "iOS Development",
      "Cross-platform Development",
      "Penetration Testing",
      "Vulnerability Assessment",
      "Network Security",
      "Web Application Security",
      "Mobile App Security",
      "Cloud Security",
      "DevOps",
      "CI/CD",
      "Version Control",
      "Git",
      "Agile Methodologies",
      "Scrum",
      "Project Management",
      "Code Optimization",
      "Performance Tuning",
      "Scalable Architecture",
      "Microservices",
      "Containerization",
      "Docker",
      "Kubernetes",
      "Cloud Computing",
      "AWS",
      "Azure",
      "Google Cloud",
      "Machine Learning",
      "Artificial Intelligence",
      "Data Analysis",
      "Big Data",
      "Blockchain",
      "IoT",
      "Ghanaian Developer",
      "African Tech Talent",
      "Kumasi Tech Scene",
      "Accra Software Engineer",
      "Konongo IT Expert",
      ...projectTitles,
    ],
    openGraph: {
      title: "Projects | DevDrews - Ethical Hacker & Software Engineer",
      description:
        "Explore Andrews' portfolio of web, mobile, and security projects. From innovative web applications to robust security solutions, discover the work of an ethical hacker and software engineer from Ghana.",
      images: [
        {
          url: "/images/projects-og.jpg",
          width: 1200,
          height: 630,
          alt: "DevDrews Projects Showcase",
        },
      ],
      type: "website",
      locale: "en_US",
      url: "https://devdrews.com/projects",
      siteName: "DevDrews Projects",
    },
    twitter: {
      card: "summary_large_image",
      title: "Projects | DevDrews - Ethical Hacker & Software Engineer",
      description:
        "Explore Andrews' portfolio of web, mobile, and security projects. From innovative web applications to robust security solutions, discover the work of an ethical hacker and software engineer from Ghana.",
      images: ["/images/projects-og.jpg"],
      creator: "@devdrews1",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: "https://www.devdrews.com/projects",
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
