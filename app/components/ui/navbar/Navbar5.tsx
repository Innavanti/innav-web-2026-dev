"use client";
import Image from "next/image";
import Link from "next/link";
import LangSwitcher2 from "../langSwitcher/LangSwitcher2";
import { useTranslations } from "next-intl";
import { IoLogoWhatsapp } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { CgMenu } from "react-icons/cg";
import { FiX } from "react-icons/fi";

export const Navbar5 = () => {
  const t = useTranslations("nav");
  const MenuList = [
    {
      title: t("menuList.soluciones"),
      href: "#services",
    },
    {
      title: t("menuList.enfoque"),
      href: "/nosotros",
    },
    {
      title: t("menuList.proceso"),
      href: "/proceso",
    },
    {
      title: t("menuList.casos"),
      href: "/casos",
    },
    {
      title: t("menuList.conectar"),
      href: "/contacto",
    },
  ];
  return (
    <>
      <header className="fixed top-0 inset-x-0  h-24 p-3 pointer-events-auto z-999">
        <nav className="mx-auto h-full w-full max-w-[80vw] grid-cols-3 items-center hidden lg:grid">
          <LogoWithURl href="/" target="_self" />

          <section className="hidden h-12 w-fit items-center justify-self-center rounded-full bg-white/10 px-5 backdrop-blur-xs lg:flex">
            {MenuList.map((item) => (
              <NavLink key={item.title} {...item} />
            ))}
          </section>

          <section className="flex h-8 w-fit gap-2.5 justify-self-end pointer-events-auto">
            <LangSwitcher2 />
            <ContactButton />
          </section>
        </nav>
      </header>

      <NavMobile {...{ MenuList }} />
    </>
  );
};

export const NavMobile = ({
  MenuList,
}: {
  MenuList: {
    title: string;
    href: string;
  }[];
}) => {
  const t = useTranslations("nav");
  const [isOpen, setisOpen] = useState(false);

  return (
    <>
      <nav
        className={`w-screen h-screen lg:hidden absolute m-auto inset-0 z-9999 flex pointer-events-none `}
      >
        <div className="h-24 py-3 w-full flex flex-row justify-between items-center relative px-[5vw]">
          <LogoWithURl href="/" target="_self" className="z-999" />
          <button
            className="h-full max-h-10 w-auto aspect-square bg-white/20 backdrop-blur-lg rounded-full relative  text-primary-1-500 z-999 pointer-events-auto"
            onClick={() => setisOpen(!isOpen)}
          >
            {isOpen ? (
              <>
                <FiX size={25} className="absolute inset-0 m-auto" />
              </>
            ) : (
              <CgMenu size={25} className="absolute inset-0 m-auto" />
            )}
          </button>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={`w-screen h-screen absolute px-[5vw] py-0 m-auto flex flex-col pt-24  bg-linear-120 from-primary-3-900 from-60% to-primary-1-700 `}
              // animate={{ x: isOpen ? "0" : "-100vw" }}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 40,
                mass: 0.9,
              }}
            >
              <section className="w-full h-full flex flex-col justify-around">
                {MenuList.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className={`relative text-white transition-all duration-100 ease-in-out text-3xl`}
                  >
                    <h1>{item.title}</h1>
                  </Link>
                ))}
              </section>
              <section className="w-full h-full  justify-between flex flex-col py-[20%]">
                <Link
                  href={"/"}
                  className={`px-2 py-4 uppercase font-semibold text-white text-2xl tracking-[7px] rounded-full flex flex-row items-center justify-center gap-2 bg-[#14973E]`}
                >
                  <IoLogoWhatsapp size={25} />

                  <p>{t("navContact")}</p>
                </Link>
                <LangSwitcher2 />
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

const LogoWithURl = ({
  href,
  target = "_self",
  className,
}: {
  href: string;
  target?: string;
  className?: string;
}) => {
  return (
    <Link
      href={href}
      target={target}
      className={`flex h-full w-full max-w-75 justify-self-start pointer-events-auto ${className}`}
    >
      <div className="relative h-full aspect-video">
        <Image
          src="/assets/branding/logo-innavanti-horizontal-bco.png"
          alt="Logo"
          className="object-contain"
          priority
          fill
        />
      </div>
    </Link>
  );
};

export const NavLink = ({
  title,
  href,
  className,
}: {
  title: string;
  href: string;
  className?: string;
}) => {
  return (
    <Link
      href={href}
      className={`relative hover:outline-2 outline-0 text-white/70 hover:text-white hover:font-semibold font-light outline-primary-2-500 px-3 py-1 rounded-full transition-all duration-100 ease-in-out ${className}`}
    >
      <p>{title}</p>
    </Link>
  );
};

const ContactButton = () => {
  const t = useTranslations("nav");
  return (
    <Link href={"/"} className={`group `}>
      <div className="relative bg-white/5 backdrop-blur-sm flex flex-row border hover:border-0 overflow-hidden rounded-full w-fit min-w-40 px-2.5 py-1 h-full lg:text-sm items-center text-center justify-evenly cursor-pointer uppercase gap-2 transition-all duration-100 ease-out group-hover:flex-row-reverse">
        <div
          className={`w-0 group-hover:w-full bg-[#075e54] transition-all duration-300 ease-out absolute inset-0 z-0`}
        />
        <p className="z-10">{t("navContact")}</p>
        <div className={`flex z-10 w-fit`}>
          <IoLogoWhatsapp />
        </div>
      </div>
    </Link>
  );
};

export default Navbar5;
