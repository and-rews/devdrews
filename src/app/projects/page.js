"use client";

import TransitionEffect from "../../../components/TransitionEffect";
import Particles from "../../../components/Particles";
import Navbar from "../../../components/Navbar";
import Link from "next/link";
import Image from "next/image";

export default function Projects() {
  const projects = [
    {
      name: "Super Lovek Phones",
      link: "https://superlovekphones.com",
      image: "/superlovek.png",
    },
    {
      name: "Vegas Lounge & Skybar",
      link: "https://vegaskybar.com",
      image: "/vegas.png",
    },
    {
      name: "Lovek Condos",
      link: "https://lovekcondos.com",
      image: "/condos.png",
    },
    {
      name: "Naana Hayford Media Institue",
      link: "https://naanahayford.com",
      image: "/naanahayford.png",
    },
    {
      name: "Del Lubricants",
      link: "https://dellubricants.com",
      image: "/dellubricants.png",
    },
    {
      name: "Breakthrough Media",
      link: "https://breakthroughgh.com",
      image: "/breakthrough.png",
    },
    {
      name: "React Quote App",
      link: "https://and-rews.github.io/react-quote-app/",
      image: "/quote.png",
    },
    {
      name: "Duty Roster",
      link: "https://and-rews.github.io/duty-roster/",
      image: "/dutyroster.png",
    },
    {
      name: "Loan Calculator",
      link: "https://and-rews.github.io/loan-calc/",
      image: "/loancalculator.png",
    },
    {
      name: "Love Calculator",
      link: "https://and-rews.github.io/love_calc/",
      image: "/lovecalculator.png",
    },
    {
      name: "Quiz App",
      link: "https://and-rews.github.io/Quiz-app/",
      image: "/quiz.png",
    },
    {
      name: "Search App",
      link: "https://and-rews.github.io/explore/",
      image: "/se.png",
    },
    {
      name: "Github Finder",
      link: "https://and-rews.github.io/github-finder/",
      image: "/github.png",
    },
    {
      name: "ReactMUI Signin Page",
      link: "https://mui-sign-pcv3ijjsz-and-rews.vercel.app/",
      image: "/mui.png",
    },
    {
      name: "Facebook Clone",
      link: "https://social-c7ej9glca-and-rews.vercel.app/",
      image: "/fb.png",
    },
    {
      name: "Register Page",
      link: "https://social-c7ej9glca-and-rews.vercel.app/register",
      image: "/register.png",
    },
  ];

  return (
    <TransitionEffect>
      <main className="logo-flex min-h-screen flex p-24 flex-col items-center justify-between">
        <Navbar />
        {/* <Particles /> */}
        <h1
          className="project-title"
          style={{ color: "white", fontSize: "25px", marginTop: "3rem" }}
        >
          Discover my projects
        </h1>
        <section className="projects flex flex-wrap justify-center p-12">
          {projects.map((project) => (
            <article
              key={project.name}
              className="project-card w-full md:w-1/4 p-4 rounded shadow-md"
            >
              <Link href={project.link}>
                <Image
                  src={project.image}
                  alt={project.name}
                  height={400}
                  width={400}
                  className="proimg"
                />
              </Link>
              <div className="project-info p-4">
                <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                {/* Add a short project description here if desired */}
              </div>
            </article>
          ))}
        </section>
      </main>
    </TransitionEffect>
  );
}
