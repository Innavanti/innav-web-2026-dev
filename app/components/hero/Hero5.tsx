"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function HeroMystery() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Refs para los textos gigantes
  const textLayer1Ref = useRef<HTMLHeadingElement>(null);
  const textLayer2Ref = useRef<HTMLHeadingElement>(null);

  // Ref para el contenedor final de la marca
  const brandContainerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const brandNameRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      // Timeline principal
      const tl = gsap.timeline();

      // --- SETUP INICIAL ---
      // 1. Textos Gigantes: Invisibles, ligeramente escalados hacia abajo
      gsap.set([textLayer1Ref.current, textLayer2Ref.current], {
        opacity: 0,
        scale: 0.9,
        filter: "blur(10px)",
        y: 50,
      });

      // 2. Marca Final: Oculta, pequeña (lejos)
      gsap.set(brandContainerRef.current, {
        opacity: 0,
        pointerEvents: "none",
      });

      gsap.set(logoRef.current, { scale: 0, rotation: -90 });
      gsap.set(brandNameRef.current, { y: 20, opacity: 0 });

      // --- SECUENCIA ---

      // Paso 1: Aparición dramática de "Toda solución"
      if (textLayer1Ref.current) {
        tl.to(textLayer1Ref.current, {
          opacity: 0.15, // Mantenemos transparencia misteriosa
          scale: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 1.5,
          ease: "power3.out",
        });
      }

      // Paso 2: Aparición de "Estamos para ti" (superpuesto o secuencial)
      if (textLayer2Ref.current) {
        tl.to(
          textLayer2Ref.current,
          {
            opacity: 0.15,
            scale: 1,
            filter: "blur(0px)",
            y: 0,
            duration: 1.5,
            ease: "power3.out",
          },
          "-=0.8",
        ); // Solapamiento para fluidez
      }

      // Paso 3: "El Túnel" - Los textos gigantes se abren hacia la cámara
      tl.to(
        [textLayer1Ref.current, textLayer2Ref.current],
        {
          scale: 2, // Crecen mucho
          opacity: 0, // Se desvanecen
          filter: "blur(20px)", // Se desenfocan
          duration: 1.5,
          ease: "expo.in", // Aceleración para simular velocidad al final
        },
        "+=0.5",
      ); // Pequeña pausa para leer

      // Paso 4: Revelación de INNAVANTI
      if (
        brandContainerRef.current &&
        logoRef.current &&
        brandNameRef.current
      ) {
        tl.to(brandContainerRef.current, {
          opacity: 1,
          pointerEvents: "auto",
          duration: 0.1, // Cambio casi instantáneo de contenedor
        })
          .to(logoRef.current, {
            scale: 1,
            rotation: 0,
            duration: 1.2,
            ease: "elastic.out(1, 0.7)",
          })
          .to(
            brandNameRef.current,
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power2.out",
            },
            "-=0.8",
          );
      }
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center bg-slate-950 overflow-hidden"
    >
      {/* Luces volumétricas de fondo (Ambientales) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[40vw] h-[40vw] bg-[#106788] rounded-full blur-[150px] opacity-[0.08]" />
        <div className="absolute bottom-[-10%] right-[20%] w-[40vw] h-[40vw] bg-[#2bb4c8] rounded-full blur-[150px] opacity-[0.08]" />
      </div>

      {/* --- CAPA 1: TEXTOS GIGANTES (Intro) --- */}
      {/* Usamos absolute inset-0 para que se superpongan y dominen el centro */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 select-none">
        <h2
          ref={textLayer1Ref}
          className="text-[10vw] md:text-[12vw] font-black leading-none tracking-tighter text-white whitespace-nowrap mix-blend-overlay"
        >
          TODA SOLUCIÓN
        </h2>

        <h2
          ref={textLayer2Ref}
          className="text-[10vw] md:text-[12vw] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-800 whitespace-nowrap opacity-20"
        >
          ESTAMOS PARA TI
        </h2>
      </div>

      {/* --- CAPA 2: MARCA FINAL (Outro/Main) --- */}
      <div
        ref={brandContainerRef}
        className="relative z-20 flex flex-col items-center justify-center gap-8"
      >
        {/* Isotipo */}
        <div
          ref={logoRef}
          className="relative w-[120px] h-[120px] md:w-[180px] h-[180px]"
        >
          {/* Glow detrás del logo */}
          <div className="absolute inset-0 bg-[#2bb4c8] blur-[40px] opacity-40 rounded-full animate-pulse"></div>
          <Image
            src="/assets/branding/logo-innavanti-vertical-colorBco.png"
            alt="Innavanti Logo"
            fill
            className="object-contain drop-shadow-[0_0_15px_rgba(43,180,200,0.5)]"
            priority
          />
        </div>

        {/* Nombre de Marca */}
        <h1 ref={brandNameRef} className="text-center">
          <span className="block text-4xl md:text-6xl font-bold tracking-[0.2em] text-white">
            INNAVANTI
          </span>
          <span className="block mt-4 text-[#2bb4c8] text-sm md:text-base font-mono tracking-widest uppercase">
            Future_Ready Technology
          </span>
        </h1>

        {/* Botón CTA sutil que aparece al final */}
        <div className="mt-8 opacity-0 animate-[fadeIn_1s_ease-out_4s_forwards]">
          <button className="px-8 py-3 border border-[#2bb4c8]/30 hover:border-[#2bb4c8] text-slate-300 hover:text-white rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(43,180,200,0.2)] text-sm uppercase tracking-wide">
            Descubrir más
          </button>
        </div>
      </div>
    </section>
  );
}
