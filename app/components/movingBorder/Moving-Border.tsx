"use client";

import * as React from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "motion/react";

type AsProp = React.ElementType;

type ButtonProps<TAs extends AsProp = "button"> = {
  borderRadius?: string;
  as?: TAs;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<TAs>, "as" | "children">;

export function MovingBorderButton<TAs extends AsProp = "button">({
  borderRadius = "1.75rem",
  children,
  as,
  containerClassName = "",
  borderClassName = "",
  duration = 3000,
  className = "",
  ...otherProps
}: ButtonProps<TAs>) {
  const Component = (as ?? "button") as AsProp;

  return (
    <Component
      className={`relative  w-40 overflow-hidden bg-transparent p-px text-xl ${containerClassName}`}
      style={{ borderRadius }}
      {...otherProps}
    >
      <div
        className="absolute inset-0 "
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={`h-20 w-20 bg-[radial-gradient(#3eb0c8_40%,transparent_60%)] opacity-[0.8] ${borderClassName}`}
          />
        </MovingBorder>
      </div>

      <div
        className={`relative flex h-full w-full items-center justify-center border border-slate-800 bg-primary-2-500/[0.2] text-sm text-white antialiased backdrop-blur-xl ${className}`}
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        {children}
      </div>
    </Component>
  );
}

type MovingBorderProps = React.SVGProps<SVGSVGElement> & {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
};

export function MovingBorder({
  children,
  duration = 3000,
  rx,
  ry,
  ...svgProps
}: MovingBorderProps) {
  const pathRef = React.useRef<SVGRectElement | null>(null);
  const progress = useMotionValue(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (!length) return;

    const pxPerMs = length / duration;
    progress.set((time * pxPerMs) % length);
  });

  const x = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val)?.x ?? 0,
  );
  const y = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val)?.y ?? 0,
  );

  const transform = useMotionTemplate`
    translateX(${x}px)
    translateY(${y}px)
    translateX(-50%)
    translateY(-50%)
  `;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...svgProps}
      >
        <rect
          ref={pathRef}
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
        />
      </svg>

      <motion.div
        className="absolute left-0 top-0 inline-block"
        style={{ transform }}
      >
        {children}
      </motion.div>
    </>
  );
}
