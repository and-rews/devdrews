"use client";

import Image from "next/image";
import Particles from "../../components/Particles";
import Navbar from "../../components/Navbar";

export default function Home() {
  return (
    <main className="logo-flex flex min-h-screen flex-col items-center justify-between p-24">
      <Particles />
      <Navbar />
      <div className="infinite-zoom">
        <Image
          src="/devdrews.png"
          alt="DevDrews"
          width={500}
          height={300}
          style={{ border: "none" }}
        />
      </div>
    </main>
  );
}
