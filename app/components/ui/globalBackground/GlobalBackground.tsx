"use client";

import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** 6 puntos default del background (cíclicos) */
const BG_POINTS = [
  { angle: 120 },
  { angle: 180 },
  { angle: 240 },
  { angle: 300 },
  { angle: 360 },
  { angle: 420 },
];

// 🎨 COLORES
const COLOR_DARK = "#0c0d0b";
const COLOR_MID = "#0c7092";

export function GlobalBackground({
  children,
  minSectionHeightClass = "min-h-screen",
  scrollRef,
}: {
  children: React.ReactNode;
  minSectionHeightClass?: string;
  /** ✅ el contenedor que scrollea (tu main con overflow-y-auto) */
  scrollRef: React.RefObject<HTMLElement | null>;
}) {
  const sectionsRef = useRef<HTMLElement[]>([]);
  const pointCount = BG_POINTS.length;

  const angle = useMotionValue<number>(BG_POINTS[0].angle);
  const angleSmooth = useSpring(angle, {
    stiffness: 120,
    damping: 22,
  });

  const backgroundImage = useTransform(angleSmooth, (a: number) => {
    return `linear-gradient(${a}deg, ${COLOR_DARK} 0%, ${COLOR_DARK} 50%, ${COLOR_MID} 100%)`;
  });

  const registerSection = (el: HTMLElement | null) => {
    if (!el) return;
    if (!sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let raf = 0;

    const update = () => {
      raf = 0;
      const sections = sectionsRef.current;
      if (!sections.length) return;

      const containerRect = container.getBoundingClientRect();
      const viewportCenter = containerRect.top + containerRect.height * 0.5;

      // 1) detectar sección activa respecto al contenedor
      let activeSectionIdx = 0;
      let bestDist = Infinity;

      for (let i = 0; i < sections.length; i++) {
        const rect = sections[i].getBoundingClientRect();
        const center = rect.top + rect.height * 0.5;
        const dist = Math.abs(center - viewportCenter);

        if (dist < bestDist) {
          bestDist = dist;
          activeSectionIdx = i;
        }
      }

      // 2) progress dentro de la sección (normalizado al alto del contenedor)
      const rect = sections[activeSectionIdx].getBoundingClientRect();

      // top relativo al viewport del contenedor (no window)
      const topRel = rect.top - containerRect.top;

      // 0..1 mientras la sección atraviesa 1 viewport de contenedor
      const t = clamp(-topRel / containerRect.height, 0, 1);

      // 3) sección -> punto cíclico
      const p0 = ((activeSectionIdx % pointCount) + pointCount) % pointCount;
      const p1 = (p0 + 1) % pointCount;

      const a0 = BG_POINTS[p0].angle;
      const a1 = BG_POINTS[p1].angle;

      angle.set(lerp(a0, a1, t));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    container.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      container.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [angle, pointCount, scrollRef]);

  return (
    <article className="relative">
      {/* 🌌 BACKGROUND GLOBAL */}
      <motion.div
        className="pointer-events-none sticky top-0 h-screen w-screen z-0"
        style={{
          backgroundImage,
          backgroundSize: "140% 140%",
          backgroundPosition: "center",
        }}
      />

      {/* 🧱 CONTENT */}
      <div className="relative z-10 -mt-[100vh]">
        {React.Children.map(children, (child, idx) => {
          if (!React.isValidElement(child)) return child;

          return (
            <section
              ref={registerSection}
              className={minSectionHeightClass}
              data-bg-section={idx}
            >
              {child}
            </section>
          );
        })}
      </div>
    </article>
  );
}
