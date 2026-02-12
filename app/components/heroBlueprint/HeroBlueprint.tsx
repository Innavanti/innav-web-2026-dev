"use client";

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const HeroBlueprint = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-innavanti-dark flex items-center justify-center">
      {/* --- CAPA 1: FONDO SVG ANIMADO (Las líneas del isotipo) --- */}
      <div className="absolute inset-0 z-0 opacity-20 animate-blueprint-flow pointer-events-none hidden">
        {/* Usamos un viewBox grande para permitir que las líneas crucen toda la pantalla */}
        <svg
          viewBox="0 0 1200 800"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-innavanti-accent"
          >
            {/* Estas rutas imitan la estructura de tu logo:
              Líneas paralelas largas con ángulos agudos que se cruzan.
            */}
            {/* Grupo 1: Diagonales principales (de arriba-izq a abajo-der) */}
            <path d="M-100 200 L400 700 L900 200" />
            <path d="M-50 150 L450 650 L950 150" /> {/* Línea paralela */}
            {/* Grupo 2: Diagonales cruzadas (formando el reloj de arena) */}
            <path d="M1300 200 L800 700 L300 200" />
            <path d="M1250 150 L750 650 L250 150" /> {/* Línea paralela */}
            {/* Grupo 3: Líneas de "conexión" que extienden el blueprint */}
            <path d="M400 700 L400 1000" strokeDasharray="10 5" />{" "}
            {/* Línea vertical punteada */}
            <path d="M800 700 L800 1000" strokeDasharray="10 5" />
            <path
              d="M-200 450 L1400 450"
              strokeWidth="0.5"
              opacity="0.5"
            />{" "}
            {/* Horizonte sutil */}
          </g>

          {/* Un pequeño destello sutil en el centro donde se cruzan las líneas */}
          <circle
            cx="600"
            cy="450"
            r="100"
            fill="url(#glow-gradient)"
            opacity="0.3"
          />
          <defs>
            <radialGradient id="glow-gradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#2BC8D6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0B4F64" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      <BlueprintBackground />

      {/* --- CAPA 2: UN DEGRADADO SUTIL PARA DAR PROFUNDIDAD --- */}
      <div className="absolute inset-0 z-5 bg-linear-to-t from-innavanti-dark via-transparent to-innavanti-dark/50 pointer-events-none"></div>

      {/* --- CAPA 3: CONTENIDO DEL HERO --- */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 text-center md:text-left flex justify-between items-center">
        <div className="max-w-3xl">
          {/* Un pequeño eyebrow text usando el color acento */}
          <p className="text-innavanti-accent font-mono uppercase tracking-widest mb-4 text-sm font-semibold">
            Innovación Empresarial
          </p>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Construimos el futuro <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-innavanti-accent">
              con precisión.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-innavanti-light mb-10 max-w-xl">
            Avanzamos conectando ideas complejas con soluciones tecnológicas
            sólidas.
          </p>

          {/* Botón con estilo angular que hace eco al logo */}
          <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
            <button className="group relative px-8 py-4 bg-innavanti-accent text-innavanti-dark font-bold overflow-hidden transition-all hover:bg-white hover:text-primary-2-900 hover:shadow-[0_0_20px_rgba(43,200,214,0.5)] skew-x-[-10deg]">
              <span className="inline-block skew-x-10">Comenzar Proyecto</span>
              {/* Pequeña línea decorativa en el botón */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            </button>

            <button className="px-8 py-4 text-white border border-innavanti-accent/30 hover:border-innavanti-accent font-semibold transition-all skew-x-[-10deg]">
              <span className="inline-block skew-x-10">Nuestros Servicios</span>
            </button>
          </div>
        </div>
        <RhombusGallery images={sampleImages} />
      </div>
    </section>
  );
};

// Ejemplo de lista de URLs (puedes reemplazar esto con tus props)
const sampleImages = [
  "/assets/placeholders/laptop.jpg",
  "/assets/placeholders/chat.jpg",
  "/assets/placeholders/app.jpg",
];

const RhombusGallery = ({ images = sampleImages, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  // --- CORRECCIÓN AQUÍ ---
  // 1. El PADRE (Rojo): Solo necesita el skew (y overflow-hidden).
  // 2. El HIJO (Amarillo): Necesita el contra-skew Y UNA ESCALA MAYOR (scale-125 o 130).
  // Al aumentar la escala del hijo, forzamos a que el rectángulo amarillo cubra las esquinas rojas.

  const parentSkew = "-skew-x-[15deg]";
  // Aumentamos scale-125 (125%) para asegurar que tape las esquinas rojas
  const childUnSkew = "skew-x-[15deg] scale-[135%] ";

  return (
    /* 1. CONTENEDOR PRINCIPAL */
    <div className="relative w-1/3 aspect-square m-8 group ">
      {/* 2. EL ROMBOIDE (PADRE / ROJO) */}
      <div
        className={`absolute inset-0 h-full w-full overflow-hidden rounded-xl bg-red-500 border-4 border-white shadow-2xl transform-gpu transition-all duration-300 group-hover:scale-105 ${parentSkew}`}
      >
        {/* 3. EL CONTENEDOR DE IMÁGENES (HIJO / AMARILLO) */}
        {/* Aquí aplicamos el 'childUnSkew' que incluye el scale-125 */}
        <div
          className={`relative h-full w-full transform-gpu bg-yellow-300 flex items-center justify-center ${childUnSkew}`}
        >
          {images.map((url, index) => (
            <div
              key={url + index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <Image
                src={url}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-innavanti-dark/10 mix-blend-multiply"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicadores... */}
      <div className="absolute -bottom-6 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? "bg-innavanti-accent w-4" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export const BlueprintBackground = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Animaciones embebidas para no depender del global */}
      <style>{`
        @keyframes blueprint-flow {
          0% { transform: translate(0%, 0%) scale(1); }
          50% { transform: translate(-3%, -2%) scale(1.02); }
          100% { transform: translate(0%, 0%) scale(1); }
        }

        @keyframes glow-pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.22;
          }
          50% {
            transform: scale(1.15);
            opacity: 0.38;
          }
        }

        @keyframes scan-line {
          from { stroke-dashoffset: 900; }
          to { stroke-dashoffset: 0; }
        }

        .animate-blueprint-flow {
          animation: blueprint-flow 38s ease-in-out infinite;
          will-change: transform;
        }

        .animate-glow-pulse {
          transform-origin: center;
          animation: glow-pulse 6s ease-in-out infinite;
        }

        .animate-scan-line {
          animation: scan-line 7s linear infinite;
          opacity: 0.55;
        }
      `}</style>

      <div className="absolute inset-0 opacity-20 animate-blueprint-flow">
        <svg
          viewBox="0 0 1200 800"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Glow central */}
            <radialGradient id="glow-gradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#2BC8D6" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#0B4F64" stopOpacity="0" />
            </radialGradient>

            {/* Scan gradient */}
            <linearGradient id="scan-gradient" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#2BC8D6" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>

          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-innavanti-accent"
          >
            {/* Diagonales principales */}
            <path d="M-100 200 L400 700 L900 200" />
            <path d="M-50 150 L450 650 L950 150" />

            {/* Diagonales cruzadas */}
            <path d="M1300 200 L800 700 L300 200" />
            <path d="M1250 150 L750 650 L250 150" />

            {/* Conexiones */}
            <path d="M400 700 L400 1000" strokeDasharray="10 5" />
            <path d="M800 700 L800 1000" strokeDasharray="10 5" />
            <path d="M-200 450 L1400 450" strokeWidth="0.5" opacity="0.5" />
          </g>

          {/* Scan line animada */}
          <path
            d="M-100 200 L400 700 L900 200"
            stroke="url(#scan-gradient)"
            strokeWidth="2"
            strokeDasharray="140 800"
            className="animate-scan-line"
          />

          {/* Glow central */}
          <circle
            cx="600"
            cy="450"
            r="120"
            fill="url(#glow-gradient)"
            className="animate-glow-pulse"
          />
        </svg>
      </div>
    </div>
  );
};

export default HeroBlueprint;
