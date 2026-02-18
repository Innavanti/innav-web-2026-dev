"use client";

import { useTranslations } from "next-intl";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HiOutlineCursorClick } from "react-icons/hi";
import { TbUnlink } from "react-icons/tb";
import { FiEyeOff, FiPhoneOff } from "react-icons/fi";

export const ContextComp = ({
  scrollContainerRef,
}: {
  scrollContainerRef: React.RefObject<HTMLElement | null>;
}) => {
  const t = useTranslations("ContextComp");
  const CardList = [
    {
      title: t("CardList.1.title"),
      icon: <HiOutlineCursorClick />,
    },
    {
      title: t("CardList.2.title"),
      icon: <TbUnlink />,
    },
    {
      title: t("CardList.3.title"),
      icon: <FiPhoneOff />,
    },
    {
      title: t("CardList.4.title"),
      icon: <FiEyeOff />,
    },
  ];

  const parentRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    container: scrollContainerRef,
    target: parentRef,
    offset: ["start start", "end end"],
  });
  const trackRef = useRef<HTMLDivElement | null>(null);

  const screenHeight = CardList.length * 100;

  const x = useTransform(scrollYProgress, [0, 0.95], ["200vw", "-200vw"]);

  return (
    <main
      ref={parentRef}
      className="w-screen relative"
      style={{ height: `${screenHeight}vh` }}
    >
      <article className="w-screen  h-screen sticky top-0 flex flex-col lg:flex-row pt-20 pb-4 px-[5vw] lg:pt-20 lg:px-[10vw] text-start items-center justify-center text-white ">
        <div className="w-full h-fit flex flex-col lg:flex-row items-stretch justify-center gap-3 lg:gap-0 z-0">
          <section className="w-full flex items-center text-5xl lg:text-7xl pr-5 lg:leading-20">
            <h1>{t("text")}</h1>
          </section>

          <section className="lg:w-1/2 flex items-start lg:pl-10 text- lg:text-[20px] font-light lg:leading-8">
            <p>{t("subtext")}</p>
          </section>
        </div>
        <div className="w-full h-full relative lg:absolute overflow-x-hidden z-10">
          <motion.div
            ref={trackRef}
            // className="w-screen h-full lg:h-fit flex flex-row gap-20 justify-center lg:absolute bottom-[10%] left-0 m-auto items-center"
            className="w-screen h-full lg:h-fit flex flex-row gap-20 justify-center lg:absolute bottom-[10%] left-0 m-auto items-center"
            style={{ x }}
          >
            {CardList.map((card, index) => (
              <ContextCard key={index} {...card} />
            ))}
          </motion.div>
        </div>
      </article>
    </main>
  );
};

export const ContextCard = ({
  title,
  icon,
}: {
  title: string;
  icon: React.ReactNode;
}) => {
  return (
    <div
      className="
        relative
        outline outline-primary-1-400/40
        rounded-2xl p-5 gap-6
        bg-black/20
        backdrop-blur-sm
        w-auto h-full
        max-h-67.5 aspect-square
        items-center justify-center
        flex flex-col
        border border-white/10
        shadow-[0_8px_32px_rgba(0,0,0,0.35)]
      "
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-b from-white/10 to-transparent" />

      <div className="relative aspect-square w-14 outline bg-[#3EB0C8]/20 outline-primary-1-500 text-primary-1-500 rounded-lg flex items-center justify-center text-3xl">
        {icon}
      </div>

      <p className="relative text-white text-xl">{title}</p>
    </div>
  );
};

export default ContextComp;
