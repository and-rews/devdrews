import dynamic from "next/dynamic";
import React from "react";
import type { ParticlesProps } from "./ClientParticles";

const ClientParticles = dynamic<ParticlesProps>(
  () => import("./ClientParticles").then((mod) => mod.default),
  {
    ssr: false,
  }
);

export const Particles: React.FC<ParticlesProps> = (props) => {
  return <ClientParticles {...props} />;
};
