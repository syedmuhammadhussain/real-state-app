import Image from "next/image";
import StepsOverlay from "./StepsOverlay";
import FramerSelectShadcn from "./FramerSelectShadcn";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen w-full">
    {/* shagyy */}
    <StepsOverlay />

        {/* Background Image */}
        <Image
          src='/images/hero/hero.jpg'
          alt='ПОСУТОЧНАЯ АРЕНДА ЖИЛЬЯ В ГОРОДАХ РОССИИ'
          priority
          quality={100}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-gray-900/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl w-full space-y-8">
              <h1 className=" text-xl md:text-4xl text-white drop-shadow-xl">  ПОСУТОЧНАЯ АРЕНДА ЖИЛЬЯ В ГОРОДАХ РОССИИ </h1>
              <p className="mt-4 md:mt-6 text-md  md:text-lg md:text-lg text-gray-100  mx-auto leading-relaxed"> Просторные планировки — престижные районы — привлекательные цены </p>
                {/* CTA Buttons */}
                <FramerSelectShadcn/>
            </div>
        </div>
    </section>
  );
};

export default HeroSection;
