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
      className="relative flex flex-col justify-center items-center bg-transparen w-screen h-screen"
    >
      <style>
        {`
            @keyframes SparklesGrowAnimation
            {
                from  { width: 0%; }
                25%   { width: 0%; }
                to    { width: 100%; }
            }
            @keyframes TitleGrowAnimation 
            {

                from  { clip-path: polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%); }
                25%   { clip-path: polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%); }
                to    { clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); }
            }
        `}
      </style>
      <article className="flex flex-col justify-center items-center gap-0 px-[5%] lg:px-0 w-full h-full">
        <div className="flex flex-col justify-end py-6 w-full h-full font-bold text-[32px] lg:text-[36px] text-center uppercase leading-tight">
          <h1 className="">
            {/*  */}
            <span
              className="bg-clip-text bg-linear-to-b from-primary-1-50 to-primary-3-900/20 text-transparent"
              style={{
                animation: "TitleGrowAnimation 1 linear",
                animationDuration: "1.5s",
              }}
            >
              {t("title.3")}
            </span>
          </h1>
        </div>
        <div className="relative rounded-b-full w-full max-w-[100vw] h-full max-h-[45vh] overflow-">
          <div
            className="m-auto"
            style={{
              animation: "SparklesGrowAnimation 1 linear",
              animationDuration: "1.5s",
            }}
          >
            <SparklesSeparator />
          </div>
          <SparklesCore particleDensity={25} overscanY={220} />
        </div>
      </article>
      <section className="bottom-[7%] absolute inset-x-0 lg:flex lg:flex-row lg:justify-center justify-items-stretch items-stretch gap-5 lg:gap-10 grid grid-cols-2 auto-rows-fr m-auto px-[3%] lg:px-[10vw] w-full lg:w-fit md:max-w-[70vw] lg:max-w-max lg:max-h-10">
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
      <div className="z-20 absolute inset-0 bg-[#2bb4c8]/ opacity-0 pointer-events-none flash-effect mix-blend-overlay" />

      {/* --- PARTÍCULAS: ESTRELLAS CON GLOW --- */}
      {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={addParticleRef}
          className="z-10 absolute pointer-events-none"
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
        className="top-[15%] z-30 absolute lg:inset-0 opacity-0 m-auto w-fit h-fit lg:h-full pointer-events-none"
      >
        <div className="relative w-[80vw] md:min-w-[35vw] md:max-w-175 xl:max-w-48 aspect-video">
          <div className="absolute inset-0 bg-[#2bb4c8]/30 opacity-40 blur-[80px] rounded-full animate-pulse" />

          <svg
            viewBox="0 8 137 161"
            version="1.1"
            id="svg1"
            className="absolute drop-shadow-2xl w-full h-8/12 object-contain overflow-visible"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <mask id="myMask">
                <path
                  stroke="white"
                  fill="none"
                  strokeWidth="12"
                  id="mask1"
                  fillRule="evenodd"
                  transform="scale( -1) translate(0, -16.5)"
                  style={{
                    transformOrigin: "center", // Keeps the flip centered
                  }}
                >
                  <animate
                    attributeName="d"
                    fill="freeze"
                    values="
                M51,101 l-0,0 h0 l-0,-0 h0 l-0,0;
                M51,101 l-32,62.5 h0 l-0,-0 h0 l-0,0;
                M51,101 l-32,62.5 h98.5 l-0,-0 h0 l-0,0;
                M51,101 l-32,62.5 h98.5 l-64.5,-127 h0 l-0,0;
                M51,101 l-32,62.5 h98.5 l-64.5,-127 h31 l-0,0;
                M51,101 l-32,62.5 h98.5 l-64.5,-127 h31 l-16,31.25"
                    dur="1s"
                    repeatCount="1"
                    begin="2s"
                  />
                </path>
                <path
                  stroke="white"
                  fill="none"
                  strokeWidth="11"
                  id="mask1"
                  fillRule="evenodd"
                >
                  <animate
                    attributeName="d"
                    fill="freeze"
                    values="
                M51,101 l-0,0 h0 l-0,-0 h0 l-0,0;
                M51,101 l-32,62.5 h0 l-0,-0 h0 l-0,0;
                M51,101 l-32,62.5 h98.5 l-0,-0 h0 l-0,0;
                M51,101 l-32,62.5 h98.5 l-64.5,-127 h0 l-0,0;
                M51,101 l-32,62.5 h98.5 l-64.5,-127 h31 l-0,0;
                M51,101 l-32,62.5 h98.5 l-64.5,-127 h31 l-16,31.25"
                    dur="1s"
                    repeatCount="1"
                    begin="2s"
                  />
                </path>
              </mask>
            </defs>
            <path
              id="path1"
              fill="#FFFFFF"
              fillRule="evenodd"
              mask="url(#myMask)"
              d="M90.397491,79.616632L84.587923,67.873934L108.73301,20L27.767925,20L92.509717,147L44.105423,147L62.553877,111.15878L10.098613,8L126.51586,8ZM61.374062,136L68.329066,122.84023L75.056955,136Z"
            />

            <path
              strokeWidth="2"
              id="path2"
              fill="#FFF"
              fillRule="evenodd"
              mask="url(#myMask)"
              d="M46.211184,98.750105 L52.124625,110.11708 L27.610911,158L108.83935,158L44.193478,31L92.161597,31L74.104795,67.126366L126.35093,169L10.254605,169ZM68.308275,55.497204L61.74321,42L74.954792,42Z"
            />
          </svg>
          <Image
            src="/assets/branding/innav-logo-v.png"
            alt="Innavanti Logo"
            fill
            className="drop-shadow-2xl object-contain"
            priority
            style={{
              clipPath: "polygon(0% 66%, 100% 66%, 100% 100%, 0% 100%)",
            }}
          />
        </div>
      </div>

      {/* --- UI CONTENT --- */}
      {animationComplete && (
        <div className="z-10 absolute inset-0 flex flex-col items-center gap-4 m-auto px-4 text-center">
          <HeroAnimated />
        </div>
      )}
    </section>
  );
};

export const HomeButton = ({
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
      <div className="group z-30 relative bg-white/20 backdrop-blur-xs rounded-full outline outline-white/10 hover:outline-primary-1-500 w-full lg:min-w-56 h-full transition-all duration-300 cursor-pointer">
        {/* Gradient Border Layer */}
        {/* <div
          className="hidden absolute inset-0 p-0.5 rounded-full"
          style={{
            background: "linear-gradient(to bottom, #00A6F4, #615FFF)",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        /> */}

        <Link
          className="lg:hidden relative flex justify-center items-center gap-2 px-3 py-3 rounded-full w-full h-full overflow-hidden not-visited:text-white"
          href={hrefMobile}
        >
          <div>{icon}</div>
          <p className="relative w-fit h-fit font-bold text-white text-sm uppercase transition-colors duration-300">
            {title}
          </p>
        </Link>
        <Link
          className="hidden relative lg:flex flex-row justify-center items-center gap-2 px-4 py-2 rounded-full w-full overflow-hidden text-white"
          href={href}
        >
          {icon}
          <p className="relative font-bold text-white text-sm uppercase transition-colors duration-300">
            {title}
          </p>
        </Link>
      </div>
    </>
  );
};

export default NewHeroWithLogo;
