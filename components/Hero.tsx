"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Code,
  Download,
  Cpu,
  Database,
  Server,
  Blocks,
  Terminal,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";

// Command interface for terminal
interface Command {
  input: string;
  output: string;
}

// Interactive Terminal Component
const TerminalWindow: React.FC = () => {
  const [commands, setCommands] = useState<Command[]>([]);
  const [currentCommand, setCurrentCommand] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);

  const availableCommands = {
    help: () => `Available commands:
• about - Learn about me
• skills - View my technical skills
• projects - See my projects
• contact - Get my contact info
• clear - Clear terminal`,
    about: () => `Hello! I'm Andrews, a Software Developer from Ghana 🇬🇭
• Full Stack Developer with expertise in modern web technologies
• Passionate about building scalable applications
• Love working with React, Node.js, and Cloud technologies`,
    skills: () => `Technical Skills:
Frontend:
• React/Next.js
• TypeScript
• Tailwind CSS

Backend:
• Node.js
• Express
• PostgreSQL
• MongoDB

Tools & Others:
• Git
• Docker
• AWS
• CI/CD`,
    projects: () => `Recent Projects:
1. Project Alpha - Full-stack application
   Tech: Next.js, Node.js, PostgreSQL
   → github.com/yourusername/project-alpha

2. Project Beta - Cloud-native service
   Tech: React, AWS, Docker
   → github.com/yourusername/project-beta`,
    contact: () => `Let's connect!
• Email: your.email@example.com
• Github: github.com/yourusername
• LinkedIn: linkedin.com/in/yourusername
• Twitter: @yourusername`,
    clear: () => "",
  };

  const executeCommand = (cmd: string) => {
    const command = cmd.toLowerCase().trim();
    if (command === "clear") {
      setCommands([]);
      return;
    }

    const output =
      command in availableCommands
        ? availableCommands[command as keyof typeof availableCommands]()
        : `Command not found: ${command}. Type 'help' for available commands.`;

    setCommands((prev) => [...prev, { input: cmd, output }]);
    setCommandHistory((prev) => [...prev, cmd]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentCommand.trim()) {
      executeCommand(currentCommand);
      setCurrentCommand("");
      setHistoryIndex(-1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      } else {
        setHistoryIndex(-1);
        setCurrentCommand("");
      }
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commands]);

  useEffect(() => {
    executeCommand("help");
  }, []);

  return (
    <div className="relative w-full md:max-w-2xl backdrop-blur-lg bg-black/40 rounded-lg border border-cyan-500/20 transition-transform duration-300 hover:-translate-y-1">
      <div className="flex items-center justify-between border-b border-cyan-500/20 p-2 bg-black/50">
        <div className="flex space-x-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
        </div>
        <div className="flex items-center space-x-2 text-xs text-gray-400">
          <Terminal className="w-3 h-3" />
          <span>terminal</span>
        </div>
        <div className="w-12"></div>
      </div>
      <div
        ref={terminalRef}
        className="h-80 overflow-y-auto p-4 font-mono text-sm space-y-2 text-gray-300 scrollbar-thin scrollbar-thumb-cyan-500/20 scrollbar-track-transparent"
      >
        {commands.map((cmd, i) => (
          <div key={i} className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-cyan-500">→</span>
              <span>{cmd.input}</span>
            </div>
            <div className="whitespace-pre-wrap pl-6">{cmd.output}</div>
          </div>
        ))}
        <div className="flex items-center space-x-2">
          <span className="text-cyan-500">→</span>
          <input
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none"
            autoFocus
            spellCheck="false"
          />
        </div>
      </div>
    </div>
  );
};

// Matrix Rain Effect
const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = "01";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * canvas.height);
    }

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0ff3";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 opacity-20"
      style={{ background: "#000" }}
    />
  );
};

// Glitch Text Effect
const GlitchText: React.FC<{ text: string; delay?: number }> = ({
  text,
  delay = 2000,
}) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      const glitchDuration = Math.random() * 200 + 50;
      setTimeout(() => setIsGlitching(false), glitchDuration);
    }, delay);

    return () => clearInterval(glitchInterval);
  }, [delay]);

  if (isGlitching) {
    return (
      <span className="relative inline-block">
        <span className="relative text-cyan-500 mix-blend-screen">
          {text
            .split("")
            .map((char) => (Math.random() > 0.7 ? "_" : char))
            .join("")}
        </span>
        <span
          className="absolute top-0 left-0 text-red-500 mix-blend-screen"
          style={{
            transform: `translate(${Math.random() * 4 - 2}px, ${
              Math.random() * 4 - 2
            }px)`,
          }}
        >
          {text}
        </span>
        <span
          className="absolute top-0 left-0 text-blue-500 mix-blend-screen"
          style={{
            transform: `translate(${Math.random() * 4 - 2}px, ${
              Math.random() * 4 - 2
            }px)`,
          }}
        >
          {text}
        </span>
      </span>
    );
  }

  return <span className="text-cyan-500">{text}</span>;
};

// Tech Stack interface
interface TechStackItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  skills: string[];
}

// Main Hero Component
const Hero: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const techStack: TechStackItem[] = [
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "Frontend Development",
      description: "Building modern web applications",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Backend Development",
      description: "Scalable server solutions",
      skills: ["Node.js", "Express", "PostgreSQL", "MongoDB"],
    },
    {
      icon: <Server className="w-6 h-6" />,
      title: "DevOps & Cloud",
      description: "Cloud infrastructure & deployment",
      skills: ["AWS", "Docker", "CI/CD", "Kubernetes"],
    },
    {
      icon: <Blocks className="w-6 h-6" />,
      title: "Architecture & Tools",
      description: "Software architecture & development tools",
      skills: ["System Design", "Git", "REST APIs", "GraphQL"],
    },
  ];

  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-black">
      <MatrixRain />

      {/* Cyber grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f10_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f10_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="relative z-10">
        <div
          className={`container mx-auto px-4 pt-20 md:pt-24 transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="max-w-6xl mx-auto space-y-20">
            {/* Hero section with terminal */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left side - Hero text */}
              <div className="space-y-6 p-8 backdrop-blur-sm bg-black/40 border border-cyan-500/20 rounded-lg">
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white space-y-4">
                    <div className="flex items-baseline gap-4">
                      <span className="text-gray-300">&gt;</span>
                      <GlitchText text="Andrews" delay={3000} />
                    </div>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500">
                      Software Developer
                    </span>
                    <span className="block text-2xl md:text-3xl text-gray-400">
                      Full Stack Engineer
                    </span>
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-400 font-mono">
                    Building innovative solutions from Ghana 🇬🇭
                  </p>
                </div>
              </div>

              {/* Right side - Terminal */}
              <TerminalWindow />
            </div>

            {/* Tech stack grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {techStack.map((tech, index) => (
                <div
                  key={index}
                  className="group relative p-6 backdrop-blur-sm bg-black/40 rounded-lg border border-cyan-500/20
                           hover:border-cyan-500 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  {/* Glow effect on hover */}
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />

                  <div className="relative z-10 flex items-start gap-4">
                    <div
                      className="text-cyan-500 group-hover:text-cyan-400 transform transition-transform duration-300 
                                  group-hover:scale-110 group-hover:rotate-12"
                    >
                      {tech.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">
                        {tech.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-3">
                        {tech.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {tech.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 text-sm font-mono rounded-md bg-cyan-500/10 text-cyan-400
                                     border border-cyan-500/20"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pb-8">
              <button
                className="group relative px-8 py-3 bg-cyan-500/20 rounded-lg overflow-hidden
                               border border-cyan-500 hover:bg-cyan-500/30 transition-all duration-300"
              >
                <div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/30 to-cyan-500/0 
                              translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                />
                <span className="relative z-10 flex items-center justify-center gap-2 text-cyan-500 font-medium">
                  <Code className="w-4 h-4" />
                  View Projects
                </span>
              </button>
              <button
                className="group relative px-8 py-3 bg-transparent rounded-lg overflow-hidden
                               border border-cyan-500/50 hover:border-cyan-500 transition-all duration-300"
              >
                <div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 
                              translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                />
                <span className="relative z-10 flex items-center justify-center gap-2 text-cyan-500 font-medium">
                  <Download className="w-4 h-4" />
                  Download CV
                </span>
              </button>
            </div>

            {/* Social Links */}
            <div className="flex justify-center space-x-6 pb-8">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="transform hover:scale-110 transition-transform duration-200"
              >
                <Github className="w-6 h-6 text-gray-400 hover:text-cyan-500" />
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="transform hover:scale-110 transition-transform duration-200"
              >
                <Linkedin className="w-6 h-6 text-gray-400 hover:text-cyan-500" />
              </a>
              <a
                href="https://twitter.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="transform hover:scale-110 transition-transform duration-200"
              >
                <Twitter className="w-6 h-6 text-gray-400 hover:text-cyan-500" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
