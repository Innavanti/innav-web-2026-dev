"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Texto a animar
const TEXT_PHRASE = "Toda solución, estamos para ti.";
const TEXT_BRAND = "INNAVANTI";

export default function HeroTypewriter() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Refs para almacenar los caracteres individuales
  const phraseCharsRef = useRef<HTMLSpanElement[]>([]);
  const brandCharsRef = useRef<HTMLSpanElement[]>([]);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Limpiamos referencias nulas por seguridad
      const validPhraseChars = phraseCharsRef.current.filter(
        (el): el is HTMLSpanElement => el !== null,
      );
      const validBrandChars = brandCharsRef.current.filter(
        (el): el is HTMLSpanElement => el !== null,
      );

      // --- CONFIGURACIÓN INICIAL ---
      // Frase: invisible, ligeramente abajo y con blur
      gsap.set(validPhraseChars, {
        opacity: 0,
        y: 20,
        filter: "blur(10px)",
      });

      // Marca: invisible, escalada (viene de enfrente) y con mucho blur
      gsap.set(validBrandChars, {
        opacity: 0,
        scale: 1.5,
        filter: "blur(20px)",
        y: 0,
      });

      // --- SECUENCIA DE ANIMACIÓN ---

      // 1. Aparición de la frase
      tl.to(validPhraseChars, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.8,
        stagger: 0.03, // Tiempo entre cada letra
        ease: "power2.out",
      })

        // 2. Pequeña pausa dramática y atenuación de la frase
        .to(
          validPhraseChars,
          {
            opacity: 0.5, // Se apaga un poco para dar foco al logo
            duration: 1,
            ease: "power2.inOut",
          },
          "+=0.2",
        )

        // 3. Entrada triunfal de INNAVANTI
        .to(
          validBrandChars,
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.2,
            stagger: 0.1, // Stagger más lento para mayor impacto
            ease: "expo.out", // Frenado suave elegante
          },
          "-=0.5",
        ); // Comienza antes de que termine la atenuación anterior
    },
    { scope: containerRef },
  );

  // Función helper para asignar refs
  const addToPhraseRefs = (el: HTMLSpanElement | null) => {
    if (el && !phraseCharsRef.current.includes(el)) {
      phraseCharsRef.current.push(el);
    }
  };

  const addToBrandRefs = (el: HTMLSpanElement | null) => {
    if (el && !brandCharsRef.current.includes(el)) {
      brandCharsRef.current.push(el);
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen flex flex-col items-center justify-center bg-slate-950 overflow-hidden"
    >
      {/* Fondo con degradado ambiental sutil (Vignette) */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-[#106788]/10 to-slate-950 z-0 pointer-events-none" />

      {/* Luz ambiental central (Spotlight) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#2bb4c8] rounded-full blur-[150px] opacity-10 pointer-events-none" />

      <div className="relative z-10 text-center px-4">
        {/* FRASE INICIAL */}
        <h2 className="text-2xl md:text-3xl font-light tracking-wide text-slate-200 mb-6 font-mono">
          {TEXT_PHRASE.split("").map((char, index) => (
            <span
              key={index}
              ref={addToPhraseRefs}
              className="inline-block whitespace-pre" // whitespace-pre respeta los espacios
            >
              {char}
            </span>
          ))}
        </h2>

        {/* NOMBRE DE MARCA */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter">
          {TEXT_BRAND.split("").map((char, index) => (
            <span
              key={index}
              ref={addToBrandRefs}
              className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-white to-[#2bb4c8]"
            >
              {char}
            </span>
          ))}
        </h1>
      </div>
    </section>
  );
}
