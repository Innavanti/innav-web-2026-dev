"use client";

import React, { useRef, useState, useMemo, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";

// Configuración de la red
const NODE_COUNT = 30; // Cantidad de puntos
const CONNECTION_DISTANCE = 250; // Distancia máxima para conectar puntos

// Tipos para nuestros datos generados
type Point = { x: number; y: number; id: number };
type Line = { p1: Point; p2: Point; id: string };

export default function HeroNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const [animationComplete, setAnimationComplete] = useState(false);

  // Estado para dimensiones de ventana (para evitar hidratación incorrecta en Next.js)
  const [dimensions, setDimensions] = useState({ width: 1000, height: 800 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  // Generación de Nodos y Líneas (Memoizado para no recalcular en renders)
  const { points, lines } = useMemo(() => {
    if (!isClient) return { points: [], lines: [] };

    const pts: Point[] = [];
    // Generar puntos aleatorios esparcidos
    for (let i = 0; i < NODE_COUNT; i++) {
      pts.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        id: i,
      });
    }

    const lns: Line[] = [];
    // Conectar puntos cercanos
    pts.forEach((p1, i) => {
      pts.slice(i + 1).forEach((p2) => {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONNECTION_DISTANCE) {
          lns.push({ p1, p2, id: `${p1.id}-${p2.id}` });
        }
      });
    });

    return { points: pts, lines: lns };
  }, [dimensions, isClient]);

  useGSAP(
    () => {
      if (!svgRef.current || !logoWrapperRef.current || lines.length === 0)
        return;

      const tl = gsap.timeline({
        onComplete: () => setAnimationComplete(true),
      });

      // --- FASE 1: DIBUJADO DE LÍNEAS (Drawing) ---
      // Las líneas están ocultas (strokeDashoffset: 1). Las animamos a 0.
      tl.set(".network-line", {
        strokeDasharray: 1,
        strokeDashoffset: 1,
        opacity: 0.4,
      });
      tl.set(".network-dot", { scale: 0, opacity: 0 });

      tl.to(".network-line", {
        strokeDashoffset: 0, // Esto hace que la línea "se dibuje"
        duration: 2,
        stagger: { amount: 1, from: "random" }, // Aparecen en orden aleatorio
        ease: "power2.inOut",
      });

      // --- FASE 2: APARICIÓN DE NODOS ---
      // Una vez trazadas las líneas, aparecen los puntos en las intersecciones
      tl.to(
        ".network-dot",
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: { amount: 0.5, from: "random" },
          ease: "back.out(2)",
        },
        "-=1",
      ); // Solapamos con el final del dibujado

      // Pausa breve para admirar la red construida
      tl.to({}, { duration: 0.5 });

      // --- FASE 3: IMPLOSIÓN (Succión al centro) ---
      // Toda la red viaja al centro y desaparece
      tl.to(svgRef.current, {
        scale: 0,
        opacity: 0,
        rotate: 45, // Un pequeño giro al colapsar
        duration: 1,
        ease: "expo.in",
        transformOrigin: "center center",
      });

      // --- FASE 4: EXPLOSIÓN DEL LOGO ---
      tl.fromTo(
        logoWrapperRef.current,
        { scale: 0, opacity: 0, filter: "blur(15px)" },
        {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "elastic.out(1, 0.5)",
        },
        "-=0.2", // Justo antes de que termine la implosión
      );
    },
    { scope: containerRef, dependencies: [lines] },
  ); // Ejecutar cuando las líneas estén listas

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-slate-950 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* SVG Container para la Red */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      >
        {lines.map((line) => (
          <line
            key={line.id}
            x1={line.p1.x}
            y1={line.p1.y}
            x2={line.p2.x}
            y2={line.p2.y}
            className="network-line"
            stroke="#2bb4c8"
            strokeWidth="1"
            pathLength="1" // TRUCO CLAVE para animar sin plugins
          />
        ))}
        {points.map((point) => (
          <circle
            key={point.id}
            cx={point.x}
            cy={point.y}
            r="3"
            className="network-dot"
            fill="#106788"
          />
        ))}
      </svg>

      {/* --- LOGO CENTRAL --- */}
      <div ref={logoWrapperRef} className="relative z-20 opacity-0 mb-8">
        <div className="relative w-45 h-45 md:w-62.5 md:h-62.5">
          {/* Resplandor */}
          <div className="absolute inset-0 bg-[#2bb4c8] blur-[80px] opacity-30 animate-pulse"></div>
          <Image
            src="/assets/branding/logo-innavanti-vertical-colorBco.png"
            alt="Innavanti Logo"
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>
      </div>

      {/* --- CONTENIDO DE TEXTO (Framer Motion) --- */}
      {/* Se renderiza condicionalmente o se anima su entrada tras la secuencia */}
      {animationComplete && (
        <div className="relative z-30 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
              Conectamos tu <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2bb4c8] to-[#106788]">
                Visión Digital
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-slate-400 mt-6 text-lg max-w-xl mx-auto"
          >
            Desde la primera línea de código hasta la automatización completa.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-8"
          >
            <button className="px-10 py-4 bg-[#2bb4c8] text-slate-950 font-bold rounded-lg shadow-[0_0_20px_rgba(43,180,200,0.4)] hover:shadow-[0_0_30px_rgba(43,180,200,0.6)] transition-all">
              Empezar Ahora
            </button>
          </motion.div>
        </div>
      )}

      {/* Vignette de fondo */}
      <div className="absolute inset-0 bg-[radial-gradient(transparent,rgba(2,6,23,0.9))] pointer-events-none z-0" />
    </section>
  );
}
