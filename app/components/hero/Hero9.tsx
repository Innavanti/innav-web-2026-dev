import { useTranslations } from "next-intl";
import { SparklesCore } from "../sparklesCore/SparklesCore";
import { SparklesSeparator } from "../sparklesSeparator/SparklesSeparator";

import Image from "next/image";
import { PunchReveal } from "../circularReveal/CircularReveal";

export const HeroReveal = () => {
  return (
    <PunchReveal
      layerA={
        <div className="w-screen h-screen bg-black flex justify-center items-center">
          <div className="aspect-video w-full max-w-200 relative">
            <Image
              src="/assets/branding/logo-innavanti-vertical-colorBco.png"
              alt="Background element"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      }
      duration={10}
      origin={{ x: "50%", y: "50%" }} // aquí puedes ajustar para “el centro de la A”
      blockInteractionsUntilDone={false}
      removeLayerAOnDone={true}
    >
      <Revealed />
    </PunchReveal>
  );
};

export const Revealed = () => {
  const t = useTranslations("HomePage");
  return (
    <>
      <main className="w-screen h-screen bg-black relative flex flex-col justify-center items-center">
        <article className="flex flex-col items-center justify-center max-w-[70vw] gap-5">
          <div className="w-full h-fit flex flex-col uppercase text-center text-6xl">
            <h1>
              <span className="font-semibold">
                <TextWithGradient>{t("title.1")}</TextWithGradient>
              </span>{" "}
              {t("title.2")}
            </h1>
          </div>

          <div className="max-w-[100vw] h-[40vh] aspect-18/9 relative rounded-4xl overflow-hidden ">
            <SparklesSeparator />
            <SparklesCore particleDensity={30} />
          </div>
        </article>
        <div className="w-[25vw] h-fit flex flex-col p-2 text-white gap-2 absolute right-[10%] bottom-[10%]">
          <p>{t("subtitle")}</p>
          <p className="uppercase text-primary-1-500 font-semibold">
            {t("scrollText")}
          </p>
        </div>
      </main>
    </>
  );
};

const TextWithGradient = ({
  children,
  className,
}: {
  children: string;
  className?: string;
}) => {
  return (
    <div className="relative inline-block">
      {/* Texto con gradiente */}
      <span
        className={`tracking-tight bg-linear-to-r from-white  to-primary-1-500 bg-clip-text text-transparent ${className}`}
      >
        {children}
      </span>
    </div>
  );
};

export default Revealed;
