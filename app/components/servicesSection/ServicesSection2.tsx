"use client";
import Link from "next/link";
import {
  FiGlobe,
  FiMessageSquare,
  FiRepeat,
  FiSmartphone,
  FiArrowUpRight,
} from "react-icons/fi";

// Definimos los servicios (igual que antes)
export const Services = [
  {
    title: "Sitios Web",
    description:
      "Arquitectura web moderna, optimizada para velocidad y conversión.",
    href: "/servicios/web",
    icon: <FiGlobe className="w-8 h-8" />,
  },
  {
    title: "Chatbots IA",
    description: "Asistentes inteligentes que automatizan la atención 24/7.",
    href: "/servicios/chatbots",
    icon: <FiMessageSquare className="w-8 h-8" />,
  },
  {
    title: "Automatización",
    description:
      "Sistemas que eliminan tareas repetitivas y escalan tu productividad.",
    href: "/servicios/automatizacion",
    icon: <FiRepeat className="w-8 h-8" />,
  },
  {
    title: "Apps Nativas",
    description:
      "Experiencias móviles fluidas diseñadas para el ecosistema actual.",
    href: "/servicios/apps",
    icon: <FiSmartphone className="w-8 h-8" />,
  },
];

export const ServicesSection2 = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Fondo decorativo sutil (Líneas del isotipo) */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-innavanti-dark transform -skew-x-[15deg]"></div>
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-innavanti-dark transform -skew-x-[15deg]"></div>
      </div>

      <div className="z-10 text-center mb-16 max-w-2xl">
        <h2 className="text-sm font-bold tracking-[0.2em] text-cyan-600 uppercase mb-3">
          Nuestras Soluciones
        </h2>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
          Tecnología que impulsa <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0e5f76] to-[#2bb6c8]">
            el siguiente paso.
          </span>
        </h1>
        <p className="text-slate-600">
          Diseñamos la infraestructura digital que tu empresa necesita para
          escalar.
        </p>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl z-10">
        {Services.map((item, index) => (
          <TechCard key={index} {...item} index={index} />
        ))}
      </section>
    </div>
  );
};

// --- EL NUEVO COMPONENTE DE TARJETA ---
type TechCardProps = {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  index: number;
};

const TechCard = ({ title, description, href, icon, index }: TechCardProps) => {
  return (
    <Link href={href} className="group relative block h-[320px] w-full">
      {/* CONTENEDOR PRINCIPAL 
        Usamos 'overflow-hidden' para contener la animación diagonal.
        Bordes finos para sensación técnica.
      */}
      <div className="relative h-full w-full overflow-hidden border border-slate-200 bg-white transition-all duration-300 hover:shadow-2xl hover:border-[#2bb6c8]/50 hover:-translate-y-1">
        {/* 1. FONDO DE RELLENO DIAGONAL (El toque Innavanti)
          Este div está oculto abajo y rotado. Al hacer hover, sube y cubre todo.
          Simula el llenado del reloj de arena o un barrido rápido.
        */}
        <div className="absolute inset-0 bg-[#0e5f76] translate-y-full skew-y-12 transition-transform duration-500 ease-out origin-bottom-left group-hover:translate-y-0 group-hover:skew-y-0"></div>

        {/* 2. DECORACIÓN GEOMÉTRICA (Línea de esquina) 
          Un pequeño triángulo en la esquina superior derecha que cambia de color.
        */}
        <div className="absolute top-0 right-0 p-4 opacity-100 transition-colors duration-300 group-hover:text-white text-slate-300">
          <FiArrowUpRight className="w-6 h-6 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </div>

        {/* 3. CONTENIDO 
          Usamos 'relative z-10' para que esté encima del fondo azul cuando suba.
        */}
        <div className="relative z-10 flex h-full flex-col justify-between p-8">
          {/* Parte Superior: Icono y Título */}
          <div>
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-sm bg-slate-50 text-[#0e5f76] transition-colors duration-300 group-hover:bg-white/10 group-hover:text-[#2bb6c8]">
              {icon}
            </div>

            <h3 className="text-2xl font-bold text-slate-800 transition-colors duration-300 group-hover:text-white">
              {title}
            </h3>

            {/* Línea decorativa que crece */}
            <div className="mt-4 h-[2px] w-12 bg-[#2bb6c8] transition-all duration-500 group-hover:w-full group-hover:bg-white/30"></div>
          </div>

          {/* Parte Inferior: Descripción */}
          <div>
            <p className="text-sm leading-relaxed text-slate-500 transition-colors duration-300 group-hover:text-slate-200">
              {description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ServicesSection2;
