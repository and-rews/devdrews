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
      "Read Andrews' latest thoughts on cybersecurity, software development, and the intersection of technology and ethics. Stay updated with cutting-edge insights, tutorials, and expert analysis from a Ghanaian ethical hacker and software engineer.",
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
      "Web Security",
      "Network Security",
      "Mobile Security",
      "Cloud Security",
      "IoT Security",
      "Penetration Testing",
      "Vulnerability Assessment",
      "Malware Analysis",
      "Reverse Engineering",
      "Cryptography",
      "Blockchain Security",
      "AI in Cybersecurity",
      "Machine Learning for Security",
      "DevSecOps",
      "Secure Coding Practices",
      "OWASP Top 10",
      "Bug Bounty",
      "Cyber Threat Intelligence",
      "Incident Response",
      "Digital Forensics",
      "Privacy and Data Protection",
      "GDPR",
      "CCPA",
      "Information Security Management",
      "Risk Management",
      "Compliance and Regulations",
      "Social Engineering",
      "Phishing Prevention",
      "Secure Architecture Design",
      "Zero Trust Security",
      "Cloud Native Security",
      "Containerization Security",
      "Kubernetes Security",
      "API Security",
      "Web Application Firewalls",
      "Intrusion Detection Systems",
      "Security Information and Event Management (SIEM)",
      "Ethical Considerations in Tech",
      "Responsible AI",
      "Open Source Security",
      "Cyber Ethics",
      "Tech Policy and Governance",
      "Cybersecurity Education",
      "Women in Cybersecurity",
      "Diversity in Tech",
      "African Cybersecurity Landscape",
      "Ghanaian Tech Scene",
      "Emerging Technologies",
      "Future of Cybersecurity",
      "Cybersecurity Career Advice",
      "Tech Entrepreneurship",
      "Startup Security",
      ...blogTitles,
    ],
    openGraph: {
      title:
        "Blog | DevDrews - Insights on Ethical Hacking & Software Engineering",
      description:
        "Read Andrews' latest thoughts on cybersecurity, software development, and the intersection of technology and ethics. Stay updated with cutting-edge insights, tutorials, and expert analysis from a Ghanaian ethical hacker and software engineer.",
      images: [
        {
          url: "/images/blog-og.jpg",
          width: 1200,
          height: 630,
          alt: "DevDrews Blog - Cybersecurity and Software Engineering Insights",
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
        "Read Andrews' latest thoughts on cybersecurity, software development, and the intersection of technology and ethics. Stay updated with cutting-edge insights, tutorials, and expert analysis from a Ghanaian ethical hacker and software engineer.",
      images: ["/images/blog-og.jpg"],
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
      canonical: "https://www.devdrews.com/blog",
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
