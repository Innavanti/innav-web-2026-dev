"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaArrowRight, FaInstagram } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io5";

const MenuList = [
  {
    title: "Inicio",
    href: "/",
  },
  {
    title: "Nosotros",
    href: "/nosotros",
  },
  {
    title: "Proceso",
    href: "/proceso",
  },
  {
    title: "Casos",
    href: "/casos",
  },
];

const MenuSMList = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/innavanti/",
    icon: <FaInstagram />,
  },
  {
    name: "Whatsapp",
    href: "https://api.whatsapp.com/send?phone=+56923592929",
    icon: <IoLogoWhatsapp />,
  },
];

const NavMenu = () => {
  const t = useTranslations("nav.menu");
  const [isOpen, setIsOpen] = useState(false);
  return (
    <button
      className={
        "flex flex-row border rounded-full w-fit px-2.5 py-1 h-full lg:text-sm items-center text-center justify-around cursor-pointer uppercase gap-1.5"
      }
      onClick={() => setIsOpen(!isOpen)}
    >
      <p className="uppercase">{isOpen ? t("close") : t("title")}</p>
      <div
        className={`flex flex-row items-center justify-center gap-0.5 ${isOpen ? "rotate-90" : ""} transition-all duration-300`}
      >
        <div className="aspect-square w-1 bg-white rounded-full" />
        <div className="aspect-square w-1 bg-white rounded-full" />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="w-full absolute inset-x-0 top-full mt-2 bg-white backdrop-blur-sm z-10 px-3 py-7 rounded-lg shadow-xl text-black overflow-hidden origin-top flex flex-col"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.35, ease: "easeInOut" },
              opacity: { duration: 0.25 },
            }}
          >
            <div className="flex flex-col gap-5">
              {MenuList.map((item) => (
                <MenuItem key={item.title} {...item} />
              ))}
              <div className="w-full h-fit flex flex-row gap-3 px-5">
                {MenuSMList.map((item) => (
                  <SocialItem key={item.name} {...item} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

export const MenuItem = ({
  title,
  href,
  target,
}: {
  title: string;
  href: string;
  target?: string;
}) => {
  const LINE_HEIGHT = "2.25rem";

  return (
    <Link
      href={href}
      target={target}
      className="group flex w-full items-center justify-between gap-4 cursor-pointer py-1.5 px-5 rounded-full relative overflow-hidden"
    >
      <div className="w-full opacity-0 group-hover:opacity-100 h-full absolute inset-0 z-0 bg-primary-1-200 transition-all duration-500 ease-out" />
      <div className="relative overflow-hidden" style={{ height: LINE_HEIGHT }}>
        <div className="flex flex-col transition-transform duration-300 ease-out group-hover:-translate-y-9 text-3xl uppercase">
          <p className="h-9 flex items-center">{title}</p>
          <p className="h-9 flex items-center">{title}</p>
        </div>
      </div>

      <div className="w-5 aspect-square relative ">
        {/* DOT */}
        <div className="group-hover:opacity-0 aspect-square w-2 rounded-full bg-black z-10 absolute inset-0 right-0 m-auto transition-all duration-300 ease-out" />
        <FaArrowRight
          size={15}
          className="opacity-0 group-hover:opacity-100 absolute inset-0 m-auto"
        />
      </div>
    </Link>
  );
};

export const SocialItem = ({
  name,
  href,
  icon,
}: {
  name: string;
  href: string;
  icon: React.ReactNode;
}) => {
  return (
    <Link
      href={href}
      target={"_blank"}
      key={name}
      className="bg-black cursor-pointer group relative rounded-full aspect-square text-white w-10 flex items-center justify-center text-xl overflow-hidden"
    >
      <div className="w-full scale-0 group-hover:scale-110 h-full rounded-full bg-primary-1-200 absolute inset-0 z-0 transition-all duration-300 ease-out" />
      <div className="z-10">{icon}</div>
    </Link>
  );
};

export default NavMenu;
