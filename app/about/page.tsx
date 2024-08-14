import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Code, Server, Shield, Award } from "lucide-react";
import AboutContent from "./AboutContent";

const skills = [
  {
    name: "Frontend Development",
    icon: <Code className="w-6 h-6" />,
    description: "Proficient in React, Next.js, and modern CSS frameworks",
  },
  {
    name: "Backend Development",
    icon: <Server className="w-6 h-6" />,
    description: "Experienced with Node.js, Express, and database management",
  },
  {
    name: "Ethical Hacking",
    icon: <Shield className="w-6 h-6" />,
    description: "Learning cybersecurity techniques and penetration testing",
  },
];

const awardsAndCertifications = [
  { name: "Certified Ethical Hacker (CEH)", issuer: "EC-Council", year: 2023 },
  {
    name: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    year: 2022,
  },
  {
    name: "Best Security Project Award",
    issuer: "Local Tech Conference",
    year: 2021,
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center mb-16">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary bg-clip-text bg-gradient-to-r from-primary to-secondary">
                About Andrews
              </h1>
              <p className="text-xl mb-8 text-muted-foreground">
                Ethical Hacker & Software Engineer
              </p>
              <div>
                <AboutContent />
              </div>
            </div>
            <div className="md:w-1/2 md:pl-12">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-75 blur-2xl"></div>
                <Image
                  src="/images/andrews-osei.jpg"
                  alt="Andrews Osei-Agyemang - DevDrews"
                  width={400}
                  height={400}
                  className="rounded-lg shadow-2xl relative z-10 transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-primary">
              Skills & Expertise
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {skills.map((skill, index) => (
                <article
                  key={skill.name}
                  className="bg-card bg-opacity-50 backdrop-blur-lg p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 border border-primary border-opacity-20"
                >
                  <div className="text-primary mb-4 flex items-center">
                    {skill.icon}
                    <h3 className="text-xl font-semibold ml-2">{skill.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {skill.description}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-primary">
              Awards & Certifications
            </h2>
            {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {awardsAndCertifications.map((item, index) => (
                <article
                  key={item.name}
                  className="bg-card bg-opacity-50 backdrop-blur-lg p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 border border-primary border-opacity-20"
                >
                  <div className="text-primary mb-4 flex items-center">
                    <Award className="w-6 h-6" />
                    <h3 className="text-xl font-semibold ml-2">{item.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.issuer}</p>
                  <p className="text-sm text-muted-foreground">{item.year}</p>
                </article>
              ))}
            </div> */}
          </section>

          <div className="text-center">
            <Link
              href="/projects"
              className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold transition-all duration-300 hover:bg-primary/80 hover:scale-105 shadow-lg hover:shadow-xl group"
            >
              View My Projects
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
