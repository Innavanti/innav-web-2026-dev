"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

type PunchRevealProps = {
  /** Contenido de arriba (Componente A) */
  layerA: React.ReactNode;
  /** Contenido de abajo (Componente B) */
  children: React.ReactNode;

  /** Duración del perforado */
  duration?: number;

  /** Dónde nace el agujero (por defecto centro) */
  origin?: { x: string; y: string }; // e.g. { x: "50%", y: "50%" } o { x:"52%", y:"48%" }

  /** Si true, A bloquea clics hasta que termine (por defecto: false) */
  blockInteractionsUntilDone?: boolean;

  /** Si true, quita A del DOM al terminar (por defecto: true) */
  removeLayerAOnDone?: boolean;
};

export function PunchReveal({
  layerA,
  children,
  duration = 1.4,
  origin = { x: "50%", y: "50%" },
  blockInteractionsUntilDone = false,
  removeLayerAOnDone = true,
}: PunchRevealProps) {
  const [done, setDone] = useState(false);

  // Radio final (en vmax) para garantizar que cubra toda la pantalla
  const finalRadius = "150vmax";

  useEffect(() => {
    const t = setTimeout(() => setDone(true), duration * 1000);
    return () => clearTimeout(t);
  }, [duration]);

  const pointerEvents = blockInteractionsUntilDone ? "auto" : "none";

  // Nota: para Safari necesitas WebkitMask*
  const maskAt = `${origin.x} ${origin.y}`;

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* --- B (abajo) --- */}
      <div className="absolute inset-0 z-0">{children}</div>

      {/* --- A (arriba) con agujero animado --- */}
      {(!done || !removeLayerAOnDone) && (
        <motion.div
          className="absolute inset-0 z-10"
          style={
            {
              pointerEvents: done ? "none" : pointerEvents,

              // Animamos una CSS var para el radio del agujero
              ["--r" as any]: "0px",

              // Máscara: centro TRANSPARENTE hasta radio --r, fuera NEGRO (visible)
              WebkitMaskImage: `radial-gradient(circle var(--r) at ${maskAt}, transparent 0, transparent calc(var(--r) - 1px), black var(--r))`,
              maskImage: `radial-gradient(circle var(--r) at ${maskAt}, transparent 0, transparent calc(var(--r) - 1px), black var(--r))`,

              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskSize: "100% 100%",
              maskSize: "100% 100%",
            } as React.CSSProperties
          }
          animate={{ ["--r" as any]: finalRadius }}
          transition={{
            duration,
            ease: [0.22, 1, 0.36, 1], // suave tipo easeOutExpo
          }}
        >
          {layerA}
        </motion.div>
      )}
    </div>
  );
}
