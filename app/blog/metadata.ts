import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | DevDrews - Insights on Ethical Hacking & Software Engineering",
  description:
    "Read Andrews' latest thoughts on cybersecurity, software development, and the intersection of technology and ethics. Stay updated with cutting-edge insights and tutorials.",
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
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Blog | DevDrews - Insights on Ethical Hacking & Software Engineering",
    description:
      "Read Andrews' latest thoughts on cybersecurity, software development, and the intersection of technology and ethics. Stay updated with cutting-edge insights and tutorials.",
    images: ["/images/blog-og.jpg"],
  },
};
