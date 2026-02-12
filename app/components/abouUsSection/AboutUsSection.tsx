import { useTranslations } from "next-intl";

const List = [
  {
    imageA: "https://picsum.photos/1000/1300",
    imageB: "https://picsum.photos/1001/1301",
    title: "Nuestra Misión",
    description:
      "Brindar soluciones innovadoras y sostenibles que impulsen el crecimiento y el éxito de nuestros clientes.",
  },
  {
    imageA: "https://picsum.photos/1002/1302",
    imageB: "https://picsum.photos/1003/1303",
    title: "Nuestros Valores",
    description:
      "Nuestros valores son la innovación, la creatividad, la excelencia y la responsabilidad. Nuestros valores son el compromiso con la calidad y la excelencia, y nuestros compromisos son con nuestros clientes y nuestra comunidad.",
  },
  {
    imageA: "https://picsum.photos/1004/1304",
    imageB: "https://picsum.photos/1005/1305",
    title: "Nuestro Visión",
    description:
      "Nuestra visión es crear un mundo más justo, seguro y sostenible para todos. Nuestra visión es promover la igualdad de oportunidades y el respeto a los derechos humanos.",
  },
];

export const AboutUsSection = () => {
  const t = useTranslations("HomePage.AboutUsSection");

  const getSizePercentByIndex = (
    index: number,
    length: number,
    min = 80, // %
    max = 100, // %
    power = 1.6,
  ) => {
    if (length <= 1) return max;

    const center = (length - 1) / 2;
    const maxDist = center;
    const dist = Math.abs(index - center);

    const t = 1 - dist / maxDist; // 1 centro · 0 extremos
    const eased = Math.pow(t, power); // curva

    return Math.round(min + (max - min) * eased);
  };

  return (
    <section className="w-full flex flex-col bg-foreground items-center gap-3.5 justify-center h-full lg:h-[75vh] py-10">
      <h1 className="text-5xl font-semibold text-black uppercase">
        {t("title")}
      </h1>
      <div className="w-full flex flex-col items-stretch lg:flex-row h-full gap-0 lg:gap-1.5 lg:items-center justify-center ">
        {List.map((item, index) => {
          const size = getSizePercentByIndex(index, List.length);

          return (
            <AboutCard
              key={index}
              size={size}
              imageA={item.imageA}
              imageB={item.imageB}
              title={item.title}
              description={item.description}
            />
          );
        })}
      </div>
    </section>
  );
};

const AboutCard = ({
  imageA,
  imageB,
  title,
  description,
  size,
}: {
  size: number;
  imageA: string;
  imageB: string;
  title: string;
  description: string;
}) => {
  const scale = size / 100;

  return (
    <div
      style={{ ["--s" as number | string]: scale }}
      className={`
        w-full
        aspect-video
        cursor-pointer
        group
        flex
        justify-center
        items-center
        shadow-lg
        relative
        overflow-hidden
        gap-3
        transition-transform
        duration-300
        ease-out

        lg:rounded-xl
        lg:aspect-10/16
        lg:min-w-75
        lg:max-w-20
        lg:scale-(--s)
        lg:hover:scale-100
      `}
    >
      <div className="flex-col items-center justify-center w-full h-full">
        <img
          src={imageA}
          alt="imageA"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-200 group-hover:opacity-0"
        />
        <img src={imageB} alt="imageB" className="w-full h-full object-cover" />
      </div>

      <div className="w-full h-fit lg:hidden absolute inset-x-0 bottom-0 bg-black/25 backdrop-blur-sm p-2">
        <h1 className="w-fit uppercase text-2xl font-black border-b-2 mb-1.5 border-white">
          {title}
        </h1>
        <p className="text-sm">{description}</p>
      </div>

      <div className="z-50 hidden lg:block absolute bottom-[3%] right-[4%] aspect-square bg-white/20 backdrop-blur-xs w-3/4 h-auto p-3 rounded-sm shadow-lg shadow-white/30 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <h1 className="text-xl uppercase font-bold text-black">{title}</h1>
        <p className="text-sm text-black">{description}</p>
      </div>
    </div>
  );
};

export default AboutUsSection;
