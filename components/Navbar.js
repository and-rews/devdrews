import React from "react";
import Link from "next/link";

const VerticalNavbar = () => {
  return (
    <nav className="nav">
      <ul className="text-white flex space-y-4">
        <li>
          <Link href="/" className="mr">
            Home
          </Link>
        </li>
        <li>
          <Link href="/about" className="mr">
            About
          </Link>
        </li>
        <li>
          <Link href="/projects" className="mr">
            Projects
          </Link>
        </li>
        <li>
          <Link href="/blog" className="mr">
            Blog
          </Link>
        </li>
        <li>
          <Link href="/contact" className="mr">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default VerticalNavbar;
