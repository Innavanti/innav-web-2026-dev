import { useTranslations } from "next-intl";
import Link from "next/link";
import {
  FiArrowUpRight,
  FiGlobe,
  FiMessageSquare,
  FiRepeat,
  FiSmartphone,
} from "react-icons/fi";
import { TextHoverEffect } from "../TextHoverEffect/text-hover-effect";

type TechCardProps = {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  index: number;
};

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

export const ServicesSection3 = () => {
  const t = useTranslations("HomePage.ServicesSection");
  return (
    <article
      id="services"
      className="w-screen h-full min-h-screen bg-black flex flex-col items-center justify-center gap-12"
    >
      <section className="text-center flex flex-col gap-0 bg-red-400 relative">
        {/* <h1 className="text-9xl font-bold uppercase text-transparent [-webkit-text-stroke:1px_white]">
          {t("title")}
        </h1> */}
        <div className="uppercase">
          <TextHoverEffect text={t("title")} />
        </div>
        <p className="text-white text-sm mt-2">{t("description")}</p>
      </section>
      <section className="w-full flex flex-wrap lg:flex-row gap-6 px-4 max-w-7xl">
        {Services.map((item, index) => (
          <TechCard key={index} {...item} index={index} />
        ))}
      </section>
    </article>
  );
};

const TechCard = ({ title, description, href, icon, index }: TechCardProps) => {
  return (
    <Link href={href} className="group relative block h-80 w-full ">
      {/* CONTENEDOR PRINCIPAL 
        Usamos 'overflow-hidden' para contener la animación diagonal.
        Bordes finos para sensación técnica.
      */}
      <div className="relative h-full w-full overflow-hidden border border-primary-2-500 rounded-lg bg-primary-2-500/50 transition-all duration-300 hover:shadow-2xl hover:border-[#2bb6c8]/50 hover:-translate-y-1">
        {/* 1. FONDO DE RELLENO DIAGONAL (El toque Innavanti)
          Este div está oculto abajo y rotado. Al hacer hover, sube y cubre todo.
          Simula el llenado del reloj de arena o un barrido rápido.
        */}
        <div className="absolute inset-0 bg-[#0e5f76] bg-linear-345 from-primary-1-500 to-primary-2-500  translate-y-full skew-y-12 transition-transform duration-500 ease-out origin-bottom-left group-hover:translate-y-0 group-hover:skew-y-0"></div>

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
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-sm bg-primary-2-500 text-white transition-colors duration-300 group-hover:bg-white/10 group-hover:text-[#2bb6c8]">
              {icon}
            </div>

            <h3 className="text-2xl font-bold text-white transition-colors duration-300 group-hover:text-white">
              {title}
            </h3>

            {/* Línea decorativa que crece */}
            <div className="mt-4 h-[2px] w-12 bg-linear-90 from-white/0 via-primary-1-500 to-primary-2-500 transition-all duration-500 group-hover:w-full group-hover:bg-white/30"></div>
          </div>

          {/* Parte Inferior: Descripción */}
          <div>
            <p className="text-sm leading-relaxed text-white transition-colors duration-300">
              {description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};
