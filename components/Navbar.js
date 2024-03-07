"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { id: 1, name: "Home", path: "/" },
  { id: 2, name: "About", path: "/about" },
  { id: 3, name: "Projects", path: "/projects" },
  { id: 4, name: "Blog", path: "/blog" },
  { id: 5, name: "Contact", path: "/contact" },
];

const VerticalNavbar = () => {
  const pathname = usePathname();
  const isActive = (path) => path === pathname;
  return (
    <nav className="nav">
      <ul className="text-white flex space-y-4">
        {navLinks.map((link) => {
          return (
            <li key={link.id}>
              <Link
                href={link.path}
                className={isActive(link.path) ? "active mr" : "mr"}
              >
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default VerticalNavbar;
