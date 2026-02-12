"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function HeroCinematic() {
  // 1. Tipado estricto de refs para elementos HTML
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);

  // 2. Ref para un array de elementos (las líneas de texto)
  const titleLinesRef = useRef<HTMLDivElement[]>([]);

  const bottomElementsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Verificación de seguridad (Type Guard)
      if (!contentWrapperRef.current || !bottomElementsRef.current) return;

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      // --- SETUP INICIAL (Cámara cerca y rotada) ---
      gsap.set(contentWrapperRef.current, {
        scale: 1.5, // Zoom in
        rotationX: 35, // Ángulo picado
        y: 80,
        opacity: 0,
        transformOrigin: "center center -400px", // Punto de fuga
      });

      // Ocultar texto inicialmente (debajo de su máscara)
      // Filtramos posibles nulos en el array de refs
      const validTitleLines = titleLinesRef.current.filter(
        (el): el is HTMLDivElement => el !== null,
      );
      gsap.set(validTitleLines, { y: "100%" });

      gsap.set(bottomElementsRef.current, { opacity: 0, y: 20 });

      // --- ANIMACIÓN CINEMÁTICA ---
      tl.to(contentWrapperRef.current, {
        duration: 2.2,
        scale: 1,
        rotationX: 0,
        y: 0,
        opacity: 1,
        force3D: true, // Optimización de hardware
      })
        .to(
          validTitleLines,
          {
            y: "0%",
            duration: 1.2,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=1.5",
        ) // Overlap para que el texto salga mientras la cámara se acomoda
        .to(
          bottomElementsRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
          },
          "-=0.8",
        );
    },
    { scope: mainContainerRef },
  );

  // 3. Callback Ref tipado correctamente para llenar el array
  const addToTitleRefs = (el: HTMLDivElement | null) => {
    if (el && !titleLinesRef.current.includes(el)) {
      titleLinesRef.current.push(el);
    }
  };

  return (
    <section
      ref={mainContainerRef}
      // Tailwind 4 soporta clases arbitrarias nativas. perspective-2000px crea la profundidad
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-slate-950 perspective-[2000px]"
    >
      {/* Fondo decorativo (Isotipo gigante) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none z-0">
        <div className="relative w-[70vw] h-[70vw] grayscale contrast-150">
          <Image
            src="/assets/branding/logo-innavanti-vertical-colorBco.png"
            alt="Background element"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Contenedor principal de la animación 3D */}
      <div
        ref={contentWrapperRef}
        className="container mx-auto px-6 md:px-12 relative z-10 transform-style-3d will-change-transform"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          {/* Columna Texto */}
          <div className="max-w-3xl order-2 lg:order-1">
            {/* Tagline */}
            <div className="overflow-hidden mb-8">
              <div ref={addToTitleRefs} className="inline-block">
                <span className="text-[#2bb4c8] font-mono text-sm tracking-[0.2em] uppercase">
                  // Future_Ready Systems
                </span>
              </div>
            </div>

            {/* Título Principal (Masked) */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tighter text-white mb-10">
              {/* Línea 1 */}
              <div className="overflow-hidden">
                <div ref={addToTitleRefs} className="pb-2">
                  Soluciones
                </div>
              </div>
              {/* Línea 2 */}
              <div className="overflow-hidden">
                <div ref={addToTitleRefs} className="pb-2">
                  tecnológicas
                </div>
              </div>
              {/* Línea 3 (Gradiente) */}
              <div className="overflow-hidden">
                <div
                  ref={addToTitleRefs}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#2bb4c8] to-[#106788] pb-2"
                >
                  inteligentes
                </div>
              </div>
            </h1>

            {/* Bloque inferior (Descripción + CTA) */}
            <div ref={bottomElementsRef} className="space-y-8 pl-1">
              <p className="text-lg md:text-xl text-slate-400 max-w-lg leading-relaxed border-l-2 border-[#2bb4c8]/20 pl-6">
                Expertos en chatbots, automatización y desarrollo de software a
                medida que escala con tu negocio.
              </p>

              <div className="flex flex-wrap gap-4 pt-2 pl-6">
                <button className="px-10 py-4 bg-white text-slate-950 font-bold text-sm tracking-wide uppercase rounded-sm hover:bg-[#2bb4c8] hover:text-white transition-colors duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                  Iniciar Proyecto
                </button>
                <button className="px-10 py-4 border border-slate-800 text-slate-400 font-bold text-sm tracking-wide uppercase rounded-sm hover:border-[#2bb4c8] hover:text-[#2bb4c8] transition-colors duration-300">
                  Nuestros Servicios
                </button>
              </div>
            </div>
          </div>

          {/* Columna Visual (Isotipo 3D) */}
          <div className="order-1 lg:order-2 flex-shrink-0 mb-10 lg:mb-0">
            <div className="relative w-[180px] h-[180px] md:w-[350px] md:h-[350px]">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-[#2bb4c8] blur-[100px] opacity-20 rounded-full animate-pulse"></div>
              <Image
                src="/assets/branding/logo-innavanti-vertical-colorBco.png"
                alt="Innavanti Isotipo"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
