"use client";

import React from "react";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center px-4 bg-matrix overflow-hidden">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 text-glow">
        Dev<span className="text-primary">Drews</span>
      </h1>
      <div className="h-20 mb-8">
        <TypeAnimation
          sequence={[
            "Ethical Hacker",
            2000,
            "Penetration Tester",
            2000,
            "Security Researcher",
            2000,
          ]}
          wrapper="h2"
          cursor={true}
          repeat={Infinity}
          className="text-2xl md:text-3xl font-semibold text-secondary"
        />
      </div>
      <p className="text-lg mb-8 max-w-2xl">
        Navigating the digital underground to fortify your digital assets.
        Committed to elevating cybersecurity standards, one test at a time.
      </p>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <Link href="/projects" passHref>
          <button className="btn btn-primary">
            View Projects <ArrowRight className="ml-2 inline" size={18} />
          </button>
        </Link>
        <Link href="mailto:your.email@example.com" passHref>
          <button className="btn btn-secondary">Contact Me</button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
