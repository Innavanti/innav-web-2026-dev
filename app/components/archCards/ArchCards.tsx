"use client";

import { RefObject, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ContextCard } from "../contextComp/ContextComp";

type Card = { title: string; icon: React.ReactNode };

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const MAX_ANGLE = 55;
const RADIUS = 260;

export function ArchCards({
  parentRef,
  CardList,
}: {
  parentRef: RefObject<HTMLElement | null>;
  CardList: Card[];
}) {
  const { scrollYProgress } = useScroll({
    target: parentRef,
    offset: ["start start", "end end"],
  });

  const waveT = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 2]);

  const layout = useMemo(() => {
    const n = CardList.length;
    return CardList.map((card, i) => {
      const t = n === 1 ? 0.5 : i / (n - 1);
      const angle = lerp(-MAX_ANGLE, MAX_ANGLE, t);
      return { card, i, t, angle };
    });
  }, [CardList]);

  return (
    // z-index to sit above your sticky article if needed
    <div className="sticky top-0 h-screen w-screen pointer-events-none z-50">
      <div className="relative h-full w-full">
        {layout.map(({ card, i, t, angle }) => {
          const phase = lerp(-Math.PI, Math.PI, t);

          const y = useTransform(waveT, (v) => Math.sin(v + phase) * 40);
          const rot = useTransform(waveT, (v) => Math.sin(v + phase) * 8);
          const scale = useTransform(
            waveT,
            (v) => 1 + Math.sin(v + phase) * 0.05,
          );

          return (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              {/* OUTER = static arc placement */}
              <div
                className="pointer-events-auto"
                style={{
                  transform: `rotate(${angle}deg) translateY(${-RADIUS}px) rotate(${-angle}deg)`,
                }}
              >
                {/* INNER = animated wobble */}
                <motion.div style={{ y, rotate: rot, scale }}>
                  <ContextCard {...(card as any)} />
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
