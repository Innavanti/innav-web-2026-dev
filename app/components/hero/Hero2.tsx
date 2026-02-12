"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Hero() {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const textRef = useRef(null);

  // Colores extraídos aproximados para usar como variables o custom colors si quisieras
  // Primary: #2bb4c8 (Cian)
  // Secondary: #106788 (Azul Petróleo)

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // 1. Animación de Entrada (Intro)
      tl.from(containerRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      })
        .from(
          ".hero-text-element",
          {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "back.out(1.7)",
          },
          "-=0.5",
        )
        .from(
          logoRef.current,
          {
            scale: 0,
            rotation: -45,
            opacity: 0,
            duration: 1.5,
            ease: "elastic.out(1, 0.5)",
          },
          "-=1",
        );

      // 2. Animación Interactiva (Parallax con el mouse)
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 40; // Rango de movimiento
        const yPos = (clientY / window.innerHeight - 0.5) * 40;

        gsap.to(logoRef.current, {
          x: xPos,
          y: yPos,
          rotationY: xPos * 0.5, // Efecto 3D sutil
          rotationX: -yPos * 0.5,
          duration: 1,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 text-white"
    >
      {/* Fondo decorativo abstracto (Glows) */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#2bb4c8] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#106788] rounded-full mix-blend-screen filter blur-[140px] opacity-20" />

      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Columna Texto */}
        <div
          ref={textRef}
          className="order-2 lg:order-1 flex flex-col items-start space-y-6"
        >
          <div className="hero-text-element inline-block px-3 py-1 border border-[#2bb4c8]/30 rounded-full bg-[#2bb4c8]/10 backdrop-blur-sm">
            <span className="text-[#2bb4c8] text-sm font-medium tracking-wide uppercase">
              Innovación en movimiento
            </span>
          </div>

          <h1 className="hero-text-element text-5xl md:text-7xl font-bold leading-tight tracking-tight">
            El futuro de tu empresa <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2bb4c8] to-[#106788]">
              automatizado.
            </span>
          </h1>

          <p className="hero-text-element text-lg text-slate-400 max-w-lg leading-relaxed">
            Desarrollamos chatbots inteligentes, apps a medida y experiencias
            web que transforman visitantes en clientes.
          </p>

          <div className="hero-text-element pt-4 flex flex-col sm:flex-row gap-4">
            <button className="group relative px-8 py-4 bg-[#2bb4c8] text-slate-950 font-bold rounded-lg overflow-hidden transition-all hover:shadow-[0_0_20px_rgba(43,180,200,0.6)]">
              <span className="relative z-10">Iniciar Proyecto</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
            <button className="px-8 py-4 border border-slate-700 text-slate-300 rounded-lg hover:border-[#2bb4c8] hover:text-[#2bb4c8] transition-colors duration-300">
              Ver Servicios
            </button>
          </div>
        </div>

        {/* Columna Visual (Isotipo) */}
        <div className="order-1 lg:order-2 flex justify-center items-center perspective-1000">
          <div
            ref={logoRef}
            className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px]"
          >
            {/* Aquí va tu imagen del isotipo. Asegúrate de que esté recortada (png/webp transparente) */}
            <Image
              src="/assets/branding/logo-innavanti-vertical-colorBco.png"
              alt="Innavanti Isotipo"
              fill
              className="object-contain drop-shadow-[0_0_35px_rgba(43,180,200,0.4)]"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
