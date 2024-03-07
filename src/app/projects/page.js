"use client";

import Particles from "../../../components/Particles";
import Navbar from "../../../components/Navbar";
import AnimatedText from "../../../components/AnimatedText";

export default function Home() {
  return (
    <main className="logo-flex min-h-screen flex p-24 flex-col items-center justify-between">
      <Navbar />
      <Particles />
      <AnimatedText />
    </main>
  );
}
