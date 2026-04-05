"use client";

import { useRef, useState, useEffect } from "react";
import { useInView, AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import SocialButton from "./SocialButton";
import { Input } from "./Input";
import { MovingBorderButton } from "../movingBorder/Moving-Border";
import Image from "next/image";
import { submitContactForm } from "../../actions/formActions";
import Link from "next/link";

const SocialMedia = [
  {
    name: "Whatsapp",
    href: "https://wa.me/523320785564",
    icon: "/assets/socials/whatsapp.svg",
    className: "bg-[#25D366]/80",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/innavanti.oficial/",
    icon: "/assets/socials/ig.svg",
    className:
      "bg-gradient-to-b from-[#5F4BC6]/80 via-[#9E37B8]/80 to-[#D43089]/80",
  },
];

export const Form3 = () => {
  const t = useTranslations("Form");
  return (
    <article
      id="contacto"
      className="w-screen h-fit  min-h-screen lg:h-screen flex relative flex-row justify-center items-center pt-[15%] pb-[15px] lg:py-[15%] px-[5vw] lg:px-[10vw] text-white"
    >
      <div className="w-full h-full lg:max-h-[50vh] flex flex-col lg:flex-row gap-16 py-7 lg:py-0 items-stretch relative">
        <section className="w-full flex flex-col">
          <div className="w-full h-full flex flex-col gap-3 lg:gap-10 justify-between">
            <h1 className="text-3xl lg:text-5xl font-bold uppercase">
              {t("title")}
            </h1>
            <div className="w-full h-fit flex flex-col gap-7 lg:text-lg">
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
      <Copyright className="hidden lg:block lg:bottom-2 " />
    </article>
  );
};

const Copyright = ({ className }: { className?: string }) => {
  const t = useTranslations("Form");
  return (
    <p
      className={`w-fit h-fit  inset-x-0 m-auto absolute text-xs lg:text-base ${className}`}
    >
      <span>&#169; </span>
      {t("copyright")}
    </p>
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
      <Copyright className="lg:hidden relative bottom-0" />
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

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await submitContactForm(formData);

      if (res.success) {
        setStatus("success");
        setFormData({ name: "", company: "", email: "", phone: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        console.error(res.error);
        setTimeout(() => setStatus("idle"), 8000); // Errors give a bit more time to click WhatsApp
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 8000);
    }
  };

  return (
    <div
      ref={ref}
      className={`rounded-[22px] p-0.5 transition-all duration-300 w-full h-full lg:aspect-square
        bg-[linear-gradient(163deg,#3eb0c8_0%,#0c7092_100%)]
        ${isInView ? "shadow-[0_0_30px_1px_#095068]" : ""}`}
    >
      <div
        className={`transition-all duration-200 w-full h-full 
          ${isInView ? "scale-[0.98] rounded-[20px]" : ""}`}
      >
        <form onSubmit={handleSubmit} className="w-full h-full relative flex flex-col gap-5 lg:gap-2.5 px-[5%] lg:px-[10%] py-[10%] justify-around rounded-[25px] bg-[#171717] ">
          <section className="w-full h-fit flex flex-col lg:flex-row gap-3">
            <div className="w-full h-fit flex flex-col gap-1.5">
              <p className="font-thin">
                {t("name")}
                <sup>*</sup>
              </p>
              <Input
                type="text"
                placeholder={t("namePH")}
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="w-full h-fit flex flex-col gap-1.5">
              <p className="font-thin">
                {t("company")}
                <sup>*</sup>
              </p>
              <Input
                type="text"
                placeholder={t("companyPH")}
                required
                value={formData.company}
                onChange={e => setFormData({ ...formData, company: e.target.value })}
              />
            </div>
          </section>
          <section className="w-full h-fit flex flex-col lg:flex-row gap-3">
            <div className="w-full h-fit flex flex-col gap-1.5">
              <p className="font-thin">
                {t("email")}
                <sup>*</sup>
              </p>
              <Input
                type="email"
                placeholder={t("emailPH")}
                required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="w-full h-fit flex flex-col gap-1.5">
              <p className="font-thin">
                Teléfono
                <sup>*</sup>
              </p>
              <Input
                type="tel"
                placeholder="+1 234 567 890"
                required
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </section>
          <section className="w-full h-fit flex flex-row ">
            <div className="w-full h-fit flex flex-col gap-1.5">
              <p className="font-thin">{t("message")}</p>
              <Input
                type="text"
                className="min-h-20"
                placeholder={t("messagePH")}
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
              />
            </div>
          </section>
          <section>
            <div className="flex w-full justify-center lg:mt-5">
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full max-w-[70%] justify-center h-12 bg-transparent border-none p-0 cursor-pointer disabled:opacity-50"
              >
                <div className="w-full h-full relative" style={{ pointerEvents: 'none' }}>
                  <MovingBorderButton
                    className="uppercase font-semibold flex flex-row gap-1.5 w-full lg:text-lg justify-center pointer-events-none"
                    containerClassName="w-full h-full"
                    as="div"
                  >
                    {status === "loading" ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <p>{t("send")}...</p>
                      </div>
                    ) : (
                      <>
                        <p>{t("send")}</p>
                        <div className="aspect-square w-4 relative">
                          <Image
                            src="/assets/form/send.svg"
                            alt="Send"
                            className="object-contain"
                            fill
                          />
                        </div>
                      </>
                    )}
                  </MovingBorderButton>
                </div>
              </button>
            </div>
          </section>
        </form>
      </div>

      <AnimatePresence>
        {status !== "idle" && status !== "loading" && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="fixed bottom-6 right-6 z-[100] max-w-sm w-[90vw] bg-[#1a1a1a]/95 backdrop-blur-md border border-white/10 p-5 rounded-2xl shadow-2xl flex flex-col gap-3"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  status === "success" ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
                }`}>
                  {status === "success" ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </div>
                <div>
                  <h4 className="text-white font-bold text-base">
                    {status === "success" ? "¡Genial!" : "Ups..."}
                  </h4>
                  <p className="text-white/70 text-sm leading-tight mt-0.5">
                    {status === "success" ? t("success") : t("error")}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setStatus("idle")}
                className="text-white/40 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {status === "error" && (
              <div className="mt-1">
                <Link
                  href="https://wa.me/523320785564"
                  target="_blank"
                  className="w-full py-2.5 px-4 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all"
                >
                  <Image src="/assets/socials/whatsapp.svg" alt="WA" width={16} height={16} className="brightness-150" />
                  {t("whatsapp")}
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Form3;
