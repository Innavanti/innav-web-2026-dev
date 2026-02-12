"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";

const PARTICLE_COUNT = 40;

export default function HeroStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const [animationComplete, setAnimationComplete] = useState(false);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        onComplete: () => setAnimationComplete(true),
      });

      const particles = particlesRef.current.filter((p) => p !== null);
      const logo = logoWrapperRef.current;
      if (!logo) return;

      // --- ESCENA 1: EL CAOS ---
      tl.set(particles, {
        x: () => (Math.random() - 0.5) * window.innerWidth,
        y: () => (Math.random() - 0.5) * window.innerHeight,
        scale: () => Math.random() * 0.8 + 0.2, // estrellas más variadas
        opacity: 0,
      });

      tl.to(particles, {
        opacity: 1,
        duration: 1,
        stagger: { amount: 0.5, from: "random" },
        ease: "power1.out",
      });

      // drift suave + "twinkle" (parpadeo)
      tl.to(
        particles,
        {
          x: "+=random(-60, 60)",
          y: "+=random(-60, 60)",
          duration: 2,
          ease: "sine.inOut",
        },
        "<",
      );

      tl.to(
        particles,
        {
          opacity: "random(0.4,1)",
          duration: 0.6,
          stagger: { each: 0.02, from: "random" },
          ease: "sine.inOut",
          repeat: 2,
          yoyo: true,
        },
        "<+=0.2",
      );

      // --- ESCENA 2: LA ATRACCIÓN ---
      tl.to(particles, {
        x: 0,
        y: 0,
        scale: 0.08,
        opacity: 0.5,
        duration: 0.8,
        ease: "expo.in",
      });

      // --- ESCENA 3: LA FUSIÓN ---
      tl.to(particles, {
        opacity: 0,
        duration: 0.1,
      });

      tl.fromTo(
        logo,
        { scale: 0, opacity: 0, filter: "blur(20px)" },
        {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "elastic.out(1, 0.5)",
          onStart: () => {
            gsap.fromTo(
              ".flash-effect",
              { opacity: 1 },
              { opacity: 0, duration: 0.5 },
            );
          },
        },
        "-=0.2",
      );

      gsap.to(logo, {
        y: -15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 3.5,
      });
    },
    { scope: containerRef },
  );

  const addParticleRef = (el: HTMLDivElement | null) => {
    if (el && !particlesRef.current.includes(el)) {
      particlesRef.current.push(el);
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-slate-950 flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="flash-effect absolute inset-0 bg-[#2bb4c8] opacity-0 pointer-events-none z-20 mix-blend-overlay" />

      {/* --- PARTÍCULAS: ESTRELLAS CON GLOW --- */}
      {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={addParticleRef}
          className="absolute z-10 pointer-events-none"
          style={{
            width: 10,
            height: 10,

            // ⭐ forma estrella (5 puntas) con clip-path
            clipPath:
              "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",

            // ✨ núcleo brillante + caída suave
            background:
              i % 2 === 0
                ? "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(43,180,200,0.95) 35%, rgba(43,180,200,0) 70%)"
                : "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(16,103,136,0.95) 35%, rgba(16,103,136,0) 70%)",

            // 🌟 glow premium (mejor que box-shadow para formas con clip-path)
            filter:
              i % 2 === 0
                ? "drop-shadow(0 0 6px rgba(43,180,200,0.9)) drop-shadow(0 0 14px rgba(43,180,200,0.45))"
                : "drop-shadow(0 0 6px rgba(16,103,136,0.9)) drop-shadow(0 0 14px rgba(16,103,136,0.45))",

            opacity: 0,
            willChange: "transform, opacity",
          }}
        />
      ))}

      {/* --- LOGO --- */}
      <div ref={logoWrapperRef} className="relative z-30 mb-8 opacity-0">
        <div className="relative w-[150px] h-[150px] md:w-[220px] md:h-[220px]">
          <div className="absolute inset-0 bg-[#2bb4c8] blur-[80px] opacity-40 rounded-full animate-pulse"></div>
          <Image
            src="/assets/branding/isotipo.svg"
            alt="Innavanti Logo"
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>
      </div>

      {/* --- UI CONTENT --- */}
      {animationComplete && (
        <div className="relative z-40 text-center flex flex-col items-center gap-4 px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter text-white"
          >
            Orden en el{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2bb4c8] to-[#106788]">
              Caos Digital
            </span>
            .
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-slate-400 max-w-lg text-lg"
          >
            Innavanti transforma procesos complejos en automatizaciones simples.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="mt-6 flex gap-4"
          >
            <button className="px-8 py-3 bg-[#2bb4c8] text-slate-950 font-bold rounded-full hover:shadow-[0_0_25px_#2bb4c8] transition-shadow">
              Automatizar mi empresa
            </button>
          </motion.div>
        </div>
      )}

      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(#2bb4c8 1px, transparent 1px), linear-gradient(90deg, #2bb4c8 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="absolute inset-0 bg-radial-gradient from-transparent to-slate-950 z-0" />
    </section>
  );
}
