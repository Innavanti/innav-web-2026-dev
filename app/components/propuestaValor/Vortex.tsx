"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface VortexProps {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  particleCount?: number;
  rangeY?: number;
  baseHue?: number;
  baseSpeed?: number;
  rangeSpeed?: number;
  baseRadius?: number;
  rangeRadius?: number;
  backgroundColor?: string;
  direction?: "up" | "down" | "left" | "right"; // Nueva prop opcional
}

const createNoise = () => {
  const p = new Uint8Array(512);
  for (let i = 0; i < 256; i++)
    p[i] = p[i + 256] = Math.floor(Math.random() * 256);
  const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
  const lerp = (t: number, a: number, b: number) => a + t * (b - a);
  const grad = (hash: number, x: number, y: number, z: number) => {
    const h = hash & 15;
    const u = h < 8 ? x : y;
    const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  };
  return (x: number, y: number, z: number) => {
    const X = Math.floor(x) & 255,
      Y = Math.floor(y) & 255,
      Z = Math.floor(z) & 255;
    x -= Math.floor(x);
    y -= Math.floor(y);
    z -= Math.floor(z);
    const u = fade(x),
      v = fade(y),
      w = fade(z);
    const A = p[X] + Y,
      AA = p[A] + Z,
      AB = p[A + 1] + Z,
      B = p[X + 1] + Y,
      BA = p[B] + Z,
      BB = p[B + 1] + Z;
    return lerp(
      w,
      lerp(
        v,
        lerp(u, grad(p[AA], x, y, z), grad(p[BA], x - 1, y, z)),
        lerp(u, grad(p[AB], x, y - 1, z), grad(p[BB], x - 1, y - 1, z)),
      ),
      lerp(
        v,
        lerp(u, grad(p[AA + 1], x, y, z - 1), grad(p[BA + 1], x - 1, y, z - 1)),
        lerp(
          u,
          grad(p[AB + 1], x, y - 1, z - 1),
          grad(p[BB + 1], x - 1, y - 1, z - 1),
        ),
      ),
    );
  };
};

export const Vortex = (props: VortexProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>(0);
  const particleCount = props.particleCount || 700;
  const particlePropCount = 9;
  const particlePropsLength = particleCount * particlePropCount;
  const rangeY = props.rangeY || 100;
  const baseTTL = 50;
  const rangeTTL = 150;
  const baseSpeed = props.baseSpeed || 0.0;
  const rangeSpeed = props.rangeSpeed || 1.5;
  const baseRadius = props.baseRadius || 1;
  const rangeRadius = props.rangeRadius || 2;
  const noiseSteps = 3;
  const xOff = 0.00125;
  const yOff = 0.00125;
  const zOff = 0.0005;

  let tick = 0;
  const noise3D = createNoise();
  let particleProps = new Float32Array(particlePropsLength);
  let center: [number, number] = [0, 0];

  const TAU: number = 2 * Math.PI;
  const rand = (n: number): number => n * Math.random();
  const randRange = (n: number): number => n - rand(2 * n);
  const fadeInOut = (t: number, m: number): number => {
    let hm = 0.5 * m;
    return Math.abs(((t + hm) % m) - hm) / hm;
  };
  const lerp = (n1: number, n2: number, speed: number): number =>
    (1 - speed) * n1 + speed * n2;

  const setup = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        resize(canvas);
        initParticles();
        draw(canvas, ctx);
      }
    }
  };

  const initParticles = () => {
    tick = 0;
    particleProps = new Float32Array(particlePropsLength);
    for (let i = 0; i < particlePropsLength; i += particlePropCount) {
      initParticle(i);
    }
  };

  const initParticle = (i: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let hue;
    if (props.baseHue !== undefined) {
      hue = props.baseHue + rand(100);
    } else {
      const janColors = [190, 241]; // Solo guardamos Hues de Jan
      hue = janColors[Math.floor(Math.random() * janColors.length)];
    }

    const x = rand(canvas.width);
    const y = center[1] + randRange(rangeY);
    particleProps.set(
      [
        x,
        y,
        0,
        0,
        0,
        baseTTL + rand(rangeTTL),
        baseSpeed + rand(rangeSpeed),
        baseRadius + rand(rangeRadius),
        hue,
      ],
      i,
    );
  };

  const draw = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    tick++;
    if (props.backgroundColor) {
      ctx.fillStyle = props.backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    drawParticles(ctx);
    renderGlow(canvas, ctx);
    renderToScreen(canvas, ctx);
    animationFrameId.current = window.requestAnimationFrame(() =>
      draw(canvas, ctx),
    );
  };

  const drawParticles = (ctx: CanvasRenderingContext2D) => {
    for (let i = 0; i < particlePropsLength; i += particlePropCount) {
      updateParticle(i, ctx);
    }
  };

  const updateParticle = (i: number, ctx: CanvasRenderingContext2D) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let x = particleProps[i],
      y = particleProps[i + 1];

    // Noise base
    const n = noise3D(x * xOff, y * yOff, tick * zOff) * noiseSteps * TAU;

    // Aplicamos dirección si existe
    let targetX = Math.cos(n);
    let targetY = Math.sin(n);

    if (props.direction) {
      switch (props.direction) {
        case "up":
          targetY -= 1.5;
          break;
        case "down":
          targetY += 1.5;
          break;
        case "left":
          targetX -= 1.5;
          break;
        case "right":
          targetX += 1.5;
          break;
      }
    }

    const vx = lerp(particleProps[i + 2], targetX, 0.1);
    const vy = lerp(particleProps[i + 3], targetY, 0.1);
    let life = particleProps[i + 4];
    const ttl = particleProps[i + 5],
      speed = particleProps[i + 6],
      x2 = x + vx * speed,
      y2 = y + vy * speed,
      radius = particleProps[i + 7],
      hue = particleProps[i + 8];

    // Colores de Jan
    const s = props.baseHue === undefined && hue === 190 ? 57 : 100;
    const l =
      props.baseHue === undefined && hue === 190
        ? 51
        : props.baseHue === undefined
          ? 69
          : 60;

    ctx.save();
    ctx.lineCap = "round";
    ctx.lineWidth = radius;
    ctx.strokeStyle = `hsla(${hue}, ${s}%, ${l}%, ${fadeInOut(life, ttl)})`;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.restore();

    life++;
    particleProps[i] = x2;
    particleProps[i + 1] = y2;
    particleProps[i + 2] = vx;
    particleProps[i + 3] = vy;
    particleProps[i + 4] = life;

    // Si sale de los bordes o muere, reinicia
    (x2 > canvas.width ||
      x2 < 0 ||
      y2 > canvas.height ||
      y2 < 0 ||
      life > ttl) &&
      initParticle(i);
  };

  const renderGlow = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
  ) => {
    ctx.save();
    ctx.filter = "blur(8px) brightness(150%)";
    ctx.globalCompositeOperation = "lighter";
    ctx.drawImage(canvas, 0, 0);
    ctx.restore();
  };

  const renderToScreen = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
  ) => {
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.drawImage(canvas, 0, 0);
    ctx.restore();
  };

  const resize = (canvas: HTMLCanvasElement) => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    center[0] = 0.5 * canvas.width;
    center[1] = 0.5 * canvas.height;
  };

  useEffect(() => {
    setup();
    const handleResize = () => {
      if (canvasRef.current) resize(canvasRef.current);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  return (
    <div className={`relative h-full w-full ${props.containerClassName || ""}`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 z-0 flex h-full w-full items-center justify-center bg-transparent pointer-events-none"
      >
        <canvas ref={canvasRef}></canvas>
      </motion.div>
      <div className={`relative z-10 ${props.className || ""}`}>
        {props.children}
      </div>
    </div>
  );
};
