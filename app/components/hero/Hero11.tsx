"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";
import { SparklesSeparator } from "../sparklesSeparator/SparklesSeparator";
import { SparklesCore } from "../sparklesCore/SparklesCore";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { FiGlobe, FiSettings, FiSmartphone } from "react-icons/fi";
import { CgBot } from "react-icons/cg";

gsap.registerPlugin(ScrollTrigger);

export const HeroAnimated = () => {
  const t = useTranslations("HomePage");
  const heroRef = useRef<HTMLElement | null>(null);

  const HomeButtons = [
    {
      icon: <FiSmartphone />,
      title: t("bottomLinks.apps"),
      href: "/#apps",
      hrefMobile: "/",
    },
    {
      icon: <FiGlobe />,
      title: t("bottomLinks.web"),
      href: "/#web",
      hrefMobile: "/",
    },
    {
      icon: <CgBot />,
      title: t("bottomLinks.assistants"),
      href: "/#assistants",
      hrefMobile: "/",
    },
    {
      icon: <FiSettings />,
      title: t("bottomLinks.automation"),
      href: "/#automation",
      hrefMobile: "/",
    },
  ];

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
      className="w-screen h-screen bg-transparen relative flex flex-col justify-center items-center "
    >
      <article className="w-full h-full flex flex-col items-center justify-center gap-0 px-[5%] lg:px-0">
        <div className="w-full h-full flex flex-col uppercase text-[32px] lg:text-[36px] font-bold text-center justify-end py-6 leading-tight">
          <h1 className="">
            <span
              className="bg-linear-to-b from-primary-1-50 to-primary-3-900/20 bg-clip-text text-transparent
  "
            >
              {t("title.3")}
            </span>
          </h1>
        </div>
        <div className="relative w-full max-w-[100vw] h-full max-h-[45vh] rounded-b-full overflow- ">
          <SparklesSeparator />
          <SparklesCore particleDensity={25} overscanY={220} />
        </div>
      </article>
      <section className=" lg:max-h-10 w-full md:max-w-[70vw] grid grid-cols-2 auto-rows-fr items-stretch justify-items-stretch px-[3%] absolute bottom-[7%] inset-x-0 m-auto gap-5 lg:max-w-max lg:w-fit lg:flex lg:flex-row lg:justify-center lg:px-[10vw] lg:gap-10">
        {HomeButtons.map((button, index) => (
          <HomeButton key={index} {...button} />
        ))}
      </section>
    </main>
  );
};

const PARTICLE_COUNT = 40;

export const NewHeroWithLogo = () => {
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
          y: "25%",
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
        scale: 0.7,
        y: "7%",
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
      className={`relative w-full ${animationComplete ? "bg-primary-3-900/0" : "bg-primary-3-900"} bg-primary-3-900 h-screen flex flex-col items-center justify-center overflow-hidde transition-all duration-200`}
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
      <div
        ref={logoWrapperRef}
        className="absolute h-fit lg:h-full top-[15%] lg:inset-0 m-auto z-30 w-fit opacity-0 pointer-events-none"
      >
        <div className="relative w-[80vw] md:min-w-[35vw] md:max-w-175 aspect-video xl:max-w-48">
          <div className="absolute inset-0 bg-[#2bb4c8]/30 blur-[80px] opacity-40 rounded-full animate-pulse" />
          <Image
            src="/assets/branding/innav-logo-v.png"
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

const HomeButton = ({
  title,
  href,
  hrefMobile,
  icon,
}: {
  title: string;
  href: string;
  hrefMobile: string;
  icon?: React.ReactNode;
}) => {
  return (
    <>
      <div
        className="relative bg-white/10 backdrop-blur-lg rounded-full group w-full h-full lg:min-w-56 cursor-pointer z-30 outline outline-white/10 hover:outline-primary-1-500 transition-all duration-300"
        style={{
          backdropFilter: "blur(40px)",
        }}
      >
        {/* Gradient Border Layer */}
        {/* <div
          className="absolute inset-0 rounded-full p-0.5 hidden"
          style={{
            background: "linear-gradient(to bottom, #00A6F4, #615FFF)",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        /> */}

        <Link
          className="lg:hidden w-full h-full flex items-center justify-center px-3 py-3 gap-2 not-visited:text-white rounded-full overflow-hidden relative"
          href={hrefMobile}
        >
          <div>{icon}</div>
          <p className="relative w-fit h-fit text-sm font-bold uppercase text-white transition-colors duration-300 ">
            {title}
          </p>
        </Link>
        <Link
          className="hidden w-full justify-center lg:flex flex-row items-center px-4 py-2 gap-2 text-white rounded-full overflow-hidden relative"
          href={href}
        >
          {icon}
          <p className="relative  text-sm font-bold uppercase text-white transition-colors duration-300 ">
            {title}
          </p>
        </Link>
      </div>
    </>
  );
};

export default NewHeroWithLogo;
