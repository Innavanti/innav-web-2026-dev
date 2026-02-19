"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { GlowingEffect } from "../glowingEffect/glowing-effect";
import { useTranslations } from "next-intl";

import { FaMagnifyingGlassChart } from "react-icons/fa6";
import { LuCompass, LuMonitorCheck } from "react-icons/lu";
import { BsFileEarmarkCode } from "react-icons/bs";
import { PiFlowArrowBold } from "react-icons/pi";

import { motion, useInView, useReducedMotion } from "framer-motion";

export const ProcesoComp = () => {
  const t = useTranslations("ProcesoComp");

  // viewport detection
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { amount: 0.35 });

  // auto spotlight
  const COUNT = 5;
  const INTERVAL_MS = 900;

  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const paused = hoverIndex !== null;

  const reducedMotion = useReducedMotion();

  // Auto-advance spotlight only while in view and not hovered
  useEffect(() => {
    if (!inView) return;

    // If reduced motion, don’t auto-cycle
    if (reducedMotion) return;

    if (paused) return;

    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % COUNT);
    }, INTERVAL_MS);

    return () => window.clearInterval(id);
  }, [inView, paused, reducedMotion]);

  // Which card is "spotlighted" right now:
  const spotlightIndex = hoverIndex ?? activeIndex;

  // nice stagger fade-in when section first becomes visible
  const containerVariants = useMemo(
    () => ({
      hidden: {},
      show: {
        transition: { staggerChildren: 0.08, delayChildren: 0.05 },
      },
    }),
    [],
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 12 },
      show: { opacity: 1, y: 0 },
    }),
    [],
  );

  return (
    <main
      ref={sectionRef}
      className="w-screen h-fit lg:h-full min-h-screen flex justify-center pt-24"
    >
      <article className="px-[10vw] flex flex-col items-center justify-center gap-5 lg:gap-10 h-full lg:h-auto">
        <div className="w-full h-fit flex flex-col lg:flex-row items-start justify-between gap-4 z-0">
          <h1 className="w-full lg:w-1/2 font-bold text-3xl lg:text-5xl">
            {t("title")}
          </h1>
          <p className="w-full max-w-80 font-light leading-5 lg:leading-7">
            {t("subtitle")}
          </p>
        </div>

        <motion.ul
          className="w-full h-fit lg:overflow-hidden p-1.5 grid grid-cols-1 grid-rows-none gap-3 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-136 xl:grid-rows-2 py-2"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          <GridItem
            index={0}
            spotlighted={spotlightIndex === 0}
            variants={itemVariants}
            area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
            icon={
              <FaMagnifyingGlassChart className="h-7 w-auto aspect-square text-primary-1-500" />
            }
            title={t("items.1.title")}
            description={t("items.1.desc")}
            number="01"
            onHoverChange={(v) => setHoverIndex(v ? 0 : null)}
          />

          <GridItem
            index={1}
            spotlighted={spotlightIndex === 1}
            variants={itemVariants}
            area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
            icon={
              <LuCompass className="h-7 w-auto aspect-square text-primary-1-500" />
            }
            title={t("items.2.title")}
            description={t("items.2.desc")}
            number="02"
            onHoverChange={(v) => setHoverIndex(v ? 1 : null)}
          />

          <GridItem
            index={2}
            spotlighted={spotlightIndex === 2}
            variants={itemVariants}
            area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
            icon={
              <BsFileEarmarkCode className="h-7 w-auto aspect-square text-primary-1-500" />
            }
            title={t("items.3.title")}
            description={t("items.3.desc")}
            number="03"
            onHoverChange={(v) => setHoverIndex(v ? 2 : null)}
          />

          <GridItem
            index={3}
            spotlighted={spotlightIndex === 3}
            variants={itemVariants}
            area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
            icon={
              <LuMonitorCheck className="h-7 w-auto aspect-square text-primary-1-500" />
            }
            title={t("items.4.title")}
            description={t("items.4.desc")}
            number="04"
            onHoverChange={(v) => setHoverIndex(v ? 3 : null)}
          />

          <GridItem
            index={4}
            spotlighted={spotlightIndex === 4}
            variants={itemVariants}
            area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
            icon={
              <PiFlowArrowBold className="h-7 w-auto aspect-square text-primary-1-500" />
            }
            title={t("items.5.title")}
            description={t("items.5.desc")}
            number="05"
            onHoverChange={(v) => setHoverIndex(v ? 4 : null)}
          />
        </motion.ul>

        <p className="w-full text-[18px] hidden lg:block">
          {t("bottomText.1")}
          <span className="text-white font-bold">{t("bottomText.2")}</span>
        </p>
      </article>
    </main>
  );
};

interface GridItemProps {
  index: number;
  spotlighted: boolean;
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  number?: string;
  onHoverChange: (hovering: boolean) => void;
  variants: any;
}

const GridItem = ({
  spotlighted,
  area,
  icon,
  title,
  description,
  number,
  onHoverChange,
  variants,
}: GridItemProps) => {
  return (
    <motion.li
      className={`min-h-56 list-none ${area}`}
      variants={variants}
      onHoverStart={() => onHoverChange(true)}
      onHoverEnd={() => onHoverChange(false)}
      animate={
        spotlighted
          ? {
              scale: 1.01,
            }
          : { scale: 1 }
      }
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      <div className="relative h-full rounded-2xl border-[0.5px] border-primary-1-50/40 p-2 md:rounded-3xl md:p-3">
        {/* Keep your proximity glow ALWAYS, but we’ll “boost” the card visual when spotlighted */}
        <GlowingEffect
          blur={0}
          borderWidth={3}
          spread={80}
          glow
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />

        <div
          className={[
            "border-0.75 relative flex h-full flex-col justify-between gap-6 bg-black/10 overflow-hidden rounded-xl p-6",
            "shadow-[0px_0px_4px_0px_#a6dbe6]",
            spotlighted
              ? "ring-1 ring-primary-1-500/50 shadow-[0px_0px_18px_0px_#a6dbe6]"
              : "",
            "transition-[box-shadow,ring] duration-300",
          ].join(" ")}
        >
          {number && (
            <div className="absolute top-4 right-4 text-6xl font-extrabold text-white/10">
              {number}
            </div>
          )}

          {/* Optional: a soft moving highlight overlay only when spotlighted */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            initial={false}
            animate={spotlighted ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="absolute -inset-24 bg-linear-to-r from-transparent via-primary-1-500/10 to-transparent rotate-12" />
          </motion.div>

          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-gray-600 p-2 text-lg bg-primary-1-500/10">
              {icon}
            </div>

            <div className="space-y-3">
              <h3 className="-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance md:text-lg text-white">
                {title}
              </h3>

              <h2 className="font-sans text-sm/[1.125rem] md:text-sm text-neutral-400 [&_b]:md:font-semibold [&_strong]:md:font-semibold">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </motion.li>
  );
};

export default ProcesoComp;
