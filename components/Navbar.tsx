"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, Folder, Rss, Phone, Menu, X } from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: User },
  { name: "Projects", href: "/projects", icon: Folder },
  { name: "Blog", href: "/blog", icon: Rss },
  { name: "Contact", href: "/contact", icon: Phone },
];

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  const isActive = (href: string): boolean => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="md:container bg-muted/80 backdrop-blur-sm py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-bold text-primary hover:text-glow transition-all duration-300"
          >
            DevDrews
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`nav-link group relative ${
                  isActive(item.href)
                    ? "text-primary font-semibold"
                    : "text-foreground hover:text-primary"
                }`}
              >
                <div className="flex items-center">
                  <item.icon className="mr-2" size={18} />
                  {item.name}
                </div>
                {isActive(item.href) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary shadow-glow"></span>
                )}
                <span className="hover-target bg-muted absolute inset-0 -z-10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground hover:text-primary transition-colors duration-300"
            onClick={toggleMenu}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`md:hidden ${isOpen ? "block" : "hidden"} mt-4`}>
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`nav-link group relative mb-2 ${
                isActive(item.href)
                  ? "text-primary font-semibold"
                  : "text-foreground hover:text-primary"
              }`}
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center">
                <item.icon className="mr-2" size={18} />
                {item.name}
              </div>
              {isActive(item.href) && (
                <span className="absolute left-0 w-1 h-full bg-primary shadow-glow rounded-r"></span>
              )}
              <span className="hover-target bg-muted absolute inset-0 -z-10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
