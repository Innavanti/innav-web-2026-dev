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
import {
  AnimatedBackground_Datacenter,
  AnimatedBackground_Desktop,
  AnimatedBackground_Phone,
  AnimatedBackground_PhoneNet,
} from "../components/animatedBackground/animatedBackground";

export default function Home() {
  const t = useTranslations("HomePage");

  const scrollRef = useRef<HTMLElement | null>(null);

  const Services = [
    {
      id: "apps",
      title: t("ServicesSection.Services.1.title"),
      // image: "/assets/slides/desarrollo-apps.png",
      animation: <AnimatedBackground_Phone />,
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
      // image: "/assets/slides/desarollo-web.png",
      animation: <AnimatedBackground_Desktop />,

      solution: {
        type: t("ServicesSection.Services.2.solution.type"),
        title: t("ServicesSection.Services.2.solution.title"),
        descTitle: t("ServicesSection.Services.2.solution.descTitle"),
        desc: t("ServicesSection.Services.2.solution.desc"),
      },
    },
    {
      id: "assistants",
      title: t("ServicesSection.Services.3.title"),
      // image: "/assets/slides/new-asistentes.png",
      animation: <AnimatedBackground_PhoneNet />,

      solution: {
        type: t("ServicesSection.Services.3.solution.type"),
        title: t("ServicesSection.Services.3.solution.title"),
        descTitle: t("ServicesSection.Services.3.solution.descTitle"),
        desc: t("ServicesSection.Services.3.solution.desc"),
      },
    },
    {
      id: "automation",
      title: t("ServicesSection.Services.4.title"),
      // image: "/assets/slides/desarrollo-chatbots.png",
      animation: <AnimatedBackground_Datacenter />,
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
      className="h-screen overflow-y-auto scroll-smooth snap-mandatory snap-y"
    >
      <GlobalBackground scrollRef={scrollRef}>
        {/* Cada sección snappea */}
        <section className="relative snap-start">
          <NewHeroWithLogo />
        </section>

        <section className="snap-start">
          <ContextComp scrollContainerRef={scrollRef} />
        </section>

        {Services.map((service) => {
          const { id, ...rest } = service;

          return (
            <section key={id} className="h-screen snap-start">
              <SlideComponent id={id} scrollRef={scrollRef} {...rest} />
            </section>
          );
        })}

        <section className="h-screen snap-start">
          <PropuestaValor />
        </section>
        <section className="lg:h-screen snap-start">
          <ProcesoComp />
        </section>

        <section className="h-screen snap-start">
          <Casos />
        </section>

        <section className="lg:h-screen snap-start">
          <Form3 />
        </section>
      </GlobalBackground>
    </main>
  );
}
