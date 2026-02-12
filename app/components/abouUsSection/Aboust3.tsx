"use client";
import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

// Datos
const Sections = [
  {
    id: "01",
    title: "MISIÓN",
    subtitle: "El Propósito",
    description:
      "Decodificamos la complejidad del presente para programar el éxito de nuestros clientes, construyendo arquitecturas digitales que no solo funcionan, sino que evolucionan.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop", // Tech abstract
  },
  {
    id: "02",
    title: "VISIÓN",
    subtitle: "El Horizonte",
    description:
      "Visualizamos un ecosistema donde la barrera entre la idea y la ejecución técnica es inexistente. Queremos ser el motor invisible que impulsa una sociedad más justa, conectada y eficiente.",
    image:
      "https://images.unsplash.com/photo-1480072723304-5021e468de85?q=80&w=1200&auto=format&fit=crop", // Lights/City
  },
  {
    id: "03",
    title: "VALORES",
    subtitle: "El Código",
    description:
      "Innovación radical. Precisión quirúrgica. Responsabilidad humana. No escribimos código por escribir; creamos soluciones con ética, transparencia y una obsesión por la excelencia.",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop", // Cyberpunk vibe
  },
];

export const AboutDisruptive = () => {
  return (
    <div className="bg-[#0b1120] text-white">
      {/* Intro Header */}
      <div className="h-[40vh] flex flex-col justify-center items-center text-center px-4">
        <p className="text-[#2bb6c8] font-mono text-sm tracking-[0.4em] mb-4 uppercase">
          System.Init()
        </p>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
          NUESTRO{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2bb6c8] to-purple-500">
            ADN
          </span>
        </h1>
      </div>

      {/* Stack Container */}
      <div className="relative pb-20">
        {Sections.map((section, index) => (
          <CardStack
            key={index}
            data={section}
            index={index}
            total={Sections.length}
          />
        ))}
      </div>

      <div className="h-[20vh] flex justify-center items-center">
        <p className="text-slate-500 font-mono text-xs">/// END OF STREAM</p>
      </div>
    </div>
  );
};

const CardStack = ({
  data,
  index,
  total,
}: {
  data: any;
  index: number;
  total: number;
}) => {
  const containerRef = useRef(null);

  // Parallax Logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  // Transformaciones suaves
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 1]);

  return (
    // Sticky Trick: 'top-0' hace que se peguen arriba uno sobre otro
    <div
      ref={containerRef}
      className="sticky top-0 h-screen flex items-center justify-center p-4 md:p-10 overflow-hidden"
      style={{ zIndex: index + 1 }} // Asegura el orden de apilamiento
    >
      <motion.div
        style={{ scale, opacity }}
        className="relative w-full max-w-6xl h-[70vh] md:h-[80vh] bg-[#0f172a] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row group"
      >
        {/* --- LADO IZQUIERDO: TEXTO --- */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between relative z-10 bg-[#0f172a]/90 backdrop-blur-sm">
          {/* Número Gigante de Fondo (Estilo Blueprint) */}
          <div className="absolute top-0 left-0 text-[12rem] md:text-[18rem] font-bold text-white/5 leading-none select-none pointer-events-none -translate-y-10 -translate-x-10 overflow-hidden">
            {data.id}
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#2bb6c8] animate-pulse"></span>
              <span className="text-[#2bb6c8] font-mono text-xs tracking-widest uppercase">
                {data.subtitle}
              </span>
            </div>

            {/* Título con efecto Scramble (Decoder) */}
            <h2 className="text-5xl md:text-7xl font-bold mb-8 uppercase tracking-tighter">
              <DecoderText text={data.title} />
            </h2>
          </div>

          <div className="border-l-2 border-[#2bb6c8] pl-6">
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light">
              {data.description}
            </p>
          </div>

          <div className="mt-8 font-mono text-xs text-slate-600">
            COORD: {Math.random().toFixed(4)} / {Math.random().toFixed(4)}
          </div>
        </div>

        {/* --- LADO DERECHO: IMAGEN VISUAL --- */}
        <div className="w-full md:w-1/2 relative h-full overflow-hidden">
          {/* Overlay gradiente */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent z-10 md:bg-gradient-to-l" />

          {/* Imagen con efecto hover */}
          <motion.img
            src={data.image}
            alt={data.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 grayscale group-hover:grayscale-0"
          />

          {/* Grid Decorativa estilo HUD */}
          <div className="absolute inset-0 z-20 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
          <div className="absolute bottom-10 right-10 z-20 border border-white/30 px-4 py-2 rounded-full backdrop-blur-md">
            <span className="text-xs text-white tracking-widest uppercase">
              Innavanti Labs
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- COMPONENTE DE EFECTO "DECODER" ---
// Efecto Matrix que cambia letras aleatoriamente hasta formar la palabra
const DecoderText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()";

  const scramble = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join(""),
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 3;
    }, 30);
  };

  return (
    <span
      onMouseEnter={scramble}
      className="cursor-default hover:text-[#2bb6c8] transition-colors duration-300"
    >
      {displayText}
    </span>
  );
};

export default AboutDisruptive;
