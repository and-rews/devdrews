"use client";

import Particles from "../../../components/Particles";
import Navbar from "../../../components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Particles />
      <div className="logo-flex min-h-screen flex p-24 flex-col items-center justify-between">
        <Navbar />
        <div className="about">
          <div className="left">
            <Image
              src="/andrews.jpg"
              alt="Andrews"
              width={300}
              height={100}
              style={{ border: "none" }}
              className="limg"
            />
            <h1>Andrews Osei-Agyemang</h1>
            <p>Ethical Hacker / Fullstack Developer</p>
            <div className="btns">
              <Link
                href="/resume.pdf"
                className="getstarted-button1"
                style={{ marginRight: "1rem" }}
                download="CV.pdf"
              >
                Download CV
              </Link>
              <Link href="/contact" className="getstarted-button">
                Contact Me
              </Link>
            </div>
          </div>
          <div className="right">
            <h1>
              I am <span>Andrews Osei-Agyemang</span>
            </h1>
            <p style={{ marginTop: "1rem" }}>
              I’m a passionate ethical hacker and a fullstack developer. I
              thrive on unraveling the mysteries of cyberspace. My mission? To
              safeguard digital landscapes by identifying vulnerabilities,
              fortifying defenses, and ensuring data integrity. Whether it’s
              penetration testing, vulnerability assessments, or securing web
              applications, I’m in my element. The thrill of outsmarting
              malicious actors keeps me burning the midnight oil.
            </p>
            <p style={{ marginTop: "1rem" }}>
              But wait, there’s more! I don’t just wear the hacker hat, I’m also
              a fullstack developer. From front-end magic to back-end wizardry,
              I craft seamless user experiences. HTML, CSS, JavaScript(Nextjs)?
              Check. Node.js, Express, MongoDB, Firebase? Double-check. I build
              web applications that dance gracefully between client and server,
              leaving users awestruck.
            </p>
            <p style={{ marginTop: "1rem" }}>
              Ah, WordPress, the Swiss Army knife of the web! I wield its powers
              to create content-driven wonders. Themes, plugins, child themes,
              I’ve brewed them all. Whether it’s a personal blog, an e-commerce
              emporium, or a client’s dream site, WordPress is my canvas. Let’s
              sprinkle some magic into the code!
            </p>
            <p style={{ marginTop: "1rem" }}>
              My canvas isn’t limited to code; it extends to design. I believe
              that aesthetics and functionality go hand in hand. When I’m not
              deciphering cryptic code, you’ll find me fine-tuning UI/UX,
              creating pixel-perfect layouts, and sprinkling creativity into
              every line of markup.
            </p>
            <p style={{ marginTop: "1rem" }}>
              {" "}
              Let’s Connect! 🌟 <br /> Whether it’s discussing the latest
              security trends, debating tech stacks, or collaborating on
              exciting projects, I’m all ears. Reach out, and let’s embark on
              this digital adventure together! Feel free to explore my
              portfolio, check out my GitHub repos, or drop me a message. The
              virtual coffee is on me! ☕️👋
            </p>
            <div className="abd">
              <div className="abd1">
                <h1>5+</h1>
                <p>Years of Experience</p>
              </div>
              <div className="abd2">
                <h1>20+</h1>
                <p>Projects Completed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
