"use client";
import Image from "next/image";
import Link from "next/link";
import LangSwitcher2 from "../langSwitcher/LangSwitcher2";
import { useTranslations } from "next-intl";
import { IoLogoWhatsapp } from "react-icons/io5";

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
    <header className="fixed top-0 inset-x-0  h-24 p-3 pointer-events-auto z-999">
      <nav className="mx-auto grid h-full w-full max-w-[80vw] grid-cols-3 items-center">
        <Link
          href="/"
          className="flex h-full w-full max-w-75 justify-self-start"
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
  );
};

export const NavLink = ({ title, href }: { title: string; href: string }) => {
  return (
    <Link
      href={href}
      className="relative hover:outline-2 outline-0 text-white/70 hover:text-white hover:font-semibold font-light outline-primary-2-500 px-3 py-1 rounded-full transition-all duration-100 ease-in-out"
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
