"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { useTheme } from "next-themes";

export interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  refresh?: boolean;
}

interface Circle {
  x: number;
  y: number;
  translateX: number;
  translateY: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  dx: number;
  dy: number;
  magnetism: number;
}

const ClientParticles: React.FC<ParticlesProps> = ({
  className = "",
  quantity = 50,
  staticity = 50,
  ease = 50,
  refresh = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<Circle[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const canvasSize = useRef({ w: 0, h: 0 });
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;

  const { theme } = useTheme();

  const circleParams = useCallback((): Circle => {
    const x = Math.floor(Math.random() * canvasSize.current.w);
    const y = Math.floor(Math.random() * canvasSize.current.h);
    const translateX = 0;
    const translateY = 0;
    const size = Math.floor(Math.random() * 2) + 1;
    const alpha = 0;
    const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1));
    const dx = (Math.random() - 0.5) * 0.2;
    const dy = (Math.random() - 0.5) * 0.2;
    const magnetism = 0.1 + Math.random() * 4;
    return {
      x,
      y,
      translateX,
      translateY,
      size,
      alpha,
      targetAlpha,
      dx,
      dy,
      magnetism,
    };
  }, []);

  const resizeCanvas = useCallback(() => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      circles.current.length = 0;
      canvasSize.current.w = canvasContainerRef.current.offsetWidth;
      canvasSize.current.h = canvasContainerRef.current.offsetHeight;
      canvasRef.current.width = canvasSize.current.w * dpr;
      canvasRef.current.height = canvasSize.current.h * dpr;
      canvasRef.current.style.width = `${canvasSize.current.w}px`;
      canvasRef.current.style.height = `${canvasSize.current.h}px`;
      context.current.scale(dpr, dpr);
    }
  }, [dpr]);

  const drawCircle = useCallback(
    (circle: Circle, update = false) => {
      if (context.current) {
        const { x, y, translateX, translateY, size, alpha } = circle;
        context.current.translate(translateX, translateY);
        context.current.beginPath();
        context.current.arc(x, y, size, 0, 2 * Math.PI);
        context.current.fillStyle = `rgba(0, 255, 0, ${alpha})`;
        context.current.fill();
        context.current.setTransform(dpr, 0, 0, dpr, 0, 0);

        if (!update) {
          return;
        }

        if (circle.alpha < circle.targetAlpha) {
          circle.alpha += 0.02;
        } else if (circle.alpha > circle.targetAlpha) {
          circle.alpha -= 0.02;
        }

        circle.translateX += circle.dx;
        circle.translateY += circle.dy;

        if (
          circle.x + circle.translateX < 0 ||
          circle.x + circle.translateX > canvasSize.current.w ||
          circle.y + circle.translateY < 0 ||
          circle.y + circle.translateY > canvasSize.current.h
        ) {
          circle.translateX = 0;
          circle.translateY = 0;
          circle.x = Math.floor(Math.random() * canvasSize.current.w);
          circle.y = Math.floor(Math.random() * canvasSize.current.h);
        }
      }
    },
    [dpr]
  );

  const drawParticles = useCallback(() => {
    circles.current.forEach((circle) => {
      drawCircle(circle, true);
    });
  }, [drawCircle]);

  const animate = useCallback(() => {
    if (context.current && canvasRef.current) {
      context.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      drawParticles();
    }
    requestAnimationFrame(animate);
  }, [drawParticles]);

  const initCanvas = useCallback(() => {
    resizeCanvas();
    for (let i = 0; i < quantity; i++) {
      circles.current.push(circleParams());
    }
    animate();
  }, [quantity, animate, circleParams, resizeCanvas]);

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
    }
    initCanvas();
    window.addEventListener("resize", initCanvas);

    return () => {
      window.removeEventListener("resize", initCanvas);
    };
  }, [initCanvas]);

  useEffect(() => {
    initCanvas();
  }, [theme, initCanvas]);

  return (
    <div
      className={`${className} w-full h-full`}
      ref={canvasContainerRef}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default ClientParticles;
