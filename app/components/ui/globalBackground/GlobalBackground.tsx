"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
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
  scrollRef,
}: {
  children: React.ReactNode;
  /** contenedor que scrollea (tu main con overflow-y-auto) */
  scrollRef: React.RefObject<HTMLElement | null>;
}) {
  const pointCount = BG_POINTS.length;

  const angle = useMotionValue<number>(BG_POINTS[0].angle);
  const angleSmooth = useSpring(angle, { stiffness: 120, damping: 22 });

  const backgroundImage = useTransform(angleSmooth, (a: number) => {
    return `linear-gradient(${a}deg, ${COLOR_DARK} 0%, ${COLOR_DARK} 50%, ${COLOR_MID} 100%)`;
  });

  // Guardamos el "viewport height" real del contenedor (no window)
  const [vh, setVh] = useState<number>(0);
  const rafRef = useRef<number>(0);

  useLayoutEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const measure = () => {
      const h = container.getBoundingClientRect().height || 0;
      setVh(h);
    };

    measure();

    // ResizeObserver para que cambie si tu layout cambia (sidebars, mobile address bar, etc.)
    const ro = new ResizeObserver(() => measure());
    ro.observe(container);

    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [scrollRef]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || !vh) return;

    const update = () => {
      rafRef.current = 0;

      const scrollTop = container.scrollTop;

      // "pantalla" actual
      const page = Math.floor(scrollTop / vh);

      // 0..1 dentro de la pantalla
      const t = clamp((scrollTop - page * vh) / vh, 0, 1);

      // cíclico
      const p0 = ((page % pointCount) + pointCount) % pointCount;
      const p1 = (p0 + 1) % pointCount;

      const a0 = BG_POINTS[p0].angle;
      const a1 = BG_POINTS[p1].angle;

      angle.set(lerp(a0, a1, t));
    };

    const onScroll = () => {
      if (!rafRef.current) rafRef.current = requestAnimationFrame(update);
    };

    update();
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      container.removeEventListener("scroll", onScroll);
    };
  }, [angle, pointCount, scrollRef, vh]);

  return (
    <article className="relative">
      {/* BACKGROUND GLOBAL */}
      <motion.div
        className="pointer-events-none sticky top-0 h-screen w-screen z-0"
        style={{
          backgroundImage,
          backgroundSize: "140% 140%",
          backgroundPosition: "center",
        }}
      />

      {/* contenido por encima */}
      <div className="">{children}</div>
    </article>
  );
}
