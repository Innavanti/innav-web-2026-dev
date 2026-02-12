"use client";

import { useEffect, useRef } from "react";

type Props = {
  basePath: string; // "/assets/slides/pc/pc_animacion_"
  frameCount?: number; // 31 (0000..0030)
  fps?: number; // 12
  loop?: boolean; // default true
  ext?: string; // "webp"
  startIndex?: number; // 0
};

export default function ImageSequence({
  basePath,
  frameCount = 30,
  fps = 12,
  loop = true,
  ext = "webp",
  startIndex = 0,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2); // cap a 2 para no matar performance
    const frameDuration = 1000 / fps;

    const images: HTMLImageElement[] = new Array(frameCount);
    const ok: boolean[] = new Array(frameCount).fill(false);

    const srcFor = (i: number) => {
      const n = (startIndex + i).toString().padStart(4, "0");
      return `${basePath}${n}.${ext}`;
    };

    // Resize: canvas buffer = cssSize * dpr
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);

      // Draw using CSS pixels
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = srcFor(i);
      img.onload = () => (ok[i] = true);
      img.onerror = () => console.warn("Broken frame:", img.src);
      images[i] = img;
    }

    let start = performance.now();

    const drawContain = (img: HTMLImageElement) => {
      const rect = canvas.getBoundingClientRect();
      const cw = rect.width;
      const ch = rect.height;

      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      if (!iw || !ih) return;

      const scale = Math.min(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;

      const x = (cw - dw) / 2;
      const y = (ch - dh) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, x, y, dw, dh);
    };

    const render = (t: number) => {
      const elapsed = t - start;
      const rawIndex = Math.floor(elapsed / frameDuration);

      const idx = loop
        ? rawIndex % frameCount
        : Math.min(rawIndex, frameCount - 1);

      const img = images[idx];
      if (img && ok[idx] && img.complete && img.naturalWidth > 0) {
        drawContain(img);
      }

      if (!loop && rawIndex >= frameCount - 1) return;
      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [basePath, frameCount, fps, loop, ext, startIndex]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
