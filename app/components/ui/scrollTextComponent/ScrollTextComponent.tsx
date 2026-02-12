"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { FiArrowDownCircle } from "react-icons/fi";

const IDLE_MS = 2000;

export default function ScrollTextComponent({
  scrollRef,
}: {
  scrollRef: React.RefObject<HTMLElement | null>;
}) {
  const t = useTranslations("nav");
  const [visible, setVisible] = useState(true);

  const idleTimeoutRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const clearIdle = () => {
      if (idleTimeoutRef.current !== null) {
        window.clearTimeout(idleTimeoutRef.current);
        idleTimeoutRef.current = null;
      }
    };

    const scheduleShow = () => {
      clearIdle();
      idleTimeoutRef.current = window.setTimeout(() => {
        setVisible(true);
      }, IDLE_MS);
    };

    const onScroll = () => {
      if (rafRef.current !== null) return;

      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        setVisible(false);
        scheduleShow();
      });
    };

    // visible al inicio, y vuelve tras idle aunque no se haya scrolleado
    scheduleShow();

    container.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", onScroll);
      clearIdle();
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
    };
  }, [scrollRef]);

  return (
    <div
      className={[
        "fixed bottom-[5%] right-[10%] z-40", // ✅ fixed overlay
        "uppercase flex flex-row text-white/50 items-center gap-2",
        "transition-opacity duration-500",
        visible ? "opacity-100" : "opacity-0 pointer-events-none",
      ].join(" ")}
    >
      <p>{t("scrollText")}</p>
      <FiArrowDownCircle size={20} className="animate-pulse" />
    </div>
  );
}
