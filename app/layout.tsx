import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "DevDrews - Ethical Hacker & Penetration Tester from Ghana",
    template: "%s | DevDrews",
  },
  description:
    "Portfolio of Andrews, an ethical hacker and penetration tester from Ghana, dedicated to improving cybersecurity through innovative solutions, continuous learning, and sharing knowledge across Africa and beyond.",
  keywords: [
    "ethical hacker",
    "penetration tester",
    "cybersecurity expert",
    "software engineer",
    "DevDrews",
    "Andrews",
    "Andrews Osei",
    "Andrews Osei-Agyemang",
    "Andrews Osei Agyemang",
    "Ghana",
    "Kumasi",
    "Accra",
    "Konongo",
    "African cybersecurity",
    "web security",
    "network security",
    "mobile security",
    "cloud security",
    "IoT security",
    "blockchain security",
    "AI in cybersecurity",
    "machine learning for security",
    "DevSecOps",
    "secure coding practices",
    "OWASP Top 10",
    "bug bounty hunter",
    "vulnerability assessment",
    "cyber threat intelligence",
    "incident response",
    "digital forensics",
    "privacy and data protection",
    "information security management",
    "risk management",
    "compliance and regulations",
    "social engineering",
    "phishing prevention",
    "secure architecture design",
    "zero trust security",
    "API security",
    "web application firewalls",
    "intrusion detection systems",
    "SIEM",
    "ethical considerations in tech",
    "responsible AI",
    "open source security",
    "cyber ethics",
    "tech policy and governance",
    "cybersecurity education",
    "diversity in tech",
    "African tech talent",
    "Ghanaian software developer",
    "West African cybersecurity",
    "emerging technologies",
    "future of cybersecurity",
    "tech entrepreneurship",
    "startup security",
  ],
  authors: [{ name: "Andrews Osei-Agyemang", url: "https://devdrews.com" }],
  creator: "Andrews Osei-Agyemang",
  publisher: "DevDrews",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://devdrews.com",
    siteName: "DevDrews",
    title: "DevDrews - Ethical Hacker & Penetration Tester from Ghana",
    description:
      "Portfolio of Andrews, an ethical hacker and penetration tester from Ghana, dedicated to improving cybersecurity through innovative solutions, continuous learning, and sharing knowledge across Africa and beyond.",
    images: [
      {
        url: "https://devdrews.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DevDrews - Ethical Hacker & Penetration Tester from Ghana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DevDrews - Ethical Hacker & Penetration Tester from Ghana",
    description:
      "Portfolio of Andrews, an ethical hacker and penetration tester from Ghana, dedicated to improving cybersecurity through innovative solutions, continuous learning, and sharing knowledge across Africa and beyond.",
    images: ["https://devdrews.com/twitter-image.jpg"],
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
  verification: {
    google: "f_j4kSgrnYfVxaesQbBa5bTT5RNy_KDuR90YafK0Rqw",
  },
  alternates: {
    canonical: "https://www.devdrews.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased bg-[#050505]`}>
        <div className="relative min-h-screen">
          <div className="flex flex-col min-h-screen">
            <Navbar />
            {/* Remove container and padding from main as they should be handled by components */}
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
