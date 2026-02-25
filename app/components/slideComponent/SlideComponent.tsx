"use client";

import { RefObject, useRef } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

import { motion, useInView, useScroll, useTransform } from "framer-motion";

type Solution = {
  type?: string;
  title?: string;
  descTitle?: string;
  desc?: string;
};

type SlideProps = {
  id: string;
  title?: string;
  image?: string;
  solution?: Solution;
  href?: string;
  target?: string;
  animation?: React.ReactNode;

  /** ✅ importantísimo: el contenedor que scrollea (el <main> con overflow-y-auto) */
  scrollRef: RefObject<HTMLElement | null>;
};

export const SlideComponent = ({
  title,
  image,
  solution,
  href,
  target,
  scrollRef,
  id,
  animation,
}: SlideProps) => {
  const t = useTranslations("HomePage.ServicesSection");

  // target del slide (lo que animas por progreso)
  const ref = useRef<HTMLElement | null>(null);

  // ✅ usa el contenedor, no window
  const { scrollYProgress } = useScroll({
    container: scrollRef,
    target: ref,
    offset: ["start end", "end start"],
  });

  // ✅ animaciones
  const scale = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  const y = useTransform(
    scrollYProgress,
    [0, 0.07, 0.85, 1],
    ["100vh", "0vh", "0vh", "-50vh"],
  );

  const textScale = useTransform(scrollYProgress, [0, 0.4], [3, 1]);

  // ✅ mejor inView para evitar flicker con snap
  const isVisible = useInView(ref, {
    amount: 0.7,
    margin: "-10% 0px -10% 0px",
  });

  return (
    <main
      ref={ref}
      id={id}
      className="w-screen h-screen flex justify-center items-center relative overflow-hidden px-[10vw] text-white"
    >
      <motion.article
        className="w-full h-fit py-20 flex flex-col lg:justify-around lg:gap-0 relative "
        style={{ scale, y }}
      >
        {/* Title */}
        <div className="w-full lg:m-0 h-fit lg:w-fit lg:h-fit relative flex  left-[0%] lg:top-[20%]">
          <motion.h1
            className="text-4xl lg:text-7xl uppercase font-semibold"
            style={{ scale: textScale }}
          >
            {title}
          </motion.h1>
        </div>

        {/* Image */}
        {image && (
          <div className="w-full  h-auto relative mb-10 lg:max-w-[75vw] xl:max-w-[70vw] 2xl:max-w-[50vw] aspect-video flex inset-0 m-auto pointer-events-none">
            <Image
              src={image}
              alt="Background element"
              fill
              className="object-contain object-bottom pointer-events-none"
              priority
            />
          </div>
        )}
        {animation && (
          <div className="w-full  h-auto relative mb-10 lg:max-w-[75vw] xl:max-w-[70vw] 2xl:max-w-[50vw] aspect-video flex inset-0 m-auto pointer-events-none">
            {animation}
          </div>
        )}

        {/* Content fades in/out */}
        <motion.div
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="flex flex-col gap-5 relative w-full h-fit lg:h-full"
        >
          {solution?.type && (
            <div className="lg:flex flex-row gap-4 absolute bottom-[25%] left-0 px-1.5 hidden">
              <p className="outline outline-primary-1-500 px-2 rounded-full">
                {solution.type}
              </p>
              <p>{solution.title}</p>
            </div>
          )}

          <div className="lg:aspect-17/8 lg:max-w-87.5 w-full lg:absolute bottom-[10%] flex flex-col gap-3 right-0 h-fit lg:h-auto">
            <h1 className="uppercase font-bold text-primary-1-500">
              {solution?.descTitle}
            </h1>
            <p className="font-light leading-7">{solution?.desc}</p>
          </div>

          {href && (
            <Link href={href} target={target} className="group">
              <button className="px-5 py-2 flex flex-row items-center relative lg:absolute bottom-[20%] lg:bottom-[5%] inset-x-0 w-fit m-auto bg-white text-slate-950 font-semibold text-sm tracking-wide uppercase rounded-full hover:bg-slate-700 hover:text-white transition-colors duration-300">
                {t("buttonText")}
                <FiArrowRight
                  size={19}
                  className="group-hover:-rotate-12 transition-transform duration-300 ease-initial"
                />
              </button>
            </Link>
          )}
        </motion.div>
      </motion.article>
    </main>
  );
};

export default SlideComponent;
