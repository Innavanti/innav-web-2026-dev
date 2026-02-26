import { useTranslations } from "next-intl";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import { Vortex } from "../propuestaValor/Vortex";

export const Casos = () => {
  const t = useTranslations("Casos");

  const CasosList = [
    {
      title: t("items.4.title"),
      desc: t("items.4.desc"),
      type: t("items.4.type"),
      image: "/assets/casos/4.png",
    },
    {
      title: t("items.3.title"),
      desc: t("items.3.desc"),
      type: t("items.3.type"),
      image: "/assets/casos/3.png",
    },
    {
      title: t("items.1.title"),
      desc: t("items.1.desc"),
      type: t("items.1.type"),
      image: "/assets/casos/1.webp",
    },
    {
      title: t("items.2.title"),
      desc: t("items.2.desc"),
      type: t("items.2.type"),
      image: "/assets/casos/2.png",
    },
  ];
  return (
    <article
      id="casos"
      className="w-screen h-screen py-10  flex  gap-20 overflow-hidden justify-center items-center relative text-white"
    >
      <div className="absolute w-2.5 aspect-square pointer-events-none inset-x-0 m-auto bottom-[25%] z-10">
        <Vortex
          rangeY={140}
          particleCount={250}
          direction="left"
          // baseHue={200}
          className="flex items-center justify-center flex-col w-full h-full"
        />
      </div>
      <div className="w-full flex h-full lg:max-h-[70vh] relative flex-col lg:flex-row justify-around px-[5vw] lg:px-[10vw] gap-6 lg:gap-10 pt-20 lg:pt-24 z-30">
        <section className="w-full h-fit lg:w-1/2 lg:h-full lg:px-2 flex flex-col justify-between">
          <div className="text-lg gap-4 lg:gap-10 flex flex-col">
            <h1 className="text-2xl lg:text-5xl font-bold">{t("title")}</h1>
            <p className="text-sm leading-5 font-light lg:leading-7 ">
              {t("subtitle")}
            </p>
          </div>
          <div className="hidden lg:flex">
            <p className="">
              {t("bottom1")} <br />
              <span className="text-primary-1-500">{t("bottom2")}</span>
            </p>
          </div>
        </section>
        <section className="w-full h-full flex flex-col justify-evenly lg:pl-[10%] gap-3 z-30">
          {CasosList.map((caso, index) => (
            <Caso key={index} {...caso} />
          ))}
        </section>
      </div>
    </article>
  );
};

interface CasoProps {
  title: string;
  desc: string;
  type: string;
  image?: string;
}

export const Caso = ({ title, desc, type, image }: CasoProps) => {
  return (
    <div className="w-full h-full max-h-60 flex flex-col justify-center gap-4 py-3.5 relative group rounded-r-lg overflow-hidden hover:overflow-visible">
      <div className="w-full group-hover:w-[45%] bg-slate-300/20 absolute left-0 bottom-0 h-0.5 transition-all duration-300 ease-in-out z-10" />
      {image && (
        <div
          className=" rounded-lg 
    w-1/3 h-full absolute right-0 group-hover:z-50
    [--maskLeft:transparent]
    group-hover:[--maskLeft:black]
    [mask-image:linear-gradient(to_right,var(--maskLeft)_0%,black_35%)]
    [webkit-mask-image:linear-gradient(to_right,var(--maskLeft)_0%,black_40%)]
    group-hover:scale-[200%] transition-all duration-300 ease-in-out 

  "
        >
          <Image
            src={image}
            alt="Background element"
            fill
            className="object-cover "
            priority
          />
        </div>
      )}
      <div className="flex flex-row items-center gap-3">
        <h1 className="text-2xl font-semibold uppercase">{title}</h1>
        <FiArrowRight className="text-primary-1-500 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out " />
      </div>
      <div className="flex flex-col md:flex-row gap-2 relative w-fit items-start text-white/70 font-thin">
        <p>{desc}</p>
        <div className="flex flex-row gap-2 items-center">
          <div className="w-2 h-auto aspect-square rounded-full bg-white/70 " />
          <p className="">{type}</p>
        </div>
      </div>
    </div>
  );
};

export default Casos;
