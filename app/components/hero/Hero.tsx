import { useTranslations } from "next-intl";
import HeroBlueprint from "../heroBlueprint/HeroBlueprint";

export const Hero = () => {
  const t = useTranslations("HomePage");

  return (
    <div className="px-2 flex flex-col items-center justify-center w-screen h-screen bg-primary-1-400">
      <HeroBlueprint />
    </div>
  );
};

export default Hero;
