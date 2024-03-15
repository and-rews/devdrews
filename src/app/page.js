"use client";

import TransitionEffect from "../../components/TransitionEffect";
import Image from "next/image";
import Particles from "../../components/Particles";
import Navbar from "../../components/Navbar";
import AnimatedText from "../../components/AnimatedText";
import Link from "next/link";

export default function Home() {
  return (
    <TransitionEffect>
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
        {/* <div>
          <h1 style={{ color: "white", fontWeight: "600", fontSize: "48px" }}>
            Dev<span style={{ color: "yellowgreen" }}>Drews</span>
          </h1>
        </div> */}
        <AnimatedText />
        <Link href="/contact" className="getstarted-button">
          Contact Me
        </Link>
      </main>
    </TransitionEffect>
  );
}

/*  */
