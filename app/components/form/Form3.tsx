"use client";

import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import SocialButton from "./SocialButton";
import { Input } from "./Input";
import { MovingBorderButton } from "../movingBorder/Moving-Border";
import Image from "next/image";

const SocialMedia = [
  {
    name: "Whatsapp",
    href: "https://api.whatsapp.com/send?phone=+56923592929",
    icon: "/assets/socials/whatsapp.svg",
    className: "bg-[#25D366]/80",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/innavanti/",
    icon: "/assets/socials/fb.svg",
    className: "bg-[#1877F2]/80",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/innavanti/",
    icon: "/assets/socials/ig.svg",
    className:
      "bg-gradient-to-b from-[#5F4BC6]/80 via-[#9E37B8]/80 to-[#D43089]/80",
  },
];

export const Form3 = () => {
  const t = useTranslations("Form");
  return (
    <article className="w-screen h-fit min-h-screen lg:h-screen flex relative flex-row justify-center items-center py-[10%] px-[5vw] lg:px-[10vw]">
      <div className="w-full h-full lg:max-h-[50vh] flex flex-col lg:flex-row gap-16 py-7 items-stretch ">
        <section className="w-full flex flex-col ">
          <div className="w-full h-full flex flex-col gap-5 lg:gap-10 justify-between">
            <h1 className="text-3xl lg:text-5xl font-bold">{t("title")}</h1>
            <div className="w-full h-fit flex flex-col gap-7">
              <p className="text-white lg:max-w-2/3 font-light lg:leading-7">
                {t("subtitle")}
              </p>
              <p className="text-primary-1-500 text-base font-semibold">
                {t("subtext")}
              </p>
            </div>
            <MediaSection className="hidden lg:flex" />
          </div>
        </section>
        <section className="w-full h-full flex relative justify-center">
          <GradientForm />
        </section>
        <MediaSection className="lg:hidden" />
      </div>
      <p className="w-fit h-fit bottom-0 lg:bottom-[4%] inset-x-0 m-auto absolute">
        <span>&#169; </span>
        {t("copyright")}
      </p>
    </article>
  );
};

export const MediaSection = ({ className }: { className?: string }) => {
  const t = useTranslations("Form");

  return (
    <div className={` flex flex-col ${className}`}>
      <p className="text-white text-sm lg:mt-20">{t("socialText")}</p>
      <div className="w-full h-full flex flex-row gap-5 py-6">
        {SocialMedia.map((link, i) => (
          <SocialButton key={i} {...link} />
        ))}
      </div>
    </div>
  );
};

export const GradientForm = () => {
  const t = useTranslations("Form.labels");
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, {
    amount: 0.9,
    once: false,
  });

  return (
    <div
      ref={ref}
      className={`rounded-[22px] p-0.5 transition-all duration-300 w-full lg:w-auto h-full lg:aspect-10/9
        bg-[linear-gradient(163deg,#3eb0c8_0%,#0c7092_100%)]
        ${isInView ? "shadow-[0_0_30px_1px_#095068]" : ""}`}
    >
      <div
        className={`transition-all duration-200 w-full h-full 
          ${isInView ? "scale-[0.98] rounded-[20px]" : ""}`}
      >
        <form className="w-full h-full relative flex flex-col gap-5 lg:gap-2 px-[5%] lg:px-[10%] py-[10%] justify-around rounded-[25px] bg-[#171717] ">
          <section className="w-full h-fit flex flex-col lg:flex-row gap-3">
            <div className="w-full h-fit flex flex-col gap-1.5">
              <p className="font-thin">
                {t("name")}
                <sup>*</sup>
              </p>
              <Input type="text" placeholder={t("namePH")} />
            </div>
            <div className="w-full h-fit flex flex-col gap-1.5">
              <p className="font-thin">
                {t("company")}
                <sup>*</sup>
              </p>
              <Input type="text" placeholder={t("companyPH")} />
            </div>
          </section>
          <section className="w-full h-fit flex flex-row">
            <div className="w-full h-fit flex flex-col gap-1.5">
              <p className="font-thin">
                {t("email")}
                <sup>*</sup>
              </p>
              <Input type="email" placeholder={t("emailPH")} />
            </div>
          </section>
          <section className="w-full h-fit flex flex-row">
            <div className="w-full h-fit flex flex-col gap-1.5">
              <p className="font-thin">{t("message")}</p>
              <Input
                type="text"
                className="min-h-20"
                placeholder={t("messagePH")}
              />
            </div>
          </section>
          <section>
            <div className="flex w-full justify-center">
              <MovingBorderButton
                className="uppercase font-semibold flex flex-row gap-1.5 w-full cursor-pointer"
                containerClassName="w-full max-w-[70%] self-center justify-self-center h-12 lg:h-14"
              >
                <p>{t("send")}</p>
                <div className="aspect-square w-4 relative">
                  <Image
                    src="/assets/form/send.svg"
                    alt="Send"
                    className="object-contain"
                    fill
                  />
                </div>
              </MovingBorderButton>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
};

export default Form3;
