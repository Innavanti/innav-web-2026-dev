"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";

const List = [
  {
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000", // Oficina/Arquitectura
    title: "Nuestra Misión",
    description:
      "Brindar soluciones innovadoras y sostenibles que impulsen el crecimiento y el éxito de nuestros clientes.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000", // Equipo/Valores
    title: "Nuestros Valores",
    description:
      "Innovación, creatividad, excelencia y responsabilidad. Compromiso total con la calidad y nuestra comunidad.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000", // Rascacielos/Visión
    title: "Nuestra Visión",
    description:
      "Crear un mundo más justo, seguro y sostenible mediante tecnología que promueva la igualdad de oportunidades.",
  },
];

export const AboutUsSection2 = () => {
  // const t = useTranslations("HomePage.AboutUsSection");
  // (Comentado para que funcione el copy-paste, descoméntalo en tu código)

  // Estado para controlar qué panel está expandido (por defecto el del centro: 1)
  const [activeIndex, setActiveIndex] = useState<number>(1);

  return (
    <section className="w-full min-h-[85vh] bg-slate-50 flex flex-col items-center justify-center py-20 px-4 overflow-hidden relative">
      {/* Fondo decorativo técnico */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-slate-200 skew-x-[-15deg]"></div>
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-slate-200 skew-x-[-15deg]"></div>
      </div>

      <div className="z-10 mb-12 text-center">
        <h2 className="text-sm font-bold tracking-[0.3em] text-[#0e5f76] uppercase mb-2">
          La Esencia
        </h2>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
          Nosotros <span className="text-[#2bb6c8]">.</span>
        </h1>
      </div>

      {/* CONTENEDOR PRINCIPAL (El Prisma) */}
      <div className="flex flex-col lg:flex-row w-full max-w-6xl h-[600px] shadow-2xl shadow-slate-200/50 rounded-xl overflow-hidden bg-white">
        {List.map((item, index) => (
          <Panel
            key={index}
            index={index}
            item={item}
            isActive={activeIndex === index}
            onHover={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </section>
  );
};

// --- COMPONENTE DE PANEL INDIVIDUAL ---
const Panel = ({ item, isActive, onHover, index }: any) => {
  return (
    <div
      onMouseEnter={onHover}
      className={`
        relative 
        h-full 
        transition-all 
        duration-700 
        ease-[cubic-bezier(0.25,1,0.5,1)] 
        cursor-pointer 
        overflow-hidden
        border-r border-white/20
        group
        
        /* LÓGICA DE EXPANSIÓN */
        ${isActive ? "flex-[3] lg:flex-[3]" : "flex-[1] lg:flex-[1]"}
        
        /* En móvil apilamos, en desktop expandimos */
        w-full lg:w-auto
      `}
    >
      {/* 1. IMAGEN DE FONDO */}
      <div className="absolute inset-0 w-full h-full">
        {/* Capa de color base (Azul oscuro) */}
        <div
          className={`absolute inset-0 bg-[#0e5f76] transition-opacity duration-500 ${isActive ? "opacity-0" : "opacity-60 z-10"}`}
        ></div>

        <img
          src={item.image}
          alt={item.title}
          className={`
            w-full h-full object-cover transition-transform duration-1000
            ${isActive ? "scale-110 grayscale-0" : "scale-100 grayscale"}
          `}
        />

        {/* Gradiente para legibilidad del texto */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e5f76]/90 via-[#0e5f76]/40 to-transparent opacity-90"></div>
      </div>

      {/* 2. EFECTO DECORATIVO "INNAVANTI" (Líneas diagonales) */}
      {/* Solo visible cuando está activo */}
      <div
        className={`absolute -top-full right-10 w-[20px] h-[200%] bg-[#2bb6c8]/20 transform skew-x-[-15deg] transition-all duration-700 delay-100 pointer-events-none
        ${isActive ? "top-[-50%]" : "-top-full"}`}
      />

      {/* 3. CONTENIDO DE TEXTO */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end items-start z-20">
        {/* Título: Gira 90 grados cuando está inactivo para ahorrar espacio (Solo Desktop) */}
        <div
          className={`transition-all duration-500 origin-bottom-left ${isActive ? "translate-y-0" : "translate-y-0 lg:-rotate-90 lg:translate-x-8 lg:-translate-y-8"}`}
        >
          <h2
            className={`text-2xl lg:text-3xl font-bold text-white uppercase tracking-wider whitespace-nowrap flex items-center gap-2`}
          >
            {isActive && (
              <span className="w-8 h-[2px] bg-[#2bb6c8] inline-block mb-1"></span>
            )}
            {item.title}
          </h2>
        </div>

        {/* Descripción: Solo visible si está activo */}
        <div
          className={`
            mt-4 overflow-hidden transition-all duration-500
            ${isActive ? "max-h-48 opacity-100 translate-y-0" : "max-h-0 opacity-0 translate-y-4"}
          `}
        >
          <p className="text-slate-200 text-sm md:text-base leading-relaxed max-w-md border-l-2 border-[#2bb6c8] pl-4">
            {item.description}
          </p>

          {/* Botón fantasma decorativo */}
          <div className="mt-6 flex items-center gap-2 text-[#2bb6c8] text-xs font-bold uppercase tracking-widest opacity-0 animate-fadeIn">
            Leer más <FiArrowUpRight size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsSection2;
