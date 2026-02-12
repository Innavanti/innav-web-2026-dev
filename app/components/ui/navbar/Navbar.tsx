"use client";
import { useTranslations } from "next-intl";
import LangSwitcher from "../langSwitcher/LangSwitcher";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const t = useTranslations("nav");

  const NavLinks = [
    {
      href: "/nosotros",
      title: t("links.aboutUs"),
    },
    {
      href: "/servicios",
      title: t("links.services"),
    },
    {
      href: "/contacto",
      title: t("links.contact"),
    },
  ];
  return (
    <nav className="w-screen h-[7vh] flex flex-row justify-evenly items-center bg-white/15 backdrop-blur-sm text-black shadow-xl shadow-black-500/30 rounded-b-xl p-2 absolute top-0 inset-x-0 m-auto">
      <div className="w-auto h-full aspect-20/9 relative flex justify-center items-center">
        <a href="/">
          <img
            src="/assets/branding/innav-logo-h.png"
            alt="Logo"
            className="object-cover object-center"
          />
        </a>
      </div>
      <section className="w-1/3 h-full flex-row justify-evenly items-center px-2 lg:text-lg hidden lg:flex">
        <ul className="flex gap-4 items-center justify-between flex-row w-full h-full uppercase text-black font-thin">
          {NavLinks.map((link) => (
            <Link key={link.href} href={link.href} className="group relative">
              {link.title}
              <div className="w-full scale-x-0 group-hover:scale-x-100 h-1 bg-background absolute bottom-0 transition-all duration-300" />
            </Link>
          ))}
        </ul>
      </section>
      <LangSwitcher />
    </nav>
  );
};

export const Navbar2 = () => {
  const t = useTranslations("nav");

  const NavLinks = [
    {
      href: "/nosotros",
      title: t("links.aboutUs"),
    },
    {
      href: "/servicios",
      title: t("links.services"),
    },
    {
      href: "/contacto",
      title: t("links.contact"),
    },
  ];
  return (
    <>
      <div className="w-screen h-[6vh] py-3 bg-primary-1-50 justify-center items-center flex text-background text-lg uppercase">
        <nav className="w-3/4 h-full flex flex-row items-center justify-around">
          {NavLinks.map((link) => (
            <Link key={link.href} href={link.href} className="group relative">
              {link.title}
              <div className="w-full scale-x-0 group-hover:scale-x-100 h-1 bg-background absolute bottom-0 transition-all duration-300" />
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export const Navbar3 = () => {
  const t = useTranslations("nav");

  const NavLinks = [
    {
      href: "/nosotros",
      title: t("links.aboutUs"),
    },
    {
      href: "/servicios",
      title: t("links.services"),
    },
    {
      href: "/contacto",
      title: t("links.contact"),
    },
  ];
  return (
    <nav className="w-[75vw] max-w-175 fixed top-1.5 inset-x-0 m-auto z-50 h-10 bg-linear-90 from-primary-3-800 via-primary-2-700  to-primary-3-800  shadow-xl shadow-black/30 rounded-xl flex items-center justify-around font-semibold">
      {NavLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="group relative uppercase"
        >
          {link.title}
          <div className="w-full scale-x-0 group-hover:scale-x-100 h-0.5 bg-primary-2-700 absolute bottom-0 transition-all duration-300" />
        </Link>
      ))}
    </nav>
  );
};

export const Navbar4 = () => {
  const t = useTranslations("nav");
  const pathname = usePathname();

  const NavLinks = [
    {
      href: "/nosotros",
      title: t("links.aboutUs"),
    },
    {
      href: "/servicios",
      title: t("links.services"),
    },
  ];

  return (
    <nav className="absolute top-0 inset-x-0 z-50 h-20 w-full bg-[#0e5f76]/95 backdrop-blur-md border-b border-[#2bb6c8]/20 shadow-lg shadow-[#0e5f76]/20 transition-all duration-300">
      <div className="container mx-auto h-full px-6 flex items-center justify-between">
        {/* --- LOGO --- */}
        <div className="relative h-full flex items-center">
          <Link href="/">
            {/* Asumiendo que tienes una versión del logo en blanco o monocromo claro para fondo oscuro */}
            <img
              src="/assets/branding/innav-logo-h.png"
              alt="Innavanti Logo"
              className="h-10 w-auto object-contain brightness-0 invert" // Filtro para volverlo blanco si es negro
            />
          </Link>
        </div>

        {/* --- LINKS DE NAVEGACIÓN --- */}
        <div className="hidden md:flex items-center gap-10">
          <ul className="flex items-center gap-8">
            {NavLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative group block py-2 text-sm font-bold uppercase tracking-wider transition-colors duration-300 ${isActive ? "text-white" : "text-slate-300 hover:text-white"}`}
                  >
                    {link.title}

                    {/* El subrayado "Innavanti": Una línea inclinada y rápida */}
                    <span
                      className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#2bb6c8] transform origin-left transition-transform duration-300 ease-out -skew-x-12 ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                    ></span>

                    {/* Un pequeño destello decorativo arriba al hacer hover */}
                    <span className="absolute -top-1 right-0 w-2 h-2 bg-[#2bb6c8] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[2px]"></span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* --- SEPARADOR VISUAL (La línea diagonal técnica) --- */}
          <div className="h-8 w-[1px] bg-white/20 transform skew-x-[-15deg]"></div>

          {/* --- BOTÓN CTA (Contacto) --- 
              Usamos la estética de "Romboide/Skew" para destacar la acción principal
          */}
          <Link
            href="/contacto"
            className="group relative px-6 py-2 bg-transparent"
          >
            {/* Fondo del botón (Inclinado) */}
            <div className="absolute inset-0 bg-[#2bb6c8] transform -skew-x-[15deg] transition-transform duration-300 group-hover:bg-white group-hover:scale-105 border border-transparent group-hover:border-[#2bb6c8]"></div>

            {/* Texto del botón */}
            <span className="relative z-10 font-bold uppercase text-[#0e5f76] text-sm tracking-widest transition-colors duration-300 group-hover:text-[#0e5f76]">
              {t("links.contact")}
            </span>
          </Link>
        </div>

        {/* --- MOBILE HAMBURGER (Visual Placeholder) --- */}
        {/* Aquí iría tu lógica de menú móvil, visualmente alineada */}
        <button className="md:hidden text-white">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="square"
              strokeLinejoin="miter"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar4;
