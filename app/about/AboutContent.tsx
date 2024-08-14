"use client";

import React, { useEffect } from "react";
import { Briefcase, Lightbulb, Users, Shield } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const contentSections = [
  {
    icon: <Briefcase className="w-6 h-6 text-primary" />,
    title: "Professional Journey",
    content:
      "Passionate software engineer with 4 years of experience in developing high-quality, scalable solutions.",
  },
  {
    icon: <Lightbulb className="w-6 h-6 text-primary" />,
    title: "Innovative Approach",
    content:
      "Thriving on complex challenges and continuously expanding knowledge in the ever-evolving tech landscape.",
  },
  {
    icon: <Shield className="w-6 h-6 text-primary" />,
    title: "Ethical Hacking Venture",
    content:
      "Exploring cybersecurity and ethical hacking to contribute to creating more secure and resilient software solutions.",
  },
  {
    icon: <Users className="w-6 h-6 text-primary" />,
    title: "Community Engagement",
    content:
      "Active participant in local developer communities, attending meetups and conferences to exchange ideas.",
  },
];

export default function AboutContent() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="space-y-6">
      {contentSections.map((section, index) => (
        <div
          key={section.title}
          className="flex items-start space-x-4 p-4 rounded-lg bg-card bg-opacity-50 backdrop-blur-sm hover:bg-opacity-75 transition-all duration-300"
          data-aos="fade-up"
          data-aos-delay={index * 100}
        >
          <div className="flex-shrink-0 mt-1 bg-primary bg-opacity-20 p-2 rounded-full">
            {section.icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-primary">
              {section.title}
            </h3>
            <p className="text-muted-foreground">{section.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
