"use client";

import Image from "next/image";
import Particles from "../../components/Particles";
import Navbar from "../../components/Navbar";
import AnimatedText from "../../components/AnimatedText";
import Link from "next/link";

export default function Home() {
  return (
    <main className="logo-flex min-h-screen flex p-24 flex-col items-center justify-between">
      <Navbar />
      <Particles />
      <div className="infinite-zoom ">
        <Image
          src="/devdrews.png"
          alt="DevDrews"
          width={500}
          height={300}
          style={{ border: "none", marginBottom: "2rem" }}
          className="logo"
        />
      </div>
      <AnimatedText />
      <Link href="/contact" className="getstarted-button">
        Contact Me
      </Link>
    </main>
  );
}
