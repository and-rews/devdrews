import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | DevDrews - Ethical Hacker & Software Engineer",
  description:
    "Explore Andrews' portfolio of innovative software projects and cybersecurity experiments. Discover how he combines ethical hacking with cutting-edge development.",
  openGraph: {
    title: "Projects | DevDrews - Ethical Hacker & Software Engineer",
    description:
      "Explore Andrews' portfolio of innovative software projects and cybersecurity experiments. Discover how he combines ethical hacking with cutting-edge development.",
    images: [
      {
        url: "/images/projects-og.jpg",
        width: 1200,
        height: 630,
        alt: "DevDrews Projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | DevDrews - Ethical Hacker & Software Engineer",
    description:
      "Explore Andrews' portfolio of innovative software projects and cybersecurity experiments. Discover how he combines ethical hacking with cutting-edge development.",
    images: ["/images/projects-og.jpg"],
  },
};
