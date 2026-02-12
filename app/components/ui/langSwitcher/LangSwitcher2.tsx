"use client";

import { useLocale } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Locale = "es" | "en";

export const LangSwitcher2 = () => {
  const locale = useLocale() as Locale;
  const router = useRouter();

  const isEn = locale === "en";

  const setLocale = (next: Locale) => {
    if (next === locale) return;

    // ✅ Cookie estándar de next-intl (y fallback por si sigues usando "locale")
    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=31536000`;
    document.cookie = `locale=${next}; path=/; max-age=31536000`;

    router.refresh(); // re-render server components con el nuevo locale
  };

  return (
    <button
      className="flex flex-row border bg-white/5 backdrop-blur-sm rounded-full w-full max-w-24 px-3 py-1 h-full lg:text-sm aspect-16/11 items-center justify-evenly gap-3 cursor-pointer"
      onClick={() => setLocale(isEn ? "es" : "en")}
    >
      <div className="aspect-square w-auto h-full rounded-full relative">
        <Image
          src={isEn ? "/assets/lang/en.svg" : "/assets/lang/es.svg"}
          alt="Flag"
          className="object-contain"
          priority
          fill
        />
      </div>
      <p className="font-bold">{isEn ? "EN" : "ES"}</p>
    </button>
  );
};

export default LangSwitcher2;
