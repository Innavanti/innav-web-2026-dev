"use client";
import Link from "next/link";
import {
  FiGlobe,
  FiMessageSquare,
  FiRepeat,
  FiSmartphone,
} from "react-icons/fi";

export const Services = [
  {
    title: "Sitios Web",
    description: "Desarrollo de sitios web modernos y responsivos.",
    href: "",
    target: "_blank",
    top: <FiGlobe />,
  },
  {
    title: "Chatbots",
    description:
      "Desarrollo de chatbots para mejorar la experiencia de los usuarios.",
    href: "",
    target: "_blank",
    top: <FiMessageSquare />,
  },
  {
    title: "Automatización para Empresas",
    description:
      "Desarrollo de automatización para mejorar la eficiencia y la productividad de las empresas.",
    href: "",
    target: "_blank",
    top: <FiRepeat />,
  },
  {
    title: "Apps",
    description:
      "Desarrollo de aplicaciones para mejorar la experiencia de los usuarios.",
    href: "",
    target: "_blank",
    top: <FiSmartphone />,
  },
];

export const ServicesSection = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen lg:h-[75vh] pt-[6vh] bg-teal-50">
      <h1 className="text-5xl font-bold text-black">Servicios</h1>
      <section className="flex flex-wrap">
        {Services.map((item, index) => (
          <SplitCard key={index} {...item} />
        ))}
      </section>
    </div>
  );
};

type SplitCardProps = {
  title: string;
  description: string;
  href?: string;
  top?: React.ReactNode; // aquí puedes meter imagen / icono / lo que quieras
  bottomColorClass?: string; // ej: "bg-blue-600"
  buttonText?: string;
  className?: string;
};

// components/UiverseSplitCard.tsx

export const SplitCard = ({
  title = "Card Title",
  description = "A simple card",
  href = "#",
  buttonText = "Read More",
  className = "",
}: SplitCardProps) => {
  return (
    <div
      className={[
        "group relative h-[254px] w-[190px] overflow-hidden rounded-[20px] bg-white",
        "hover:border hover:border-[#0a3cff] hover:shadow-[0px_2px_2px_#0a3bffa1]",
        className,
      ].join(" ")}
    >
      {/* top-card */}
      <div
        className={[
          "h-[65%] bg-white transition-[height] duration-300 ease-[ease]",
          "rounded-t-[20px]",
          "group-hover:h-[35%]",
        ].join(" ")}
      />

      {/* bottom-card */}
      <div
        className={[
          "relative h-[35%] bg-[#0a3cff] transition-[height] duration-300 ease-[ease]",
          "rounded-tr-[20px] rounded-bl-[20px] rounded-br-[20px]",
          "group-hover:h-[65%]",
        ].join(" ")}
      >
        {/* ::before replacement */}
        <span
          aria-hidden="true"
          className={[
            "absolute left-0 w-[175px] bg-transparent transition-[bottom] duration-300 ease-[ease]",
            "h-[50px] rounded-bl-[20px]",
            // original: bottom: 89px; box-shadow: 0 30px 0 0 #0a3cff;
            "bottom-[89px] shadow-[0_30px_0_0_#0a3cff]",
            "group-hover:bottom-[164px]",
          ].join(" ")}
        />

        {/* content */}
        <div className="flex flex-col items-center justify-center pt-[13%] text-white">
          <span className="text-[18px] font-bold">{title}</span>
          <p className="text-[14px]">{description}</p>

          <Link
            href={href}
            className={[
              "mt-[15%] inline-block rounded-[15px] border-2 border-white",
              "bg-transparent px-[10%] py-[5%] text-[13px] text-white no-underline",
              "transition-colors duration-400 ease-[ease]",
              "hover:bg-white hover:text-black",
            ].join(" ")}
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
