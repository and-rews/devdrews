import React from "react";
import Link from "next/link";
import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

const socialLinks = [
  { icon: <Github className="h-5 w-5" />, href: "https://github.com/and-rews" },
  {
    icon: <Linkedin className="h-5 w-5" />,
    href: "https://www.linkedin.com/in/andrews-osei",
  },
  { icon: <Twitter className="h-5 w-5" />, href: "https://x.com/devdrews1" },
  {
    icon: <Facebook className="h-5 w-5" />,
    href: "https://web.facebook.com/devdrews1",
  },
  {
    icon: <Instagram className="h-5 w-5" />,
    href: "https://www.instagram.com/devdrews1/",
  },
];

export default function SocialIcons() {
  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 space-y-4">
      {socialLinks.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            variant="outline"
            size="icon"
            className="bg-background/60 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            {link.icon}
          </Button>
        </Link>
      ))}
    </div>
  );
}
