import { useTranslations } from "next-intl";
import Link from "next/link";
import { BsGraphUpArrow } from "react-icons/bs";
import { FiArrowUpRight } from "react-icons/fi";
import { LiaBrainSolid } from "react-icons/lia";
import { TbDeviceDesktopCog } from "react-icons/tb";
import { Vortex } from "./Vortex";
import { MovingBorderButton } from "../movingBorder/Moving-Border";

export const PropuestaValor = () => {
  const t = useTranslations("PropuestaValor");

  const cards = [
    {
      icon: <LiaBrainSolid />,
      title: t("cards.1.title"),
      desc: t("cards.1.desc"),
    },
    {
      icon: <TbDeviceDesktopCog />,
      title: t("cards.2.title"),
      desc: t("cards.2.desc"),
    },
    {
      icon: <BsGraphUpArrow />,
      title: t("cards.3.title"),
      desc: t("cards.3.desc"),
    },
  ];
  return (
    <article className="w-screen h-screen overflow-hidden text-white relative flex justify-center items-center pt-20 lg:py-0 px-[5vw]">
      <div className="absolute w-2.5 aspect-square pointer-events-none inset-x-0 m-auto bottom-[25%]">
        <Vortex
          rangeY={100}
          particleCount={200}
          direction="right"
          // baseHue={200}
          className="flex items-center justify-center flex-col w-full h-full "
        />
      </div>
      <div className="w-full h-full  lg:h-auto lg:aspect-video flex flex-col gap-7 lg:gap-4 lg:grid grid-cols-2 grid-rows-[minmax(0,300px)_1fr]">
        <section className="w-full h-fit lg:h-full  flex flex-col gat-28 justify-center relative ">
          <h1 className="text-3xl lg:text-5xl font-semibold w-full h-fit">
            {t("title")}
          </h1>
        </section>
        <div className="w-full gap-10 flex flex-col h-fit lg:h-full col-start-1 col-end-2 row-start-2 row-end-3">
          <p className="max-w-sm font-light leading-7">{t("subtitle")}</p>
          <MovingBorderButton
            className="cursor-pointer "
            containerClassName="w-1/2 lg:w-[40%] h-12 lg:h-16 font-semibold uppercase"
          >
            <Link
              href={""}
              className="flex flex-row items-center justify-center gap-1.5 text-base lg:text-lg"
            >
              <p>{t("ConocenosButton")}</p>
              <FiArrowUpRight size={25} />
            </Link>
          </MovingBorderButton>
        </div>
        <section className="w-full self-end lg:h-full relative  flex flex-col lg:gap-1 justify-between col-start-2 col-end-3 row-start-2 row-end-3">
          <div className="w-full h-fit">
            <div className="w-full flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory lg:overflow-visible lg:snap-none lg:justify-center">
              {cards.map((card, index) => (
                <Card key={index} {...card} />
              ))}
            </div>
          </div>
          <div className="hidden lg:flex">
            <p className="text-lg">
              {t("bottomText.p1")}{" "}
              <span className="text-primary-1-500">{t("bottomText.p2")}</span>
            </p>
          </div>
        </section>
      </div>
    </article>
  );
};

type GlassCardProps = {
  title?: string;
  desc: string;
  icon?: React.ReactNode;
  className?: string;
};

export const Card = ({
  title = "GLASS EFFECT",
  icon,
  desc,
  className = "",
}: GlassCardProps) => {
  return (
    <div
      className={`relative inline-block text-white shrink-0 snap-start lg:shrink ${className}`}
    >
      <div className="flex flex-col justify-around aspect-45/61 gap-3 w-full min-w-56 max-w-67.5 h-full px-5 py-6 rounded-[0.7rem] bg-white/[0.074] border border-primary-1-50/10 backdrop-blur-[20px] transition-all duration-300 ease-out hover:shadow-[0_0_20px_1px_#ffbb763f] hover:border-primary-1-50/[0.454]">
        {icon ? (
          <div className="text-4xl text-primary-1-500 font-font">{icon}</div>
        ) : null}
        <h1 className="text-md font-bold">{title}</h1>
        <p className="text-sm opacity-80">{desc}</p>
      </div>
    </div>
  );
};

export default PropuestaValor;
