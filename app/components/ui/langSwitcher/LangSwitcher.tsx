"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

type Locale = "es" | "en";

export default function LangSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  const isEn = locale === "en";

  const setLocale = (next: Locale) => {
    if (next === locale) return;
    router.replace(pathname, { locale: next });
  };

  return (
    <div className="inline-flex items-center cursor-pointer">
      <div
        role="tablist"
        aria-label="Language switcher"
        className={[
          // Mobile friendly
          "relative inline-flex items-center rounded-full px-1",
          "h-10 sm:h-11",
          // Light / bone
          "bg-[#f6f5f1] ring-1 ring-black/5",
          // Neumorphism inset (adjusted depth) + animated shadow
          "shadow-[inset_5px_5px_10px_rgba(0,0,0,0.08),inset_-5px_-5px_10px_rgba(255,255,255,0.9)]",
          "transition-shadow duration-300 ease-out",
        ].join(" ")}
      >
        {/* Inner sheen */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-[3px] rounded-full bg-gradient-to-b from-white/80 via-transparent to-black/5"
        />

        {/* Thumb */}
        <span
          aria-hidden="true"
          className={[
            "absolute left-1 top-1 rounded-full",
            "h-8 sm:h-9",
            "w-[calc(50%-0.25rem)]",
            "bg-[#fafafa] ring-1 ring-black/5",
            "shadow-[0_6px_14px_rgba(0,0,0,0.12),inset_1px_1px_0_rgba(255,255,255,0.9),inset_-1px_-1px_0_rgba(0,0,0,0.08)]",
            "transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
            "motion-reduce:transition-none",
            isEn ? "translate-x-[calc(100%+0.5rem)]" : "translate-x-0",
          ].join(" ")}
        />

        <button
          type="button"
          role="tab"
          aria-selected={!isEn}
          onClick={() => setLocale("es")}
          className={[
            "relative z-10 rounded-full cursor-pointer",
            "h-8 sm:h-9",
            "w-14 sm:w-16",
            "px-3",
            "text-[12px] sm:text-[13px] font-medium tracking-wide",
            "transition-all duration-200 ease-out",
            "active:scale-[0.96]",
            "motion-reduce:transition-none motion-reduce:transform-none",
            !isEn
              ? "text-neutral-900"
              : "text-neutral-400 hover:text-neutral-600",
          ].join(" ")}
        >
          ES
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={isEn}
          onClick={() => {
            setLocale("en");

            console.log("Click xd");
          }}
          className={[
            "relative z-10 rounded-full",
            "h-8 sm:h-9",
            "w-14 sm:w-16",
            "px-3",
            "text-[12px] sm:text-[13px] font-medium tracking-wide",
            "transition-all duration-200 ease-out",
            "active:scale-[0.96]",
            "motion-reduce:transition-none motion-reduce:transform-none",
            isEn
              ? "text-neutral-900"
              : "text-neutral-400 hover:text-neutral-600",
          ].join(" ")}
        >
          EN
        </button>
      </div>
    </div>
  );
}
