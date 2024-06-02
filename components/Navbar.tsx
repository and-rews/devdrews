import React from "react";
import styles from "../styles/Navbar.module.css";
import Link from "next/link";
import { Contact, FolderOpen, Home, Rss, User } from "lucide-react";

export default function Navbar() {
  return (
    <div className="">
      <aside className={styles.navbar}>
        <nav className={styles.nav}>
          <ul>
            <li className="mt-4">
              <Link href="/">
                <Home />
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <User />
              </Link>
            </li>
            <li>
              <Link href="/projects">
                <FolderOpen />
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <Rss />
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <Contact />
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
}
