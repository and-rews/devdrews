"use client";

import Image from "next/image";
import Particles from "../../components/Particles";
import Navbar from "../../components/Navbar";

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
          style={{ border: "none" }}
        />
      </div>
    </main>
  );
}
