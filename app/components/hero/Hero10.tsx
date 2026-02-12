"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";
import { SparklesSeparator } from "../sparklesSeparator/SparklesSeparator";
import { SparklesCore } from "../sparklesCore/SparklesCore";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const HeroAnimated = () => {
  const t = useTranslations("HomePage");
  const heroRef = useRef<HTMLElement | null>(null);

  useGSAP(() => {
    if (!heroRef.current) return;

    // Whole hero fade in
    gsap.fromTo(
      heroRef.current,
      { autoAlpha: 0, y: 10, filter: "blur(5px)" },
      {
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.05,
        scrollTrigger: {
          trigger: heroRef.current,
          once: true, // set true if you want play only once
        },
      },
    );
  }, []);

  return (
    <main
      ref={heroRef}
      className="w-screen h-screen bg-transparen  relative flex flex-col justify-center items-center"
    >
      <article className="flex flex-col items-center justify-center max-w-300 w-[80vw] gap-5">
        <div className="w-full h-fit flex flex-col uppercase  text-7xl leading-24 text-start">
          <h1>
            <span className="font-semibold">
              <TextWithGradient>{t("title.1")}</TextWithGradient>
            </span>{" "}
            {t("title.2")}
          </h1>
        </div>

        <div className="max-w-[100vw] h-[40vh] aspect-20/7 relative rounded-b-full overflow-hidden">
          <SparklesSeparator />
          <SparklesCore particleDensity={80} />
        </div>
      </article>
      <div className="w-[25vw] h-fit flex flex-col p-2 text-white gap-2 absolute right-[10%] bottom-[10%] text-start">
        <p>{t("subtitle")}</p>
        <p className="uppercase text-primary-1-500 font-semibold">
          {t("scrollText")}
        </p>
      </div>
    </main>
  );
};

const TextWithGradient = ({
  children,
  className,
}: {
  children: string;
  className?: string;
}) => {
  return (
    <div className="relative inline-block">
      {/* Texto con gradiente */}
      <span
        className={`tracking-tight bg-linear-to-r from-white  to-primary-1-500 bg-clip-text text-transparent ${className}`}
      >
        {children}
      </span>
    </div>
  );
};

const PARTICLE_COUNT = 40;

export const HeroStars = () => {
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
        duration: 0.2,
        stagger: { amount: 0.1, from: "random" },
        ease: "power1.out",
      });

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

      tl.to(logo, {
        scale: 0.5,
        y: 20,
        duration: 1,
        delay: 0.2,
        ease: "power1.out",
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
      className={`relative w-full ${animationComplete ? "bg-primary-3-900/0" : "bg-primary-3-900"} bg-primary-3-900 h-screen flex flex-col items-center justify-center overflow-hidden transition-all duration-200`}
    >
      <div className="flash-effect absolute inset-0 bg-[#2bb4c8]/ opacity-0 pointer-events-none z-20 mix-blend-overlay" />

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
          <div className="absolute inset-0 bg-[#2bb4c8]/0 blur-[80px] opacity-40 rounded-full animate-pulse"></div>
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
        <div className="absolute inset-0 m-auto z-10 text-center flex flex-col items-center gap-4 px-4">
          <HeroAnimated />
        </div>
      )}
    </section>
  );
};

export default HeroStars;
