import React from "react";
import styles from "../styles/Navbar.module.css";
import Link from "next/link";
import { FolderOpen, Home, PhoneCall, Rss, User } from "lucide-react";

export default function Navbar() {
  return (
    <div className={styles.navContainer}>
      <aside className={styles.navbar}>
        <nav className={styles.nav}>
          <ul className={styles.ul}>
            <li className="">
              <Link href="/">
                <Home />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <User />
                <span>About</span>
              </Link>
            </li>
            <li>
              <Link href="/projects">
                <FolderOpen />
                <span>Projects</span>
              </Link>
            </li>
            <li>
              <Link href="/blog">
                <Rss />
                <span>Blog</span>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <PhoneCall />
                <span>Contact</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
}
