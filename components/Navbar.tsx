"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import styles from "../styles/Navbar.module.css";
import Link from "next/link";
import { FolderOpen, Home, PhoneCall, Rss, User } from "lucide-react";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/", icon: <Home /> },
  { name: "About", href: "/about", icon: <User /> },
  { name: "Projects", href: "/projects", icon: <FolderOpen /> },
  { name: "Blog", href: "/blog", icon: <Rss /> },
  { name: "Contact", href: "/contact", icon: <PhoneCall /> },
];

export default function Navbar() {
  const pathname = usePathname();

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <div className={styles.navContainer}>
      <aside data-aos="fade-left" className={styles.navbar}>
        <nav className={styles.nav}>
          <ul className={styles.ul}>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.name} data-aos="fade-right" data-aos-delay="100">
                  <Link href={link.href}>
                    <i className={isActive ? "text-orange-700" : "text-white"}>
                      {link.icon}
                    </i>
                    <span>{link.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </div>
  );
}
