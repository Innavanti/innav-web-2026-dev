"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useAnimation } from "motion/react";

type ParticlesProps = {
  id?: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
  overscanY?: number; // ✅ new
};

export const SparklesCore = (props: ParticlesProps) => {
  const {
    id,
    className,
    background,
    minSize = 1,
    maxSize = 3,
    speed = 1,
    particleColor = "#ffffff",
    particleDensity = 120,
    overscanY = 120, // ✅ default
  } = props;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const controls = useAnimation();

  const particles = useRef<any[]>([]);
  const animationId = useRef<number | null>(null);

  useEffect(() => {
    controls.start({ opacity: 1, transition: { duration: 1 } });
  }, [controls]);

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !canvasRef.current) return;

      const { clientWidth, clientHeight } = containerRef.current;
      const w = clientWidth;
      const h = clientHeight + overscanY; // ✅ bigger canvas

      setSize({ w, h });
      canvasRef.current.width = w;
      canvasRef.current.height = h;
    };

    const ro = new ResizeObserver(handleResize);
    if (containerRef.current) ro.observe(containerRef.current);

    return () => ro.disconnect();
  }, [overscanY]);

  const createParticle = useCallback(
    (x?: number, y?: number) => {
      const w = size.w || window.innerWidth;
      const h = size.h || window.innerHeight;

      return {
        x: x ?? Math.random() * w,
        y: y ?? Math.random() * h,
        size: Math.random() * (maxSize - minSize) + minSize,
        speedX: (Math.random() - 0.5) * speed,
        speedY: (Math.random() - 0.5) * speed,
        opacity: Math.random(),
        opacitySpeed: Math.random() * 0.02 + 0.005,
        opacityDirection: Math.random() > 0.5 ? 1 : -1,
        color: particleColor,
      };
    },
    [size, maxSize, minSize, speed, particleColor],
  );

  useEffect(() => {
    if (size.w === 0 || size.h === 0) return;
    const area = size.w * size.h;
    const count = Math.floor((area / 10000) * (particleDensity / 10));
    particles.current = Array.from({ length: count }).map(() =>
      createParticle(),
    );
  }, [size, particleDensity, createParticle]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      ctx.clearRect(0, 0, size.w, size.h);

      particles.current.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = size.w;
        if (p.x > size.w) p.x = 0;
        if (p.y < 0) p.y = size.h;
        if (p.y > size.h) p.y = 0;

        p.opacity += p.opacitySpeed * p.opacityDirection;
        if (p.opacity >= 1) {
          p.opacity = 1;
          p.opacityDirection = -1;
        } else if (p.opacity <= 0.1) {
          p.opacity = 0.1;
          p.opacityDirection = 1;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      animationId.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      if (animationId.current) cancelAnimationFrame(animationId.current);
    };
  }, [size, particleColor]);

  return (
    <motion.div
      ref={containerRef}
      animate={controls}
      initial={{ opacity: 0 }}
      // ✅ allow visual spill
      className={`h-full w-full absolute inset-0 overflow-visible z-20 ${className || ""}`}
      style={{ background: background || "transparent" }}
    >
      <canvas
        ref={canvasRef}
        id={id || "tsparticles"}
        className="block w-full pointer-events-none"
        // ✅ make the element match the bigger bitmap + push it down if you want spill at bottom
        style={{ width: "100%", height: `calc(100% + ${overscanY}px)` }}
      />
    </motion.div>
  );
};
