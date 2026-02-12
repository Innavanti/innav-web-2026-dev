"use client";

import SlideComponent from "./SlideComponent";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

export const SlideWrapper = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  const Services = [
    {
      title: "Desarrllo de Apps",
      image: "/assets/slides/desarrollo-apps.png",
      solution: {
        type: "Soluciones",
        title: "Desarrollo de Aplicaciones Móviles",
        descTitle: "SOLUCIONES CONFIABLES PARA OPERAR Y ESCALAR",
        desc: "Desarrollamos aplicaciones a la medida, alineadas a tus procesos de negocio y pensadas para funcionar de forma estable y crecer contigo.",
      },
    },
    {
      title: "Desarrollo web",
      image: "/assets/slides/desarollo-web.png",
      solution: {
        type: "Soluciones",
        title: "Desarrollo de plataformas web",
        descTitle: "Plataformas pensadas para operar con claridad y control",
        desc: "Desarrollamos plataformas web a la medida que organizan procesos, integran sistemas y permiten operar con control a medida que el negocio crece.",
      },
      href: "/",
    },
    {
      title: "DESARROLLO DE ASISTENTES VIRTUALES",
      image: "/assets/slides/asistentes.png",
      solution: {
        type: "Servicios",
        title: "Desarrollo de Asistentes Virtuales",
        descTitle: "Automatización conversacional con propósito.",
        desc: "Diseñamos chatbots que se integran a tus procesos para atender, automatizar y reducir carga operativa de forma controlada y eficiente.",
      },
      href: "/",
    },
    {
      title: "AUTOMATIZACIÓN TECNOLÓGICA PARA EMPRESAS",
      image: "/assets/slides/desarrollo-chatbots.png",
      solution: {
        type: "Soluciones",
        title: "Automatización Tecnológica para Empresas",
        descTitle: "Procesos más claros, eficientes y controlados.",
        desc: "Implementamos automatizaciones que conectan sistemas, reducen tareas manuales y mejoran la operación diaria de forma estable y eficiente.",
      },
    },
  ];

  // 🔹 motion value para el ÁNGULO del gradiente
  const angle = useMotionValue(120);
  const angleSmooth = useSpring(angle, { stiffness: 120, damping: 22 });

  const stepDeg = 90;
  const total = Services.length;

  useEffect(() => {
    let raf = 0;
    let lastIdx = -1;

    const update = () => {
      raf = 0;
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;

      const y = window.scrollY - sectionTop;
      const rawIndex = y / window.innerHeight;

      const idx = Math.max(0, Math.min(total - 1, Math.round(rawIndex)));

      if (idx !== lastIdx) {
        lastIdx = idx;
        angle.set(120 + idx * stepDeg); // 👈 rota el gradiente, no el div
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [angle, total]);

  return (
    <article ref={sectionRef} className="relative">
      {/* BACKGROUND overlay: NO ocupa layout */}
      <motion.div
        className="pointer-events-none sticky top-0 h-screen w-screen z-0"
        style={{ ["--bg-angle" as any]: angleSmooth }}
      >
        <div className="absolute inset-0 bg-rotating-gradient" />
      </motion.div>

      {/* SLIDES arriba */}
      <div className="relative z-10 -mt-[100vh]">
        {Services.map((service, i) => (
          <SlideComponent key={service.title ?? i} {...service} />
        ))}
      </div>
    </article>
  );
};

export default SlideWrapper;
