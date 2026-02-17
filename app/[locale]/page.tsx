"use client";
import { useTranslations } from "next-intl";
import ContextComp from "../components/contextComp/ContextComp";
import PropuestaValor from "../components/propuestaValor/PropuestaValor";
import ProcesoComp from "../components/procesoComp/ProcesoComp";
import Casos from "../components/casos/Casos";
import { GlobalBackground } from "../components/ui/globalBackground/GlobalBackground";
import SlideComponent from "../components/slideComponent/SlideComponent";
import Form3 from "../components/form/Form3";
import { useRef } from "react";
import NewHeroWithLogo from "../components/hero/Hero11";

export default function Home() {
  const t = useTranslations("HomePage");

  const scrollRef = useRef<HTMLElement | null>(null);

  const Services = [
    {
      id: "apps",
      title: t("ServicesSection.Services.1.title"),
      solution: {
        type: t("ServicesSection.Services.1.solution.type"),
        title: t("ServicesSection.Services.1.solution.title"),
        descTitle: t("ServicesSection.Services.1.solution.descTitle"),
        desc: t("ServicesSection.Services.1.solution.desc"),
      },
    },
    {
      id: "web",
      title: t("ServicesSection.Services.2.title"),
      image: "/assets/slides/pc/pc_animacion_",
      solution: {
        type: t("ServicesSection.Services.2.solution.type"),
        title: t("ServicesSection.Services.2.solution.title"),
        descTitle: t("ServicesSection.Services.2.solution.descTitle"),
        desc: t("ServicesSection.Services.2.solution.desc"),
      },
      href: "/",
    },
    {
      id: "assistants",
      title: t("ServicesSection.Services.3.title"),
      solution: {
        type: t("ServicesSection.Services.3.solution.type"),
        title: t("ServicesSection.Services.3.solution.title"),
        descTitle: t("ServicesSection.Services.3.solution.descTitle"),
        desc: t("ServicesSection.Services.3.solution.desc"),
      },
      href: "/",
    },
    {
      id: "automation",
      title: t("ServicesSection.Services.4.title"),
      solution: {
        type: t("ServicesSection.Services.4.solution.type"),
        title: t("ServicesSection.Services.4.solution.title"),
        descTitle: t("ServicesSection.Services.4.solution.descTitle"),
        desc: t("ServicesSection.Services.4.solution.desc"),
      },
    },
  ];
  return (
    <main
      ref={scrollRef}
      id="scroll-root"
      className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth"
    >
      <GlobalBackground scrollRef={scrollRef}>
        {/* Cada sección snappea */}
        <section className="snap-start relative">
          <NewHeroWithLogo />
        </section>

        <section className="snap-start">
          <ContextComp scrollContainerRef={scrollRef} />
        </section>

        {Services.map((service) => {
          const { id, ...rest } = service;

          return (
            <section key={id} className="snap-start h-screen">
              <SlideComponent id={id} scrollRef={scrollRef} {...rest} />
            </section>
          );
        })}

        <section className="snap-start h-screen">
          <PropuestaValor />
        </section>
        <section className="snap-start lg:h-screen">
          <ProcesoComp />
        </section>

        <section className="snap-start h-screen">
          <Casos />
        </section>

        <section className="snap-start lg:h-screen">
          <Form3 />
        </section>
      </GlobalBackground>
    </main>
  );
}
