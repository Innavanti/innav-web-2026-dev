"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";

// Configuración de la cuadrícula
const COLS = 12; // Número de columnas (ajustable)
const ROWS = 8; // Número de filas (ajustable)
const TOTAL_CELLS = COLS * ROWS;

export default function HeroGridAssembly() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cellsRef = useRef<HTMLDivElement[]>([]);
  const logoRef = useRef<HTMLDivElement>(null);

  const [showContent, setShowContent] = useState(false);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        onComplete: () => setShowContent(true), // Activa el texto al terminar
      });

      const cells = cellsRef.current.filter((c) => c !== null);

      // --- FASE 1: COMPUTANDO EL CENTRO ---
      // Calculamos el centro aproximado de la pantalla para dirigir los cuadros allí
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      // --- FASE 2: PREPARACIÓN (IDLE) ---
      // Los cuadros aparecen sutilmente (efecto de encendido de sistema)
      tl.set(cells, { opacity: 0, scale: 0.8 });
      tl.to(cells, {
        opacity: 0.1, // Visibilidad base muy baja (gris oscuro)
        scale: 1,
        duration: 0.5,
        stagger: {
          grid: [ROWS, COLS],
          from: "center",
          amount: 0.5,
        },
      });

      // --- FASE 3: ACTIVACIÓN (La "Ola") ---
      // Seleccionamos aleatoriamente cuadros para que se iluminen en CIAN
      // y luego viajen al centro.
      tl.to(
        cells,
        {
          backgroundColor: "#2bb4c8", // Se vuelven cian
          opacity: 0.6,
          boxShadow: "0 0 15px #2bb4c8", // Glow
          scale: 0.9,
          duration: 0.5,
          stagger: {
            amount: 1,
            from: "edges", // Empieza desde afuera hacia adentro
            grid: [ROWS, COLS],
          },
          ease: "power2.in",
        },
        "-=0.2",
      );

      // --- FASE 4: CONVERGENCIA (Lo que pide Janette) ---
      // Todos los cuadros viajan al centro físico del contenedor
      // Usamos xPercent/yPercent no funcionaría bien aquí, mejor animar scale y opacity
      // simulando que entran en el "vórtice" central.

      tl.to(cells, {
        scale: 0, // Se encogen hasta desaparecer
        opacity: 0,
        rotation: 180, // Giran al entrar
        duration: 0.8,
        stagger: {
          amount: 0.4,
          from: "center", // Los del centro desaparecen primero para hacer espacio
          grid: [ROWS, COLS],
        },
        ease: "back.in(1.7)",
      });

      // --- FASE 5: REVELACIÓN DEL LOGO ---
      // El logo aparece justo cuando los cuadros colapsan
      if (logoRef.current) {
        tl.fromTo(
          logoRef.current,
          { scale: 0, rotation: -45, opacity: 0 },
          {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 1.2,
            ease: "elastic.out(1, 0.6)",
          },
          "-=0.6",
        );
      }

      // --- FASE 6: RESTAURACIÓN SUTIL (Fondo ambiental) ---
      // Restauramos algunos cuadros del fondo para que no quede negro vacío
      tl.to(cells, {
        scale: 1,
        opacity: 0.05, // Muy sutiles
        rotation: 0,
        backgroundColor: "transparent",
        boxShadow: "none",
        duration: 1,
        stagger: { amount: 1, from: "random" },
        delay: 0.5,
      });
    },
    { scope: containerRef },
  );

  const addCellRef = (el: HTMLDivElement | null) => {
    if (el && !cellsRef.current.includes(el)) {
      cellsRef.current.push(el);
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-slate-950 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* --- GRID BACKGROUND --- */}
      <div
        ref={gridRef}
        className="absolute inset-0 grid gap-1 w-full h-full pointer-events-none z-0"
        style={{
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
        }}
      >
        {Array.from({ length: TOTAL_CELLS }).map((_, i) => (
          <div
            key={i}
            ref={addCellRef}
            className="border border-slate-800/50 rounded-sm relative"
          >
            {/* Pequeño detalle tech dentro de cada cuadro */}
            <div className="absolute top-1 right-1 w-1 h-1 bg-slate-700/30 rounded-full" />
          </div>
        ))}
      </div>

      {/* --- LOGO CENTRAL --- */}
      <div ref={logoRef} className="relative z-20 mb-10 opacity-0">
        {/* Glow trasero fuerte */}
        <div className="absolute inset-0 bg-[#2bb4c8] blur-[100px] opacity-30 animate-pulse"></div>
        <div className="relative w-[180px] h-[180px] md:w-[250px] md:h-[250px]">
          <Image
            src="/assets/branding/logo-innavanti-vertical-colorBco.png"
            alt="Innavanti Logo"
            fill
            className="object-contain drop-shadow-[0_0_30px_rgba(43,180,200,0.4)]"
            priority
          />
        </div>
      </div>

      {/* --- CONTENIDO DE TEXTO (Framer Motion) --- */}
      {/* Aparece solo después de la secuencia de ensamblaje */}
      {showContent && (
        <div className="relative z-30 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6">
              Construimos el <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2bb4c8] to-[#106788]">
                siguiente nivel.
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
              Apps, automatización y desarrollo web diseñados pixel a pixel para
              escalar tu negocio.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <button className="px-8 py-4 bg-[#2bb4c8] hover:bg-[#259dad] text-slate-950 font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(43,180,200,0.3)] hover:shadow-[0_0_30px_rgba(43,180,200,0.5)]">
              Ver Portafolio
            </button>
            <button className="px-8 py-4 border border-slate-700 text-slate-300 rounded-lg hover:border-[#2bb4c8] hover:text-[#2bb4c8] transition-colors">
              Cotizar Proyecto
            </button>
          </motion.div>
        </div>
      )}

      {/* Vignette para cerrar visualmente los bordes */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.8)_100%)] pointer-events-none z-10" />
    </section>
  );
}
